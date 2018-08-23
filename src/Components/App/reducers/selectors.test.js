import {
  lexicalEntriesSelector,
  imageResultsSelector,
  searchSuggestions
} from "Components/App/reducers/selectors"
import { type } from "ramda"

const mockState = () => ({
  SearchStore: {
    results: [
      {
        lexicalEntries: [
          { lexicalCategory: "Noun", entries: [], pronunciations: [] },
          { lexicalCategory: "Verb", entries: [], pronunciations: [] }
        ]
      }
    ],
    imageResults: [
      { link: "link1", image: { thumbnailLink: "thumbnailLink1" } },
      { link: "link2", image: { thumbnailLink: "thumbnailLink2" } },
      { link: "link3", image: { thumbnailLink: "thumbnailLink3" } }
    ],
    suggestions: [{ word: "ok" }, { word: "lka" }, { word: "ss" }]
  }
})

describe("lexicalEntries selector", () => {
  it("Should return an array fo lexical entries", () => {
    const selected = lexicalEntriesSelector(mockState())
    expect(type(selected)).toEqual("Array")
  })

  it("Should return correct number of entries", () => {
    const selected = lexicalEntriesSelector(mockState())
    expect(selected.length).toEqual(2)
  })
})

describe("image results selector", () => {
  it("Should return an array of image results", () => {
    const selected = imageResultsSelector(mockState())
    expect(type(selected)).toEqual("Array")
  })

  it("Should return correct number of entries", () => {
    const selected = imageResultsSelector(mockState())
    expect(selected.length).toEqual(3)
  })

  it("Should extract original and thumbnail links", () => {
    const selected = imageResultsSelector(mockState())
    selected.forEach(image => {
      expect(Object.keys(image).sort()).toEqual(["link", "thumbnailLink"])
    })
  })

  describe("Suggestions selector", () => {
    it("Should return an array of suggestions", () => {
      const selected = searchSuggestions(mockState())
      expect(type(selected)).toEqual("Array")
    })

    it("Should return correct number of entries", () => {
      const selected = searchSuggestions(mockState())
      expect(selected.length).toEqual(3)
    })
  })
})
