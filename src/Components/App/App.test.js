import React from "react"
import { render } from "react-testing-library"
import { App } from "./index.jsx"

describe("<App />", () => {
  const createProps = () => ({
    searchWord: jest.fn(),
    SearchStore: { results: [] },
    header: "Visual Dictionary",
    lexicalEntries: [],
    isLoading: false
  })

  it("Should render self", () => {
    const { container, queryByText } = render(<App {...createProps()} />)
    const header = queryByText(createProps().header)

    expect(container.firstChild).toMatchSnapshot()
    expect(header.innerHTML).toBe(createProps().header)
  })

  it("Should render a <SearchBox /> component", () => {
    const { container } = render(<App {...createProps()} />)
    const searchBox = container.querySelectorAll(".SearchBox")

    expect(searchBox.length).toBe(1)
  })

  it("Should render a <SearchResults /> component", () => {
    const { container } = render(<App {...createProps()} />)
    const results = container.querySelectorAll(".SearchResults")

    expect(results.length).toBe(1)
  })

  it("Should display a loading indicator if requests is active", () => {
    const props = {
      ...createProps(),
      isLoading: true
    }
    const { container } = render(<App {...props} />)

    const loadingSpinner = container.querySelector(".LoadingSpinner")

    expect(loadingSpinner).toBeTruthy()
  })
})
