import routes from "~/configs/routes";

export default class Api {
  constructor(options) {
    this.id = options.id ? options.id : "";
    this.route = routes[options.key].endpoint;
    this.params = options.params ? options.params : {};
  }

  async getData() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${this.route}/${
      this.id
    }?${new URLSearchParams(this.params).toString()}`;
    const data = await fetch(requestUrl).then((response) => response.json());
    return data;
  }

  async postData() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${this.route}/${this.id}`;
    const data = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.params),
    }).then((response) => response.json());
    return data;
  }

  async patchData() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${this.route}/${this.id}`;
    const data = await fetch(requestUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.params),
    }).then((response) => response.json());
    return data;
  }
}
