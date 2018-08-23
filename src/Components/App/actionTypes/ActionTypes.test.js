import ActionTypes from "./index.js"

describe("ActionTypes", () => {
  it("Should have an SEARCH_WORD_REQUEST action type defined", () => {
    expect(ActionTypes.SEARCH_WORD_REQUEST).toBeTruthy()
  })

  it("Should have a SEARCH_WORD_SUCCESS action type defined", () => {
    expect(ActionTypes.SEARCH_WORD_SUCCESS).toBeTruthy()
  })

  it("Should have a SEARCH_WORD_FAILURE action type defined", () => {
    expect(ActionTypes.SEARCH_WORD_FAILURE).toBeTruthy()
  })

  it("Should have a SEARCH_WORD_MISSPELL_SUGGESTIONS", () => {
    expect(ActionTypes.SEARCH_WORD_MISSPELL_SUGGESTIONS).toBeTruthy()
  })
})
