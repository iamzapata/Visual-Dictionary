import React from "react"
import SearchResults from "./index.jsx"
import { render, cleanup } from "react-testing-library"
import entrySample from "./mocks"

describe("<SearchResults />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    results: [entrySample()]
  })

  it("Should render self", () => {
    const { container } = render(<SearchResults {...createProps()} />)

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a SearchResults className", () => {
    const { container } = render(<SearchResults {...createProps()} />)
    const classNameSelection = container.querySelectorAll(".SearchResults")

    expect(classNameSelection.length).toEqual(1)
  })

  it("Should have an ul element", () => {
    const { container } = render(<SearchResults {...createProps()} />)

    const unorderedList = container.querySelector("ul")

    expect(unorderedList).toBeTruthy()
  })

  it("Should display a list of search results", () => {
    const results = [
      { ...entrySample() },
      { ...entrySample() },
      { ...entrySample() }
    ]

    const { container } = render(<SearchResults results={results} />)

    const listItems = container.querySelectorAll("li")

    expect(listItems.length).toEqual(3)
  })
})
