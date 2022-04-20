import routes from "~/configs/routes";

export default class Api {
  constructor(key, options) {
    this.route = routes[key].endpoint;
    this.options = options ? options : "";
  }

  async getData() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${this.route}${this.options}`;
    const res = await fetch(requestUrl);
    const data = await res.json();
    return data;
  }
}
