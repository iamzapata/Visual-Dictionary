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
      .map(lexicalEntries => ({
        ...lexicalEntries,
        pronunciations: lexicalEntries.pronunciations.map(p => ({
          ...p,
          dialects: p.dialects ? p.dialects : []
        }))
      }))
      .map(lexicalEntries => ({
        ...lexicalEntries,
        entries: normalizeDefinitions(lexicalEntries.entries)
      }))
  }
  return []
})

const getResultImages = state => state.SearchStore.imageResults

const imageResultsSelector = createSelector([getResultImages], imageResults =>
  imageResults.map(imageResult => ({
    link: imageResult.link,
    thumbnailLink: imageResult.image.thumbnailLink
  }))
)

const getSearchSuggestions = state => state.SearchStore.suggestions

const searchSuggestions = createSelector([getSearchSuggestions], suggestions =>
  suggestions.map(result => result.word)
)

export { lexicalEntriesSelector, imageResultsSelector, searchSuggestions }
