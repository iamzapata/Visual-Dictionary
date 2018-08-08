import React from "react"
import PlayAudioButton from "./index"
import { render, cleanup, fireEvent } from "react-testing-library"
import playAudio from "utils/audio/playAudio"
jest.mock("utils/audio/playAudio", () => jest.fn())

describe("<PlayAudioButton />", () => {
  afterEach(cleanup)
  beforeEach(() => {
    playAudio.mockClear()
  })

  const createProps = () => ({
    audioFile: "fileToPlay"
  })

  it("Should render self", () => {
    const { container } = render(<PlayAudioButton {...createProps()} />)

    expect(container.firstChild).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it("Should display a play icon", () => {
    const { queryByText } = render(<PlayAudioButton {...createProps()} />)

    const playIcon = queryByText("►")

    expect(playIcon).toBeTruthy()
  })

  it("Should play audio when button clicked", () => {
    const props = createProps()
    const { queryByText } = render(<PlayAudioButton {...props} />)

    const playButton = queryByText("►")
    fireEvent.click(playButton)

    expect(playAudio).toHaveBeenCalledTimes(1)
  })
})
