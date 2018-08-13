import React from "react"
import LexicalEntry from "./index.jsx"
import { render, cleanup } from "react-testing-library"
import mockEntry from "../../mocks.js"

describe("<LexicalEntry />", () => {
  afterEach(cleanup)

  const createProps = () => ({
    entry: {
      ...mockEntry()
    }
  })

  it("Should render self", () => {
    const { container } = render(<LexicalEntry {...createProps()} />)

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should have a LexicalEntry className", () => {
    const { container } = render(<LexicalEntry {...createProps()} />)
    const classNameSelection = container.querySelectorAll(".LexicalEntry")

    expect(classNameSelection.length).toEqual(1)
  })

  it("Should display the entry's text", () => {
    const { queryByText } = render(<LexicalEntry {...createProps()} />)

    const entryText = createProps().entry.text

    const entryTextPresence = queryByText(entryText)

    expect(entryTextPresence).toBeTruthy()
  })

  it("Should display lexical category", () => {
    const { queryByText } = render(<LexicalEntry {...createProps()} />)

    const lexicalCategory = createProps().entry.lexicalCategory

    const lexicalCategoryPresence = queryByText(lexicalCategory)

    expect(lexicalCategoryPresence).toBeTruthy()
  })

  it("Should display etymologies", () => {
    const { queryByText } = render(<LexicalEntry {...createProps()} />)

    const etymologies = createProps().entry.entries[0].etymologies[0]

    const etymologiesPresence = queryByText(etymologies)

    expect(etymologiesPresence).toBeTruthy()
  })
})
