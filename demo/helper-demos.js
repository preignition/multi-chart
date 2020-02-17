import { LitElement, html, css } from 'lit-element';
import {default as demoStyle } from './src/demo-style.js';
import {parse } from '@preignition/preignition-widget';
import {DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';

import './src/demo-api-viewer.js';
import './src/demos-container.js';
import './src/demos-fancy-list.js';

class HelperDemos extends DefaultValueMixin(DoNotSetUndefinedValue(LitElement)) {
  static get styles() {
    return [
        demoStyle
    ];
  }

  static get properties() {
    return {
       /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: '/docs/helper.json'

      },

      readme: {
        type: String,
        value: '/src/helper/README.md'
      },

      header: {
        type: String,
      },

      selected: {
        type: String
      }
    };
  }


  render() {
    return html`
    <d3-fetch .url="${this.readme}" @data-changed="${e => {this.header = e.detail.value;}}" type="text"></d3-fetch>
    <demos-container .src="${this.src}">
      <div slot="header">
        ${parse(this.header)}
      </div>
      <demos-fancy-list slot="list" .src="${this.src}"></demos-fancy-list>
      <demo-api-viewer .selected="${this.selected}" slot="aside" .src="${this.src}">
        
        <template data-element="d3-format" data-target="host">
          <d3-format specifier=".1f" value='123.999'></d3-format>
        </template>

        <template data-element="d3-fetch" data-target="host">
          <d3-fetch url="/demo/data/data.json" type="json"></d3-fetch>
        </template>

      </demo-api-viewer>
    </demos-container>
    
    `;
  }
  firstUpdated() {
    
    this.addEventListener('click', e => {
      const panel = e.composedPath().find(el => el.localName === 'expansion-panel');
      if (panel && panel.dataset.name) {
        this.selected = panel.dataset.name;
      }
    });

    super.firstUpdated(...arguments);
  }
}

customElements.define('helper-demos', HelperDemos);
