class ImgurClient {
  constructor() {
    this.apiBase = "https://api.imgur.com/3/gallery/search?q=";
    // this.authorizationClientID = "Client-ID 943705e1d949fcf";
    this.authorizationClientID = process.env.REACT_APP_IMGUR;
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

export default ImgurClient;
