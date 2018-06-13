import React, { Component } from "react";

class SearchBox extends Component {
  state = {
    inputValue: ""
  };

  onSubmitSearch = ev => {
    ev.preventDefault();
    const { inputValue } = this.state;
    this.props.searchWord(inputValue);
  };

  onInputChange = ev => {
    const { value: inputValue } = ev.currentTarget;
    this.setState({ inputValue });
  };

  render() {
    return (
      <div className="SearchBox">
        <form onSubmit={this.onSubmitSearch}>
          <input type="text" onChange={this.onInputChange} />
        </form>
      </div>
    );
  }
}

export default SearchBox;
