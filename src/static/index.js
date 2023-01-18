class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <header>
      <h1>Blog-API</h1>
    </header>
    `;
  }
}

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const linkName = this.getAttribute("link-name") || "broken";

    this.innerHTML = `
    <footer>
      <span>Jonathan Potter 2023</span>
      <a href="/${linkName}">${linkName}</a>
    </footer>`;
  }
}

customElements.define("header-component", Header);
customElements.define("footer-component", Footer);

const routes = {
  user: {
    ROOT: "/api/user",
    GET: {
      "/validate": "validates user by bearer token",
      "/": "returns all user records",
      "/:_id": "returns user record with specific _id",
    },
    POST: {
      "/register": "creates a new user from {username, password}",
      "/login": "returns validation token from {username, password}",
    },
    put: { "/:_id": "updates user record with specific _id" },
    delete: { "/:_id": "deletes user with specific _id" },
  },
  group: {
    ROOT: "/api/group",
    GET: {
      "/": "returns all group records",
      "/:_id": "returns group record with specific _id",
    },
    POST: {
      "/": "creates a new group record with {title, upcs}",
    },
    PUT: { "/:_id": "updates group record with specific _id" },
    DELETE: { "/:_id": "deletes group with specific _id" },
  },
  index: {
    ROOT: "/",
    GET: {
      "/": "returns the home page",
      "/about": "returns the about page",
      "/routes": "returns this json object",
      "/healtcheck": "returns an 'OK' statuscode if the server is running",
    },
  },
};

const routesContainer = document.getElementsByClassName("routes");

const keys = Object.keys(routes);

const values = Object.values(routes);

routesContainer[0].innerHTML = keys.map(
  (key, i) =>
    `<h3>${key}:</h3> <p class="route-list">${JSON.stringify(values[i])
      .replace(/},/g, "}, <br />")
      .replace(/{/g, "{ <br />")
      .replace(/",/g, '", <br />')
      .replace(/}/g, "} <br/> }")
      .replace(/:/g, " : ")}</p>`
);
