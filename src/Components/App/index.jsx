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
import SearchBox from "Components/App/SearchBox"
import SearchResults from "Components/App/SearchResults"
import { connect } from "react-redux"
import searchWord from "Components/App/actions"

export const App = ({ header, searchWord, SearchStore }) => (
  <div>
    <h1>{header}</h1>
    <SearchBox searchWord={searchWord} SearchStore={SearchStore} />
    <SearchResults results={SearchStore.results} />
  </div>
)

App.propTypes = {
  searchWord: func.isRequired,
  header: oneOfType([node, string]).isRequired,
  SearchStore: shape({
    isLoading: boolean,
    results: arrayOf(shape({ shape }))
  }).isRequired
}

const mapDispatchToProps = {
  searchWord
}

const mapStateToProps = state => ({
  SearchStore: state.SearchStore
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
