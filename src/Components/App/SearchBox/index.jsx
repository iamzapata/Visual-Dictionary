import React, { Component } from "react"
import { arrayOf, boolean, func, shape, string } from "prop-types"
import "./SearchBox.sass"

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
          <div className="field has-addons">
            <div className="SearchBox__Input-Control control">
              <input
                type="text"
                className="SearchBox__Input input"
                onChange={this.onInputChange}
                placeholder="Define ..."
                value={inputValue}
              />
            </div>
            <div className="SearchBox__Button-Control control">
              <button className="button">Define</button>
            </div>
          </div>
          {showEmptySearchError && (
            <p className="ErrorMessage">
              Please type the word you want to search for
            </p>
          )}
          {showNoResultsError &&
            !showEmptySearchError && (
              <p className="ErrorMessage">
                No results for <b>{inputValue}</b>
              </p>
            )}
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
