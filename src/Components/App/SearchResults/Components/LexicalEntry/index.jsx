import React from "react"
import { arrayOf, shape, string } from "prop-types"
import PlayAudioButton from "../PlayAudioButton"
import "./LexicalEntry.sass"

const renderPronunciations = pronunciations => (
  <div>
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

const LexicalEntry = ({ entry }) => {
  return (
    <div className="LexicalEntry">
      <h4 className="title is-4">{entry.text}</h4>
      <h7 className="is-italic">{entry.lexicalCategory}</h7>
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
