import React from "react";

class LogoBanner extends React.Component {
  render() {
    return <img class="banner" src={this.props.image} alt={this.props.alt} />;
  }
}

export default LogoBanner;
