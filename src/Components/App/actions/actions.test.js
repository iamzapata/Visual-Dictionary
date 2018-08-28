import * as actions from "./index"
import searchWord from "./index"
import ActionTypes from "Components/App/actionTypes/index"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import fetchMock from "fetch-mock"

describe("<SearchBar /> action creators", () => {
  it("should create an action to fire off search request", () => {
    const searchQuery = "lion"
    const expectedAction = {
      type: ActionTypes.SEARCH_WORD_REQUEST,
      err: null,
      isLoading: true,
      searchQuery
    }
    expect(actions.searchWordRequest(searchQuery)).toEqual(expectedAction)
  })

  it("should create an action to dispatch request success", () => {
    const response = { medatdata: {}, results: [] }
    const { results } = response
    const imageResults = []
    const expectedAction = {
      type: ActionTypes.SEARCH_WORD_SUCCESS,
      err: null,
      isLoading: false,
      results,
      imageResults
    }
    expect(actions.searchWordSuccess(response, imageResults)).toEqual(
      expectedAction
    )
  })

  it("should create an action to dispatch request failure", () => {
    const err = {}
    const expectedAction = {
      type: ActionTypes.SEARCH_WORD_FAILURE,
      err,
      isLoading: false
    }
    expect(actions.searchWordFailure(err)).toEqual(expectedAction)
  })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Async <SearchBar /> action creator", () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const searchQuery = "lion"

  it("Should dispatch SEARCH_WORD_REQUEST and SEARCH_WORD_SUCCESS when entry fetch is done", () => {
    const entriesResponse = { medatdata: {}, results: [] }
    const { results } = entriesResponse
    const imageResults = []
    const store = mockStore({})
    fetchMock.getOnce(`api/define/lion`, entriesResponse)
    fetchMock.getOnce(
      `https://www.googleapis.com/customsearch/v1?key=&cx=&searchType=image&q=lion&hl=en&lr=lang_en&gl=US`,
      imageResults
    )

    const expectedActions = [
      {
        type: ActionTypes.SEARCH_WORD_REQUEST,
        err: null,
        isLoading: true,
        searchQuery
      },
      {
        type: ActionTypes.SEARCH_WORD_SUCCESS,
        err: null,
        isLoading: false,
        results,
        imageResults
      }
    ]

    return store.dispatch(searchWord(searchQuery)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("Should dispatch SEARCH_WORD_REQUEST and SEARCH_WORD_FAILURE when entry fetch errors", () => {
    const err = new Error({ message: "NOT FOUND", stack: "" })
    fetchMock.getOnce(`api/define/lion`, () => {
      throw err
    })
    const store = mockStore({})

    const expectedActions = [
      {
        type: ActionTypes.SEARCH_WORD_REQUEST,
        err: null,
        isLoading: true,
        searchQuery
      },
      { type: ActionTypes.SEARCH_WORD_FAILURE, err, isLoading: false }
    ]

    return store.dispatch(searchWord(searchQuery)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("Should dispatch SEARCH_WORD_MISSPELL_SUGGESTIONS when SEARCH_WORD_FAILURE is dispatched", () => {
    const searchQuery = "okk"
    const err = new Error("404")
    fetchMock.getOnce(`api/define/${searchQuery}`, () => {
      throw err
    })
    fetchMock.getOnce(`api/suggestions/${searchQuery}`, {
      results: []
    })

    const store = mockStore({})

    const expectedActions = [
      {
        type: ActionTypes.SEARCH_WORD_REQUEST,
        err: null,
        isLoading: true,
        searchQuery
      },
      { type: ActionTypes.SEARCH_WORD_MISSPELL_SUGGESTIONS, suggestions: [] },
      { type: ActionTypes.SEARCH_WORD_FAILURE, err, isLoading: false }
    ]

    return store.dispatch(searchWord(searchQuery)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
