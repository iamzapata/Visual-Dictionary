import { createSelector } from "reselect"

const getLexicalEntries = state => state.SearchStore.results

const lexicalEntriesSelector = createSelector(
  [getLexicalEntries],
  entries => (entries.length ? entries[0].lexicalEntries : [])
)

export default lexicalEntriesSelector
