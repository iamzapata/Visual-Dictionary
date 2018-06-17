import React, { Component } from "react"
import { func } from "prop-types"

class SearchBox extends Component {
  state = {
    inputValue: "",
    showEmptySearchError: false
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
    const showEmptySearchError = inputValue.length ? false : true
    this.setState({ inputValue, showEmptySearchError})
  }

  render() {
    const { inputValue, showEmptySearchError } = this.state
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
          <button>Define</button>
        </form>
      </div>
    )
  }
}

SearchBox.propTypes = {
  searchWord: func.isRequired
}

export default SearchBox
