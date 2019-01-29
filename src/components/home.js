import React from "react";
import Tile from "./tile";
import SearchBar from "./SearchBar";
import ActiveClients from "./ActiveClients";

class GiphyClient {
  constructor() {
    this.apiBase = "http://api.giphy.com/v1/gifs/search?";
    this.apiKey = `&api_key=${process.env.REACT_APP_GIPHY}`;
    // this.apiKey = "&api_key=9xStwPHAlMMINnn1BRmEtHlqnDN9O4dt";
    this.limit = 25;
  }

  async getData(query, offset) {
    query = query
      .split(" ")
      .join("-")
      .toLowerCase();
    let url = `${this.apiBase}${this.apiKey}&q=${query}&limit=${
      this.limit
    }&offset=${offset}`;
    return fetch(url).then(results => results.json());
  }
}

class ImgurClient {
  constructor() {
    this.apiBase = "https://api.imgur.com/3/gallery/search?q=";
    // this.authorizationClientID = "Client-ID 943705e1d949fcf";
    this.authorizationClientID = process.env.REACT_APP_IMGUR;
    console.log(this.authorizationClientID);
  }
  async getData(query, page) {
    query = query
      .split(" ")
      .join("-")
      .toLowerCase();
    let url = `${this.apiBase}${query}&page=${page}`;
    let response = fetch(url, {
      method: "GET",
      headers: {
        Authorization: this.authorizationClientID
      }
    });
    return response.then(results => results.json());
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: [],
      offset: 0,
      client: "",
      page: 0,
      polling: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getGiphy = this.getGiphy.bind(this);
    this.getImgur = this.getImgur.bind(this);
    this.defaultRender = this.defaultRender.bind(this);
  }

  getGiphy() {
    let giphyClient = new GiphyClient();
    giphyClient.getData(this.state.query, this.state.offset).then(response => {
      if (this.state.offset === 0) {
        this.setState({ data: response.data });
      } else {
        this.setState({ data: this.state.data.concat(response.data) });
      }
    });
  }

  getImgur() {
    let imgurClient = new ImgurClient();

    imgurClient.getData(this.state.query, this.state.page).then(response => {
      if (this.state.page === 0) {
        this.setState({ data: response.data });
      } else {
        this.setState({ data: this.state.data.concat(response.data) });
      }
    });
  }

  defaultRender() {}

  syncData() {
    if (this.state.polling === false) {
      this.setState({ polling: true });
      switch (this.state.client) {
        case "giphy":
          this.getGiphy();
          break;

        case "imgur":
          this.getImgur();
          break;

        default:
          this.defaultRender();
      }
      this.setState({ polling: false });
    }
  }

  componentDidMount() {
    this.syncData();
  }

  async loadMore() {
    switch (this.state.client) {
      case "giphy":
        let loadMore = this.setState({ offset: this.state.offset + 25 });
        await loadMore;
        break;

      case "imgur":
        loadMore = this.setState({ page: this.state.page + 1 });
        await loadMore;
        break;

      default:
        break;
    }

    this.syncData();
  }

  async handleChange(event) {
    let changeCommit = this.setState({
      [event.target.name]: event.target.value,
      offset: 0,
      page: 0,
      data: []
    });
    await changeCommit;
    this.syncData();
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //     offset: 0
  //   });
  //   this.syncData();
  // }

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
