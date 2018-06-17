import React from "react"
import {
  render,
  renderIntoDocument,
  cleanup,
  fireEvent
} from "react-testing-library"
import SearchBox from "./index.jsx"

describe("<SearchBox />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    searchWord: jest.fn()
  })

  const emptyInputErrorMessage = "Please type the word you want to search for"

  it("Should render self", () => {
    const { container } = render(<SearchBox {...createProps()} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a SearchBox className", () => {
    const { container } = render(<SearchBox {...createProps()} />)
    const className = container.querySelectorAll(".SearchBox")
    expect(className.length).toEqual(1)
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
    const { queryByPlaceholderText } = renderIntoDocument(
      <SearchBox {...createProps()} />
    )
    const inputNode = queryByPlaceholderText("Define ...")
    inputNode.value = searchString
    fireEvent.change(inputNode)
    expect(queryByPlaceholderText("Define ...").value).toEqual(searchString)
  })

  it("Should allow the user to submit search by pressing enter key", () => {
    const props = createProps()
    const { queryByPlaceholderText } = renderIntoDocument(
      <SearchBox {...props} />
    )
    const input = queryByPlaceholderText("Define ...")
    input.value = "zebra"
    fireEvent.change(input)
    fireEvent.submit(input)
    expect(props.searchWord).toHaveBeenCalledTimes(1)
  })

  it("Should allow the user to submit search by clicking define button", () => {
    const props = createProps()
    const { queryByText, queryByPlaceholderText } = renderIntoDocument(
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
    const {
      container,
      queryByText,
      queryByPlaceholderText
    } = renderIntoDocument(<SearchBox {...props} />)
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
    const {
      container,
      queryByText,
      queryByPlaceholderText
    } = renderIntoDocument(<SearchBox {...props} />)
    const form = container.firstChild.querySelector("form")
    const inputNode = queryByPlaceholderText("Define ...")
    inputNode.change = ""
    fireEvent.change(inputNode)
    fireEvent.submit(form)
    expect(props.searchWord).not.toHaveBeenCalled()
    expect(queryByText(emptyInputErrorMessage)).not.toBeNull()
    inputNode.value = "elephant"
    fireEvent.change(inputNode)
    expect(queryByText(emptyInputErrorMessage)).toBeNull()
  })
})
