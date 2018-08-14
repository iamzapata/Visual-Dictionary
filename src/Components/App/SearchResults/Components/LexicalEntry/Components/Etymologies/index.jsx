import React from "react"
import { arrayOf, string } from "prop-types"
import "./Etymologies.sass"

const Etymologies = ({ entry }) => {
  const etymologies = entry.entries.map(en => en.etymologies).filter(en => en)
  return (
    etymologies.length > 0 && (
      <div className="Etymologies">
        <h6 className="title is-6">Origin:</h6>
        <ul>{etymologies.map(et => <li key={et}>{et}</li>)}</ul>
      </div>
    )
  )
}

Etymologies.propTypes = {
  etymologies: arrayOf(string)
}

export default Etymologies
