import React from "react"
import {
  func,
  oneOfType,
  node,
  string,
  shape,
  boolean,
  arrayOf
} from "prop-types"
import { FadeLoader } from "react-spinners"
import SearchBox from "Components/App/SearchBox"
import SearchResults from "Components/App/SearchResults"
import { connect } from "react-redux"
import searchWord from "Components/App/actions"
import lexicalEntriesSelector from "Components/App/reducers/selectors"

export const App = ({
  header,
  isLoading,
  searchWord,
  SearchStore,
  lexicalEntries
}) => (
  <div>
    <h1>{header}</h1>
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
    isLoading: boolean,
    results: arrayOf(shape({ shape }))
  }).isRequired,
  lexicalEntries: arrayOf(shape({})).isRequired
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
