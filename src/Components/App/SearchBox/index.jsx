import React, { Component } from "react"
import { arrayOf, boolean, func, shape, string } from "prop-types"

class SearchBox extends Component {
  state = {
    inputValue: "",
    showEmptySearchError: false,
    showNoResultsError: false
  }

  static getDerivedStateFromProps(nextProps) {
    const {
      SearchStore: { err }
    } = nextProps
    if (err) {
      return { showNoResultsError: true }
    }
    return { showNoResultsError: false }
  }

  onSubmitSearch = ev => {
    ev.preventDefault()
    const { inputValue } = this.state
    if (!inputValue.length) {
      this.setState({ showEmptySearchError: true })
      return
    }
    this.props.searchWord(inputValue)
  }

  onInputChange = ev => {
    ev.stopPropagation()
    const { value: inputValue } = ev.target
    if (inputValue.length) {
      this.setState({ inputValue, showEmptySearchError: false })
      return
    }

    this.setState({ inputValue })
  }

  render() {
    const { inputValue, showEmptySearchError, showNoResultsError } = this.state
    return (
      <div className="SearchBox">
        <form
          className="SearchBox__Form"
          onSubmit={ev => this.onSubmitSearch(ev)}
        >
          <input
            type="text"
            className="SearchBox__Input"
            onChange={this.onInputChange}
            placeholder="Define ..."
            value={inputValue}
          />
          {showEmptySearchError && (
            <span className="ErrorMessage">
              Please type the word you want to search for
            </span>
          )}
          {showNoResultsError &&
            !showEmptySearchError && (
              <span className="ErrorMessage">No results for your search</span>
            )}
          <button>Define</button>
        </form>
      </div>
    )
  }
}

SearchBox.propTypes = {
  searchWord: func.isRequired,
  SearchStore: shape({
    err: shape({ message: string }),
    isLoading: boolean,
    results: arrayOf(shape({ shape }))
  }).isRequired
}

export default SearchBox
