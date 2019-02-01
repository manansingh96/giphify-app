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

export default GiphyClient;
