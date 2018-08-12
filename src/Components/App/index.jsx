import React from "react"
import { func, oneOfType, node, string, shape, bool, arrayOf } from "prop-types"
import { FadeLoader } from "react-spinners"
import SearchBox from "Components/App/SearchBox"
import SearchResults from "Components/App/SearchResults"
import { connect } from "react-redux"
import searchWord from "Components/App/actions"
import lexicalEntriesSelector from "Components/App/reducers/selectors"
import "./App.sass"

export const App = ({
  header,
  isLoading,
  searchWord,
  SearchStore,
  lexicalEntries
}) => (
  <div className="App">
    <h2 className="title is-2 has-text-centered">{header}</h2>
    <SearchBox searchWord={searchWord} SearchStore={SearchStore} />
    {isLoading && (
      <div className="LoadingSpinner">
        <FadeLoader />
      </div>
    )}
    <SearchResults results={lexicalEntries} />
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
  isLoading: bool.isRequired
}

const mapDispatchToProps = {
  searchWord
}

const mapStateToProps = state => ({
  SearchStore: state.SearchStore,
  lexicalEntries: lexicalEntriesSelector(state),
  isLoading: state.SearchStore.isLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
