import React from "react";

class Tile extends React.Component {
  render() {
    return (
      <div className="card">
        <h1>{this.props.text}</h1>
        <img src={this.props.image} alt={this.props.alt} />
      </div>
    );
  }
}

export default Tile;
