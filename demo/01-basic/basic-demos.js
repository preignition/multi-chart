import { LitElement, html, css } from '/web_modules/lit-element.js';
import {  LitNotify,  LitSync} from '/web_modules/@morbidick/lit-element-notify.js';
import {default as demoStyle } from '../demo-style.js';

import 'api-viewer-element';

// import '../../index.js';
// import './01-demo-format.js';
// import './02-demo-time-format.js';
// import './03-demo-fetch.js';
// import './04-demo-scale.js';
// import './05-demo-axis.js';
// import './06-demo-legend.js';
// import './07-demo-radar-axes.js';

class BasicDemos extends LitSync(LitElement) {
  static get styles() {
    return [
        demoStyle
    ];
  }

  static get properties() {
    return {

    }
  }


  render() {
    return html`

    <div class="card">
      <h2>d3-format</h2>
      <api-viewer src="/docs/d3-format.json">
      </api-viewer>
    </div>
      <!--paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-format</h2></a>
          <demo-format></demo-format>
        </div>
      </paper-card>

      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-format time</h2></a>
          <demo-time-format></demo-time-format>
        </div>
      </paper-card>

       <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-fetch</h2></a>
          <demo-fetch></demo-fetch>
        </div>
      </paper-card>

      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-scale</h2></a>
          <demo-scale></demo-scale>
        </div>
      </paper-card>
    
      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-axis</h2></a>
          <demo-axis></demo-axis>
        </div>
      </paper-card>

      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-legend</h2></a>
          <demo-legend></demo-legend>
        </div>
      </paper-card>

      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>radar-axes</h2></a>
          <demo-radar-axes></demo-radar-axes>
        </div>
      </paper-card-->

    `;
  }
}

customElements.define('basic-demos', BasicDemos);