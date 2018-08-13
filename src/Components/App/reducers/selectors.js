import { createSelector } from "reselect"
import hydrateWithIds from "utils/hydrateWithId"
import shortId from "shortid"

const normalizeDefinitions = entries => {
  return entries.map(en => ({
    id: en.id,
    etymologies: en.etymologies,
    senses: en.senses.slice(0, 4)
  }))
}

const getLexicalEntries = state => state.SearchStore.results

const lexicalEntriesSelector = createSelector([getLexicalEntries], results => {
  if (results.length > 0) {
    const lexicalEntries = results[0].lexicalEntries
    return lexicalEntries
      .map(lexicalEntry => ({
        ...lexicalEntry,
        id: shortId.generate(),
        pronunciations: hydrateWithIds(lexicalEntry.pronunciations),
        entries: hydrateWithIds(lexicalEntry.entries)
      }))
      .map(results => ({
        ...results,
        entries: normalizeDefinitions(results.entries)
      }))
  }
  return []
})

export default lexicalEntriesSelector
