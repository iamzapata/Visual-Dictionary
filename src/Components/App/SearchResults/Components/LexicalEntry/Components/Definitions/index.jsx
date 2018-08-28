import React from "react"
import { shape, string, arrayOf } from "prop-types"
import "./Definitions.scss"

const Definitions = ({ entry }) => {
  const senses = entry.entries[0].senses.map(en => ({
    id: en.id,
    notes: en.notes,
    examples: en.examples,
    definitions: en.definitions,
    crossReferences: en.crossReferences
  }))

  return (
    <div className="Senses">
      <ul>
        {senses.map(sense => {
          return (
            <li key={sense.id} className="Sense">
              <span>
                {sense.notes && (
                  <i>[{sense.notes.map(n => n.text).join(",")}]</i>
                )}
              </span>
              <span>
                {sense.definitions &&
                  sense.definitions.map(def => (
                    <p className="Definition" key={def}>
                      {def}.
                    </p>
                  ))}
                {sense.crossReferences &&
                  sense.crossReferences.length > 0 &&
                  sense.crossReferences.map(cr => (
                    <div key={cr}>
                      <i>{cr.type}</i> <span>{cr.text}</span>
                    </div>
                  ))}
                <span>
                  {sense.examples &&
                    sense.examples.map(ex => (
                      <p className="Example" key={ex.text}>
                        ‘{ex.text}’
                      </p>
                    ))}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Definitions.propTypes = {
  entry: shape({
    id: string,
    definitions: arrayOf(shape),
    examples: arrayOf(shape),
    notes: arrayOf(shape)
  }).isRequired
}

export default Definitions
