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
import searchWord from "Components/App/SearchBox/actions"

export const App = ({ header, searchWord, SearchBoxStore }) => (
  <div>
    <h1>{header}</h1>
    <SearchBox searchWord={searchWord} SearchBoxStore={SearchBoxStore} />
    <SearchResults />
  </div>
)

App.propTypes = {
  searchWord: func.isRequired,
  header: oneOfType([node, string]).isRequired,
  SearchBoxStore: shape({
    isLoading: boolean,
    results: arrayOf(shape({ shape }))
  }).isRequired
}

const mapDispatchToProps = {
  searchWord
}

const mapStateToProps = state => ({
  SearchBoxStore: state.SearchBox
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
