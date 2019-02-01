import React from "react";
import Tile from "./tile";
import SearchBar from "./SearchBar";
import ActiveClients from "./ActiveClients";
import GiphyClient from "./GiphyClient";
import ImgurClient from "./ImgurClient";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: [],
      offset: 0,
      client: "",
      polling: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getFromClient = this.getFromClient.bind(this);
  }

  getFromClient() {
    let client;
    switch (this.state.client) {
      case "giphy":
        client = new GiphyClient();
        break;
      case "imgur":
        client = new ImgurClient();
        break;
      default:
        client = new GiphyClient();
        break;
    }
    client.getData(this.state.query, this.state.offset).then(response => {
      if (this.state.offset === 0) {
        this.setState({ data: response.data });
      } else {
        this.setState({ data: this.state.data.concat(response.data) });
      }
    });
  }

  syncData() {
    if (this.state.polling === false) {
      this.setState({ polling: true });
      this.getFromClient();
      this.setState({ polling: false });
    }
  }

  componentDidMount() {
    this.syncData();
  }

  async loadMore() {
    let loadMore = this.setState({
      offset: this.state.offset + (this.state.client === "giphy") ? 25 : 1
    });
    await loadMore;
    this.syncData();
  }

  async handleChange(event) {
    let changeCommit = this.setState({
      [event.target.name]: event.target.value,
      offset: 0,
      data: []
    });
    await changeCommit;
    this.syncData();
  }

  tiles() {
    switch (this.state.client) {
      case "giphy":
        return this.state.data.map(function(tileData, index) {
          return (
            <Tile
              text={tileData.title}
              image={tileData.images.downsized.url}
              key={index}
              alt={tileData.title}
            />
          );
        });

      case "imgur":
        return this.state.data.map(function(tileData, index) {
          if (
            typeof tileData !== "undefined" &&
            typeof tileData.images !== "undefined"
          ) {
            return (
              <Tile
                text={tileData.title}
                image={tileData.images[0].link}
                key={index}
                alt={tileData.title}
              />
            );
          } else {
            return null;
          }
        });

      default:
        return <Tile text="Select your client" image="cat.jpg" />;
    }
  }

  render() {
    return (
      <div>
        <h1>GIPHIFY</h1>
        <ActiveClients value={this.state.client} />
        <SearchBar value={this.state.query} onChange={this.handleChange} />
        <button name="loadButton" onClick={this.loadMore}>
          Load More
        </button>
        <button name="client" value="giphy" onClick={this.handleChange}>
          Giphy
        </button>
        <button name="client" value="imgur" onClick={this.handleChange}>
          Imgur
        </button>
        <div className="container">{this.tiles()}</div>
      </div>
    );
  }
}

export default Home;
