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

class Routes extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const routes = await (
      await fetch("https://upc-tracker.herokuapp.com/routes")
    ).json();
    this.innerHTML = `<pre>${JSON.stringify(routes, undefined, 2)}</pre>`;
  }
}

customElements.define("routes-component", Routes);
customElements.define("header-component", Header);
customElements.define("footer-component", Footer);
