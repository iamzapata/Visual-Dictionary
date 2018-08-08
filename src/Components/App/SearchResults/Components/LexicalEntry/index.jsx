import React from "react"
import { arrayOf, shape, string } from "prop-types"
import PlayAudioButton from "../PlayAudioButton"

const renderPronunciations = pronunciations => (
  <div>
    {pronunciations.map(p => (
      <span key={p.id}>
        <span>{p.phoneticSpelling}</span>
        <span>
          {p.dialects.map(d => <span key={d}>{d}</span>)}
          {p.audioFile && <PlayAudioButton audioFile={p.audioFile} />}
        </span>
      </span>
    ))}
  </div>
)

const LexicalEntry = ({ entry }) => {
  return (
    <div className="LexicalEntry">
      <h4>{entry.text}</h4>
      <h5>{entry.lexicalCategory}</h5>
      {renderPronunciations(entry.pronunciations)}
    </div>
  )
}

LexicalEntry.propTypes = {
  entry: shape({
    entries: arrayOf(shape({})),
    language: string,
    lexicalCategory: string,
    pronunciations: arrayOf(shape({})),
    text: string
  }).isRequired
}

export default LexicalEntry
