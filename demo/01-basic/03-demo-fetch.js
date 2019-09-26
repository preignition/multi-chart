import { LitElement, html } from 'lit-element';

class Fetch extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      error: { type: String },
      data: { type: Object },
    };
  }

  render() {
    return html `
      <p>Fetching a remote file and parsing it</p>
      <div>
        Fetching data from <code>'./demo/data-fetch.json'</code>
        <d3-fetch 
          url="./demo/data-fetch.json" 
          @data-changed="${e => this.data = e.detail.value}" 
          @loading-changed="${e => this.loading = e.detail.value}" 
          @error-changed="${e => this.error = e.detail.value}"></3-fetch>
      </div>
      <div>${this.error ? `Error : ${this.error}` : ''}</div>
      <div>${this.loading ? 'Loading' : ''}</div>
      <div>Fetched Data: <code>${JSON.stringify(this.data)}</code></div>
    `;
  }
}

customElements.define('demo-fetch', Fetch);