import React from "react"
import { arrayOf, shape, string } from "prop-types"
import "./LexicalEntry.sass"
import Pronunciations from "./Components/Pronunciations"

const renderEtymologies = entry => {
  const etymologies = entry.entries.map(en => en.etymologies).filter(en => en)
  return (
    etymologies.length > 0 && (
      <div>
        <h6 className="title is-6">Origin:</h6>
        <ul>{etymologies.map(et => <li key={et}>{et}</li>)}</ul>
      </div>
    )
  )
}

const renderDefinitions = entry => {
  const senses = entry.entries[0].senses.map(en => ({
    id: en.id,
    definitions: en.definitions,
    examples: en.examples,
    notes: en.notes
  }))

  return (
    <div className="Senses">
      <ul>
        {senses.map(sense => {
          return (
            <li key={sense.id} className="Definition">
              <span>
                {sense.notes && (
                  <i>[{sense.notes.map(n => n.text).join(",")}]</i>
                )}
              </span>
              <span>
                {sense.definitions &&
                  sense.definitions.map(def => <p key={def}>{def}.</p>)}
                <span>
                  {sense.examples &&
                    sense.examples.map(ex => <p key={ex.text}>‘{ex.text}’</p>)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const LexicalEntry = ({ entry }) => {
  return (
    <div className="LexicalEntry">
      <h4 className="title is-4">{entry.text}</h4>
      <h5 className="LexicalCategory is-italic title is-5 has-text-weight-light">
        {entry.lexicalCategory}
      </h5>
      <Pronunciations pronunciations={entry.pronunciations} />
      {renderDefinitions(entry)}
      {renderEtymologies(entry)}
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
