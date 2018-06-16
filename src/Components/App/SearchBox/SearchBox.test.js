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

  it("Should render self", () => {
    const props = {
      searchWord: jest.fn()
    }
    const { container } = render(<SearchBox {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a SearchBox className", () => {
    const props = {
      searchWord: jest.fn()
    }
    const { container } = render(<SearchBox {...props} />)
    const className = container.querySelectorAll(".SearchBox")
    expect(className.length).toEqual(1)
  })

  it("Should have a form element", () => {
    const props = {
      searchWord: jest.fn()
    }
    const { container } = render(<SearchBox {...props} />)
    const form = container.firstChild.querySelector("form")
    expect(form).toBeTruthy()
  })

  it("Should have an input element", () => {
    const props = {
      searchWord: jest.fn()
    }
    const { queryByPlaceholderText } = render(<SearchBox {...props} />)
    const input = queryByPlaceholderText("Define ...")
    expect(input).toBeTruthy()
  })

  it("Should have a submit button", () => {
    const props = {
      searchWord: jest.fn()
    }
    const { queryByText } = render(<SearchBox {...props} />)
    const submitButton = queryByText("Define")
    expect(submitButton).toBeTruthy()
  })

  it("Should allow the user to type a word to search for", () => {
    const searchString = "lion"
    const props = {
      searchWord: jest.fn()
    }
    const { queryByPlaceholderText } = renderIntoDocument(
      <SearchBox {...props} />
    )
    const inputNode = queryByPlaceholderText("Define ...")
    inputNode.value = "lion"
    fireEvent.change(inputNode)
    expect(queryByPlaceholderText("Define ...").value).toEqual(searchString)
  })

  it("Should allow the user to submit search by pressing enter key", () => {
    const searchWord = jest.fn()
    const props = {
      searchWord
    }
    const { queryByPlaceholderText } = renderIntoDocument(
      <SearchBox {...props} />
    )
    const input = queryByPlaceholderText("Define ...")
    fireEvent.submit(input)
    expect(searchWord).toHaveBeenCalledTimes(1)
  })

  it("Should allow the user to submit search by clicking define button", () => {
    const searchWord = jest.fn()
    const props = {
      searchWord
    }
    const { queryByText } = renderIntoDocument(<SearchBox {...props} />)
    const button = queryByText("Define")
    fireEvent.submit(button)
    expect(searchWord).toHaveBeenCalledTimes(1)
  })
})
