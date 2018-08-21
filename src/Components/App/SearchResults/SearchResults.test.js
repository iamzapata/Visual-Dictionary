import React from "react"
import SearchResults from "./index.jsx"
import { render, cleanup } from "react-testing-library"
import entrySample from "./mocks"

describe("<SearchResults />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    results: [entrySample()],
    imageResults: [
      { link: "link1", image: { thumbnailLink: "thumbnailLink1" } },
      { link: "link2", image: { thumbnailLink: "thumbnailLink2" } },
      { link: "link3", image: { thumbnailLink: "thumbnailLink3" } }
    ]
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

    const props = {
      ...createProps(),
      results
    }

    const { container } = render(<SearchResults {...props} />)

    const listItems = container.querySelectorAll(
      ".SearchResults > ul.SearchResults__Definitions > li"
    )

    expect(listItems.length).toEqual(3)
  })

  it("Should display a list of result images", () => {
    const { container, debug } = render(<SearchResults {...createProps()} />)

    const listItems = container.querySelectorAll(
      ".SearchResults > .SearchResults__Images img"
    )
    debug()
    expect(listItems.length).toEqual(3)
  })
})
