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

  it("Should display phonetic spelling", () => {
    const { queryByText } = render(<LexicalEntry {...createProps()} />)

    const phoneticSpelling = createProps().entry.pronunciations[0]
      .phoneticSpelling

    const phoneticSpellingPresence = queryByText(phoneticSpelling)

    expect(phoneticSpellingPresence).toBeTruthy()
  })

  it("Should display dialects", () => {
    const { queryByText } = render(<LexicalEntry {...createProps()} />)

    const dialects = createProps().entry.pronunciations[0].dialects[0]

    const dialectsPresence = queryByText(dialects)

    expect(dialectsPresence).toBeTruthy()
  })

  it("Should have a button to play audio files if audio files present", () => {
    const { container } = render(<LexicalEntry {...createProps()} />)

    const pronunciationsWithAudioFile = mockEntry().pronunciations.filter(
      p => p.audioFile
    )
    const playAudioButton = container.firstChild.getElementsByTagName("button")

    expect(playAudioButton.length).toEqual(pronunciationsWithAudioFile.length)
    expect(playAudioButton).toBeTruthy()
  })
})
