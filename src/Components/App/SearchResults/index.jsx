import React from "react"
import { arrayOf, shape } from "prop-types"
import LexicalEntry from "./Components/LexicalEntry"
import "./SearchResults.sass"

const renderResultItem = entry => {
  return (
    <li key={entry.id}>
      <LexicalEntry entry={entry} />
      <hr />
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
