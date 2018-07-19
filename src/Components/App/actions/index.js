import ActionTypes from "Components/App/actionTypes/index"
import request from "utils/request/index"

export const searchWordRequest = searchQuery => ({
  type: ActionTypes.SEARCH_WORD_REQUEST,
  err: null,
  isLoading: true,
  searchQuery
})

export function searchWordSuccess(response) {
  const { results } = response
  return {
    type: ActionTypes.SEARCH_WORD_SUCCESS,
    err: null,
    isLoading: false,
    results
  }
}

export function searchWordFailure(err) {
  return {
    type: ActionTypes.SEARCH_WORD_FAILURE,
    err,
    isLoading: false
  }
}

export default function searchWord(queryString) {
  return dispatch => {
    dispatch(searchWordRequest(queryString))
    return request(`entries/en/${queryString}`)
      .then(response => {
        dispatch(searchWordSuccess(response))
      })
      .catch(err => {
        dispatch(searchWordFailure(err))
      })
  }
}
