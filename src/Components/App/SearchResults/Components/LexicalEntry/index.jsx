import React, { Fragment } from "react"
import { arrayOf, shape, string } from "prop-types"
import "./LexicalEntry.sass"
import Pronunciations from "./Components/Pronunciations"

const LexicalEntry = ({ entry }) => {
  return (
    <div className="LexicalEntry">
      <h4 className="title is-4">{entry.text}</h4>
      <h5 className="LexicalCategory is-italic title is-5 has-text-weight-light">
        {entry.lexicalCategory}
      </h5>
      <Fragment>
        <h6 className="title is-6">Pronunciations:</h6>
        <Pronunciations pronunciations={entry.pronunciations} />
      </Fragment>
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
