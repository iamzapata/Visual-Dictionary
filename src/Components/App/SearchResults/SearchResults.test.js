import React from "react"
import SearchResults from "./index.jsx"
import { renderIntoDocument, cleanup } from "react-testing-library"

describe("<SearchResults />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    results: []
  })

  it("Should render self", () => {
    const { container } = renderIntoDocument(
      <SearchResults {...createProps()} />
    )

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a SearchResults className", () => {
    const { container } = renderIntoDocument(
      <SearchResults {...createProps()} />
    )
    const classNameSelection = container.querySelectorAll(".SearchResults")

    expect(classNameSelection.length).toEqual(1)
  })

  it("Should have an ul element", () => {
    const { container } = renderIntoDocument(
      <SearchResults {...createProps()} />
    )

    const unorderedList = container.querySelector("ul")

    expect(unorderedList).toBeTruthy()
  })

  it("Should display a list of search results", () => {
    const results = [
      {
        result: "a"
      },
      {
        result: "b"
      },
      {
        result: "c"
      }
    ]

    const { container } = renderIntoDocument(
      <SearchResults results={results} />
    )

    const listItems = container.querySelectorAll("li")

    expect(listItems.length).toEqual(3)
  })
})
