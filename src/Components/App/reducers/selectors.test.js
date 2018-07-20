import { lexicalEntriesSelector } from "Components/App/reducers/selectors"
import { type } from "ramda"

const mockState = {
  SearchStore: {
    results: [
      {
        lexicalEntries: [
          { lexicalCategory: "Noun", entries: [] },
          { lexicalCategory: "Verb", entries: [] }
        ]
      }
    ]
  }
}

describe("lexicalEntries selector", () => {
  it("Should return an array fo lexical entries", () => {
    const selected = lexicalEntriesSelector(mockState)
    expect(type(selected)).toEqual("Array")
  })

  it("Should return correct number of entries", () => {
    const selected = lexicalEntriesSelector(mockState)
    expect(selected.length).toEqual(2)
  })
})
