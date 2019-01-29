import React from "react";

class Toggle extends React.Component {
  state = {
    client: true
  };

  toggle = () => {
    this.setState({
      client: !this.state.client
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Show/Hide</button>
        {this.state.on && <h1>Giphy</h1>}
        {!this.state.on && <h1>Imgur</h1>}
      </div>
    );
  }
}

export default Toggle;
