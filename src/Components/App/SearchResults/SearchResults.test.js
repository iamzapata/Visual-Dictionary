import React from "react"
import SearchResults from "./index.jsx"
import { renderIntoDocument } from "react-testing-library"

describe("<SearchResults />", () => {
  it("Should render self", () => {
    const { container } = renderIntoDocument(<SearchResults />)

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a SearchResults className", () => {
    const { container } = renderIntoDocument(<SearchResults />)
    const classNameSelection = container.querySelectorAll(".SearchResults")

    expect(classNameSelection.length).toEqual(1)
  })

  it("Should have an ul element", () => {
    const { container } = renderIntoDocument(<SearchResults />)

    const unorderdList = container.querySelector("ul")

    expect(unorderdList).toBeTruthy()
  })

})
