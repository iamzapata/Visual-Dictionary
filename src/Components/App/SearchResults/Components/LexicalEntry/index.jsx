import React from "react"
import { arrayOf, shape, string } from "prop-types"
import shortId from "shortid"

const renderPronunciations = pronunciations => (
  <div>
    {pronunciations.map(p => (
      <span key={shortId.generate()}>
        <span>{p.phoneticSpelling}</span>
        <span>
          {p.dialects.map(d => <span key={shortId.generate()}>{d}</span>)}
          {p.audioFile && <button>&#9658;</button>}
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
