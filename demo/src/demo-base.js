import { LitElement, html, css } from 'lit-element';
import {default as demoStyle } from './demo-style.js';
import {default as mdStyle } from './demo-md-style.js';
import {DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
// import { BaseMixin } from './src/demo-base-mixin.js';


class BaseDemo extends DefaultValueMixin(DoNotSetUndefinedValue(LitElement)) {
  static get styles() {
    return [
        demoStyle,
        mdStyle
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

      /**
       * the selected item to display in the api
       * @type {Object}
       */
      selected: {
        type: String
      },

      /**
       * the active subtab (in expansion panel)
       * @type {Object}
       */
      activeTab: {
        type: String
      }
    };
  }


  firstUpdated() {
    this.addEventListener('rendered', this.applyConfig);
    this.addEventListener('click', e => {
      const panel = e.composedPath().find(el => el.localName === 'expansion-panel');
      if (panel && panel.dataset.name) {
        this.selected = panel.dataset.name;
      }
    });
    super.firstUpdated(...arguments);
  }


  applyConfig(e) {
    const config = this.config || {};
    const {component} = e.detail;

    if (component && config[component.localName]) {
      Object.keys(config[component.localName]).forEach(k => {
        component[k] = config[component.localName][k];
      });
    }
  }
}

export default BaseDemo;
