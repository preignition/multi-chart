import { LitElement, html, css } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import { parse } from '@preignition/preignition-widget';
import { text } from 'd3-fetch';
import { default as mdStyle } from './demo-md-style.js';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';

class DemoReadme extends DefaultValueMixin(DoNotSetUndefinedValue(LitElement)) {

  static get styles() {
    return [
      mdStyle,
      css `
      :host {
         display: block;
         margin: 20px auto;
         width: 75vw;
      }

      @media screen and (max-width: 992px) {
      }
    `
    ];
  }

  static get properties() {
    return {
      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: 'README.md'
      },

      md: {
        type: String
      }
    };
  }


  render() {

    const { src } = this;
    let md;

    if (src && this.lastSrc !== src) {
      this.lastSrc = src;
      md = text(src)
          .then(text => parse(text))
          .catch(e => html `<span>Error while loading ${src}</span>`);
    }

    return html `
      ${until(md, html`<span>Loading...</span>`)}
    `;
  }

}

customElements.define('demo-readme', DemoReadme);