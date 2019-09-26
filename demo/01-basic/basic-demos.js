import { LitElement, html, css } from 'lit-element';
import {  LitNotify,  LitSync} from '@morbidick/lit-element-notify';
import '../../index.js';
import './01-demo-format.js';
import './02-demo-time-format.js';
import './03-demo-fetch.js';
import './04-demo-scale.js';
import './05-demo-axis.js';
import './06-demo-legend.js';

class BasicDemos extends LitSync(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
          --secondary-text-color: grey;
        }

        a {
          text-decoration: none;
        }

        .demo > *:not(h2):not(a) {
          display: block;
          border: 1px solid	#e2e2e2;
          border-radius: 5px;
          padding: 8px;
          margin: 8px 0;
          line-height: 32px;
        }

        paper-card { 
          border-radius: 5px;
          flex: 1; 
          padding: 12px;
          margin: 0 0 32px 0;
        }

        h2 {
          font-size: 20px;
          color: #2c3e50;
        }

        h2:hover::after { 
          color: #9B35FA;
          content: " #";
        }

        h1 {
          margin-top: 0px;
          color: #9B35FA;
        }
      `,
    ];
  }

  static get properties() {
    return {

    }
  }


  render() {
    return html`
      <paper-card>
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
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=01-basic%2F01-basic-setup.js" target="_blank"><h2>d3-axis</h2></a>
          <demo-legend></demo-legend>
        </div>
      </paper-card>

    `;
  }
}

customElements.define('basic-demos', BasicDemos);