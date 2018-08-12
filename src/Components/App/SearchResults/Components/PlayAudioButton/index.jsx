import React from "react"
import { string } from "prop-types"
import playAudio from "utils/audio/playAudio"

const PlayAudioButton = ({ audioFile }) => {
  return (
    <button className="PlayAudioButton" onClick={() => playAudio(audioFile)}>
      &#9658;
    </button>
  )
}

PlayAudioButton.propTypes = {
  audioFile: string.isRequired
}

export default PlayAudioButton
