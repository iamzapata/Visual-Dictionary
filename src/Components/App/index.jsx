import React from "react"
import { func, oneOfType, node, string, shape, bool, arrayOf } from "prop-types"
import { FadeLoader } from "react-spinners"
import SearchBox from "Components/App/SearchBox"
import SearchResults from "Components/App/SearchResults"
import { connect } from "react-redux"
import searchWord from "Components/App/actions"
import {
  searchSuggestions,
  imageResultsSelector,
  lexicalEntriesSelector
} from "Components/App/reducers/selectors"
import "./App.scss"

export const App = ({
  header,
  isLoading,
  searchWord,
  SearchStore,
  suggestions,
  imageResults,
  lexicalEntries
}) => (
  <div className="App">
    <h2 className="title is-2 has-text-centered">{header}</h2>
    <SearchBox
      searchWord={searchWord}
      SearchStore={SearchStore}
      suggestions={suggestions}
    />
    {isLoading && (
      <div className="LoadingSpinner">
        <FadeLoader />
      </div>
    )}
    <SearchResults
      results={lexicalEntries}
      imageResults={imageResults}
      searchWord={searchWord}
    />
  </div>
)

App.propTypes = {
  searchWord: func.isRequired,
  header: oneOfType([node, string]).isRequired,
  SearchStore: shape({
    isLoading: bool,
    results: arrayOf(shape({ shape }))
  }).isRequired,
  lexicalEntries: arrayOf(shape({})).isRequired,
  imageResults: arrayOf(shape({})).isRequired,
  isLoading: bool.isRequired,
  suggestions: arrayOf(string).isRequired
}

const mapDispatchToProps = {
  searchWord
}

const mapStateToProps = state => ({
  SearchStore: state.SearchStore,
  suggestions: searchSuggestions(state),
  isLoading: state.SearchStore.isLoading,
  lexicalEntries: lexicalEntriesSelector(state),
  imageResults: imageResultsSelector(state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
