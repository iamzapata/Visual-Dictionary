import React, { Component } from "react"
import { func } from "prop-types"

class SearchBox extends Component {
  state = {
    inputValue: ""
  }

  onSubmitSearch = ev => {
    ev.preventDefault()
    const { inputValue } = this.state
    this.props.searchWord(inputValue)
  }

  onInputChange = ev => {
    const { value: inputValue } = ev.target
    this.setState({ inputValue })
  }

  render() {
    const { inputValue } = this.state
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
