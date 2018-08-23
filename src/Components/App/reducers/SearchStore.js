import ActionTypes from "Components/App/actionTypes/index"

const defaultState = {
  isLoading: false,
  err: null,
  results: [],
  imageResults: [],
  suggestions: []
}

export default function SearchStore(state = defaultState, action) {
  const { type, isLoading, err, results, imageResults, suggestions } = action
  switch (type) {
    case ActionTypes.SEARCH_WORD_REQUEST:
      return {
        ...state,
        isLoading,
        err,
        suggestions: []
      }
    case ActionTypes.SEARCH_WORD_SUCCESS:
      return {
        ...state,
        isLoading,
        results,
        imageResults
      }
    case ActionTypes.SEARCH_WORD_FAILURE:
      return {
        ...state,
        isLoading,
        err,
        results: [],
        imageResults: []
      }
    case ActionTypes.SEARCH_WORD_MISSPELL_SUGGESTIONS:
      return {
        ...state,
        suggestions
      }
    default:
      return state
  }
}
