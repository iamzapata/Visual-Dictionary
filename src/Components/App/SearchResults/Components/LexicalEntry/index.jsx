import React from "react"
import { arrayOf, shape, string } from "prop-types"
import "./LexicalEntry.sass"
import Pronunciations from "./Components/Pronunciations"
import Definitions from "./Components/Definitions"
import Etymologies from "./Components/Etymologies"

const LexicalEntry = ({ entry }) => {
  return (
    <div className="LexicalEntry">
      <h4 className="title is-4">{entry.text}</h4>
      <h5 className="LexicalCategory is-italic title is-5 has-text-weight-light">
        {entry.lexicalCategory}
      </h5>
      <Pronunciations pronunciations={entry.pronunciations} />
      <Definitions entry={entry} />
      <Etymologies entry={entry} />
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
