import React from "react"
import { string } from "prop-types"
import playAudio from "utils/audio/playAudio"

const PlayAudioButton = ({ audioFile }) => {
  return <button onClick={() => playAudio(audioFile)}>&#9658;</button>
}

PlayAudioButton.propTypes = {
  audioFile: string.isRequired
}

export default PlayAudioButton
