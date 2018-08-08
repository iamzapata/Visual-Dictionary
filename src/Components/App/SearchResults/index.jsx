import React from "react"
import { arrayOf, shape } from "prop-types"
import LexicalEntry from "./Components/LexicalEntry"

const renderResultItem = entry => {
  return (
    <li key={entry.id}>
      <LexicalEntry entry={entry} />
    </li>
  )
}

const SearchResults = ({ results }) => {
  return (
    <div className="SearchResults">
      <ul>{results.map(entry => renderResultItem(entry))}</ul>
    </div>
  )
}

SearchResults.propTypes = {
  results: arrayOf(shape({})).isRequired
}

export default SearchResults
