import React from "react"
import { arrayOf, shape } from "prop-types"

const SearchResults = ({ results }) => {
  return (
    <div className="SearchResults">
      <ul>{results.map(r => <li key={r.result}>{r.result}</li>)}</ul>
    </div>
  )
}

SearchResults.propTypes = {
  results: arrayOf(shape({})).isRequired
}

export default SearchResults
