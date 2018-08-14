import React from "react"
import { arrayOf, shape, string } from "prop-types"
import PlayAudioButton from "Components/App/SearchResults/Components/PlayAudioButton"

const Pronunciations = ({ pronunciations }) => (
  <div className="Pronunciations">
    {pronunciations.map(p => (
      <span key={p.id}>
        /<span>{p.phoneticSpelling}</span>/
        <p>
          {
            <span className="Dialects">
              {p.dialects.map(d => <span key={d}>{d}</span>)}
            </span>
          }
          {p.audioFile && <PlayAudioButton audioFile={p.audioFile} />}
        </p>
      </span>
    ))}
  </div>
)

Pronunciations.propTypes = {
  pronunciations: arrayOf(
    shape({
      id: string.isRequired,
      phoneticSpelling: string.isRequired,
      dialects: arrayOf(string).isRequired,
      audioFile: string
    })
  ).isRequired
}

export default Pronunciations
