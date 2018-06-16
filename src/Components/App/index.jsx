import React from "react"
import { func, oneOfType, node, string } from "prop-types"
import SearchBox from "Components/App/SearchBox"
import SearchResults from "Components/App/SearchResults"
import { connect } from "react-redux"
import searchWord from "./SearchBox/actions"

const App = ({ header, searchWord }) => (
  <div>
    <h1>{header}</h1>
    <SearchBox searchWord={searchWord} />
    <SearchResults />
  </div>
)

App.propTypes = {
  searchWord: func.isRequired,
  header: oneOfType([node, string]).isRequired
}

const mapDispatchToProps = {
  searchWord
}

export default connect(
  null,
  mapDispatchToProps
)(App)
