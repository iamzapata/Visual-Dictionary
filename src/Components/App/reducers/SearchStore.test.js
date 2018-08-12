import SearchBoxReducer from "./SearchStore"
import ActionTypes from "Components/App/actionTypes/index"

describe("SearchBox reducer", () => {
  it("Should return initial state", () => {
    expect(SearchBoxReducer(undefined, {})).toEqual({
      isLoading: false,
      err: null,
      results: []
    })
  })

  it("Should handle SEARCH_WORD_REQUEST", () => {
    const requestActionPayload = {
      isLoading: true,
      results: [],
      err: null
    }

    expect(
      SearchBoxReducer(undefined, {
        type: ActionTypes.SEARCH_WORD_REQUEST,
        ...requestActionPayload
      })
    ).toEqual({ ...requestActionPayload })
  })

  it("Should clear error when SEARCH_WORD_REQUEST is dispatched", () => {
    const requestActonPayload = {
      isLoading: true,
      results: [],
      err: null
    }

    expect(
      SearchBoxReducer(
        { isLoading: true, err: { message: "NOT FOUND" }, results: [] },
        {
          type: ActionTypes.SEARCH_WORD_REQUEST,
          ...requestActonPayload
        }
      )
    ).toEqual(requestActonPayload)
  })

  it("Should handle SEARCH_WORD_SUCCESS", () => {
    const successActionPayload = {
      isLoading: false,
      results: [
        {
          id: "lion",
          language: "en",
          lexicalEntries: [],
          type: "headword",
          word: "lion"
        }
      ]
    }

    expect(
      SearchBoxReducer(
        {},
        {
          type: ActionTypes.SEARCH_WORD_SUCCESS,
          ...successActionPayload
        }
      )
    ).toEqual({ ...successActionPayload })
  })

  it("Should handle SEARCH_WORD_FAILURE", () => {
    const failureActionPayload = {
      isLoading: false,
      err: new Error(),
      results: []
    }

    expect(
      SearchBoxReducer(
        {},
        {
          type: ActionTypes.SEARCH_WORD_FAILURE,
          ...failureActionPayload
        }
      )
    ).toEqual({ ...failureActionPayload })
  })
})
