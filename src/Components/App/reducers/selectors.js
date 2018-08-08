import { createSelector } from "reselect"
import hydrateWithIds from "utils/hydrateWithId"
import shortId from "shortid"

const getLexicalEntries = state => state.SearchStore.results

const lexicalEntriesSelector = createSelector([getLexicalEntries], entries => {
  if (entries.length > 0) {
    const lexicalEntries = entries[0].lexicalEntries
    return lexicalEntries.map(lexicalEntry => ({
      ...lexicalEntry,
      id: shortId.generate(),
      pronunciations: hydrateWithIds(lexicalEntry.pronunciations),
      entries: hydrateWithIds(lexicalEntry.entries)
    }))
  }
  return []
})

export default lexicalEntriesSelector
