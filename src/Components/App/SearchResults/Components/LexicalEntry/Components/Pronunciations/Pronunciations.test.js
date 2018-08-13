import React from "react"
import { render, cleanup } from "react-testing-library"
import Pronunciations from "./index"
import mockEntry from "Components/App/SearchResults/mocks"

describe("<Pronunciations />", () => {
  afterEach(cleanup)

  const createProps = () => {
    return [
      {
        id: "someStringId",
        phoneticSpelling: "Jiberish",
        dialects: ["High Valyrian"],
        audioFile: "myFile.file"
      }
    ]
  }

  it("Should render self", () => {
    const { container } = render(
      <Pronunciations pronunciations={createProps()} />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toBeTruthy()
  })

  it("Should display phonetic spelling", () => {
    const { queryByText } = render(
      <Pronunciations pronunciations={createProps()} />
    )

    const phoneticSpelling = createProps()[0].phoneticSpelling

    const phoneticSpellingPresence = queryByText(phoneticSpelling)

    expect(phoneticSpellingPresence).toBeTruthy()
  })

  it("Should display dialects", () => {
    const { queryByText } = render(
      <Pronunciations pronunciations={createProps()} />
    )

    const dialects = createProps()[0].dialects[0]

    const dialectsPresence = queryByText(dialects)

    expect(dialectsPresence).toBeTruthy()
  })

  it("Should have a button to play audio files if audio files present", () => {
    const { container } = render(
      <Pronunciations pronunciations={createProps()} />
    )

    const pronunciationsWithAudioFile = mockEntry().pronunciations.filter(
      p => p.audioFile
    )
    const playAudioButton = container.firstChild.getElementsByTagName("button")

    expect(playAudioButton.length).toEqual(pronunciationsWithAudioFile.length)
    expect(playAudioButton).toBeTruthy()
  })
})
