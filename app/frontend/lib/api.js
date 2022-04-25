import routes from "~/configs/routes";

export default class Api {
  constructor(key, params) {
    this.route = routes[key].endpoint;
    this.params = params ? params : {};
  }

  createFromParamsToString(params) {
    if (params.id) {
      const id = params.id;
      delete params.id;
      return `/${id}?${new URLSearchParams(params).toString()}`;
    } else {
      return `?${new URLSearchParams(params).toString()}`;
    }
  }

  async getData() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${
      this.route
    }${this.createFromParamsToString(this.params)}`;
    const data = await fetch(requestUrl).then((response) => response.json());
    return data;
  }

  async postData() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${this.route}`;
    const data = await fetch(requestUrl, {
      method: "POST",
      body: this.params,
    }).then((response) => response.json());
    return data;
  }
}
