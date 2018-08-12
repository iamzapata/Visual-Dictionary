import ActionTypes from "Components/App/actionTypes/index"

const defaultState = {
  isLoading: false,
  err: null,
  results: []
}

export default function SearchStore(state = defaultState, action) {
  const { type, isLoading, err, results } = action
  switch (type) {
    case ActionTypes.SEARCH_WORD_REQUEST:
      return {
        ...state,
        isLoading,
        err
      }
    case ActionTypes.SEARCH_WORD_SUCCESS:
      return {
        ...state,
        isLoading,
        results
      }
    case ActionTypes.SEARCH_WORD_FAILURE:
      return {
        ...state,
        isLoading,
        err,
        results: []
      }
    default:
      return state
  }
}
