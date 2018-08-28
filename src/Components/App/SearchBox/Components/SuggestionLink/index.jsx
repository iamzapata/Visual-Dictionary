import React from "react"
import { func, string } from "prop-types"
import "./SuggestionLink.scss"

const SuggestionLink = ({ triggerSearchWord, suggestion, children }) => (
  <button
    className="SuggestionLink"
    onClick={() => triggerSearchWord(suggestion)}
  >
    {children}
  </button>
)

SuggestionLink.propTypes = {
  suggestion: string.isRequired,
  triggerSearchWord: func.isRequired,
  children: string.isRequired
}

export default SuggestionLink
