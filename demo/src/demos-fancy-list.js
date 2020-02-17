import { LitElement, html, css } from 'lit-element';
import {parse } from '@preignition/preignition-widget';

// Note(cg): imported from https://github.com/web-padawan/api-viewer-element fixture.
import './fixtures/fancy-accordion.js';
import './fixtures/expansion-panel.js';

class DemosFancyList extends LitElement {
  static get styles() {
    return css `
      :host {
        display: block;
      }

     
      expansion-panel {
        cursor: pointer;
      }

      .md {  
        scale: 0.9;
        transform-origin: left;
      }
      /* [paper-font=display2] */
      .md h1 {
        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      }

      /* [paper-font=display1] */
      .md h2 {
        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      }

      /* [paper-font=headline] */
      .md h3 {
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      }

      /* [paper-font=subhead] */
      .md h4 {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }

      /* [paper-font=body2] */
      .md h5, .md h6 {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }

    `;
  }

  static get properties() {
    return {

      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String
      },

      /**
       * list of elements (output of web-component-analyzer)
       */
      list: {
        type: Array
      }

    };
  }


  render() {
    return html `
     <d3-fetch .url="${this.src}" @data-changed="${this.onDataChanged}"></d3-fetch>
     <fancy-accordion .openedIndex="${this.openedIndex}">
       ${(this.list || []).filter(l => l.name).map((l,i) => {
         return html `<expansion-panel .opened="${i === 0}" data-name="${l.name}">
           <div slot="header">${l.name}</div>
           <div class="md">${parse(l.description)}</div>
         </expansion-panel>`;
       })}
     </fancy-accordion>

    `;
  }

  onDataChanged(e) {
    if (e.detail.value) {
      this.list = e.detail.value.tags;
    }
  }
}

customElements.define('demos-fancy-list', DemosFancyList);