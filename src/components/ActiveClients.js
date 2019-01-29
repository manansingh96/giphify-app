import React from "react";

class ActiveClients extends React.Component {
  render() {
    if (this.props.value !== "") {
      return <h2>Searching in {this.props.value} </h2>;
    } else {
      return <h2 hidden>Meh</h2>;
    }
  }
}

export default ActiveClients;
