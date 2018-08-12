import React from "react"
import { render, cleanup, fireEvent, getByText } from "react-testing-library"
import SearchBox from "./index.jsx"
import "jest-dom/extend-expect"

describe("<SearchBox />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    searchWord: jest.fn(),
    SearchStore: {}
  })

  const emptyInputErrorMessage = "Please type the word you want to search for"
  const noResultsErrorMessage = "No results for your search"

  it("Should render self", () => {
    const { container } = render(<SearchBox {...createProps()} />)
    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a SearchBox className", () => {
    const { container } = render(<SearchBox {...createProps()} />)
    const classNameSelection = container.querySelectorAll(".SearchBox")
    expect(classNameSelection.length).toEqual(1)
  })

  it("Should have a form element", () => {
    const { container } = render(<SearchBox {...createProps()} />)
    const form = container.firstChild.querySelector("form")

    expect(form).toBeTruthy()
  })

  it("Should have an input element", () => {
    const { queryByPlaceholderText } = render(<SearchBox {...createProps()} />)
    const input = queryByPlaceholderText("Define ...")

    expect(input).toBeTruthy()
  })

  it("Should have a submit button", () => {
    const { queryByText } = render(<SearchBox {...createProps()} />)
    const submitButton = queryByText("Define")

    expect(submitButton).toBeTruthy()
  })

  it("Should allow the user to type a word to search for", () => {
    const searchString = "lion"
    const { queryByPlaceholderText } = render(<SearchBox {...createProps()} />)
    const inputNode = queryByPlaceholderText("Define ...")

    inputNode.value = searchString
    fireEvent.change(inputNode)

    expect(queryByPlaceholderText("Define ...").value).toEqual(searchString)
  })

  it("Should allow the user to submit search by pressing enter key", () => {
    const props = createProps()
    const { queryByPlaceholderText } = render(<SearchBox {...props} />)
    const input = queryByPlaceholderText("Define ...")

    input.value = "zebra"
    fireEvent.change(input)
    fireEvent.submit(input)

    expect(props.searchWord).toHaveBeenCalledTimes(1)
  })

  it("Should allow the user to submit search by clicking define button", () => {
    const props = createProps()
    const { queryByText, queryByPlaceholderText } = render(
      <SearchBox {...props} />
    )
    const button = queryByText("Define")
    const input = queryByPlaceholderText("Define ...")

    input.value = "flamingo"
    fireEvent.change(input)
    fireEvent.submit(button)

    expect(props.searchWord).toHaveBeenCalledTimes(1)
  })

  it("Should not allow to search empty strings", () => {
    const props = createProps()
    const { container, queryByText, queryByPlaceholderText } = render(
      <SearchBox {...props} />
    )
    const form = container.firstChild.querySelector("form")
    const inputNode = queryByPlaceholderText("Define ...")

    inputNode.value = ""
    fireEvent.change(inputNode)
    fireEvent.submit(form)

    expect(props.searchWord).not.toHaveBeenCalled()
    expect(queryByText(emptyInputErrorMessage)).not.toBeNull()
  })

  it("Should clear error message on input change", () => {
    const props = createProps()
    const { container, queryByText, queryByPlaceholderText } = render(
      <SearchBox {...props} />
    )
    const form = container.firstChild.querySelector("form")
    const inputNode = queryByPlaceholderText("Define ...")

    inputNode.value = ""
    fireEvent.change(inputNode)
    fireEvent.submit(form)

    expect(props.searchWord).not.toHaveBeenCalled()
    expect(queryByText(emptyInputErrorMessage)).not.toBeNull()

    inputNode.value = "elephant"
    fireEvent.change(inputNode)

    expect(queryByText(emptyInputErrorMessage)).toBeNull()
  })

  it("Should not show empty input message when input empty unless form is submitted", () => {
    const props = createProps()
    const { queryByText, queryByPlaceholderText } = render(
      <SearchBox {...props} />
    )
    const inputNode = queryByPlaceholderText("Define ...")

    inputNode.value = "orangutan"
    fireEvent.change(inputNode)
    inputNode.value = ""
    fireEvent.change(inputNode)

    expect(queryByText(emptyInputErrorMessage)).toBeNull()
  })

  it("Should display a message when there are no results", () => {
    const props = {
      ...createProps(),
      SearchStore: { err: { message: "NOT FOUND" } }
    }

    const { queryByText, queryByPlaceholderText } = render(
      <SearchBox {...props} />
    )

    const inputNode = queryByPlaceholderText("Define ...")

    inputNode.value = "nopenope"
    fireEvent.change(inputNode)

    const a = queryByText(
      (_, element) => element.textContent === "No results for nopenope"
    )

    expect(a).toBeInTheDocument()
  })

  it("Should not show no results message unless form is submitted", () => {
    const props = {
      ...createProps(),
      SearchStore: { err: { message: "NOT FOUND" } }
    }

    const { rerender, queryByText } = render(<SearchBox {...props} />)

    const newProps = {
      ...props,
      SearchStore: { err: null }
    }

    rerender(<SearchBox {...newProps} />)

    expect(queryByText(noResultsErrorMessage)).toBeNull()
  })

  it("It should not display no results error if empty search error is visible", () => {
    const props = {
      ...createProps(),
      SearchStore: { err: { message: "NOT FOUND" } }
    }

    const { container, queryByText, queryByPlaceholderText } = render(
      <SearchBox {...props} />
    )
    const form = container.firstChild.querySelector("form")
    const inputNode = queryByPlaceholderText("Define ...")

    inputNode.value = ""
    fireEvent.change(inputNode)
    fireEvent.submit(form)

    expect(queryByText(emptyInputErrorMessage)).not.toBeNull()
    expect(queryByText(noResultsErrorMessage)).toBeNull()
  })
})
