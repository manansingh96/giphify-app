import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <input
        name="query"
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default SearchBar;
