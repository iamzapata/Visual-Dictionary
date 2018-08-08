import ActionTypes from "Components/App/actionTypes/index"
import request from "utils/request/index"

export const searchWordRequest = searchQuery => ({
  type: ActionTypes.SEARCH_WORD_REQUEST,
  err: null,
  isLoading: true,
  searchQuery
})

export function searchWordSuccess(response, relatedImages) {
  const { results } = response
  const { items: imageResults } = relatedImages
  return {
    type: ActionTypes.SEARCH_WORD_SUCCESS,
    err: null,
    isLoading: false,
    results,
    imageResults
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
  return async dispatch => {
    dispatch(searchWordRequest(queryString))
    try {
      const entries = await request(`entries/en/${queryString}`)
      const relatedImages = await searchImages(queryString)
      dispatch(searchWordSuccess(entries, relatedImages))
    } catch (err) {
      dispatch(searchWordFailure(err))
    }
  }
}

function searchImages(queryString) {
  return request(
    `v1?key=${GOOGLE_SEARCH_KEY}&cx=${GOOGLE_SEARCH_ENGINE}&searchType=image&q=${queryString}`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    "https://www.googleapis.com/customsearch"
  )
}
