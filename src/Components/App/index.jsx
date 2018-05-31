import React from 'react'
import PropTypes from 'prop-types'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

const App = ({ header }) => (
  <div>
    <h1>{header}</h1>
    <SearchBox />
    <SearchResults />
  </div>
)

export default App
