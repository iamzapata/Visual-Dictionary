import keyMirror from "keymirror"

const ActionTypes = keyMirror({
  SEARCH_WORD_REQUEST: null,
  SEARCH_WORD_SUCCESS: null,
  SEARCH_WORD_FAILURE: null,
  SEARCH_WORD_MISSPELL_SUGGESTIONS: null
})

export default ActionTypes
