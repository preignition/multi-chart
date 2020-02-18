import { LitElement, html, css } from '/web_modules/lit-element.js';
import './01-demo-pie.js';
import './02-demo-line-path.js';
import './03-demo-line.js';
import './04-demo-bar.js';
import './05-demo-bubble.js';
import './06-demo-radar.js';

class ChartDemos extends LitElement {
 
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }
        a {
          text-decoration: none;
        }
        .demo > *:not(h2):not(a):not(button) {
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
      `
    ];
  }

  render() {
    return html`
       <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F01-first-updated.js" target="_blank"><h2>Pie Chart</h2></a>
          <demo-radar log></demo-radar>
        </div>
      </paper-card>
      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F01-first-updated.js" target="_blank"><h2>Pie Chart</h2></a>
          <demo-pie></demo-pie>
        </div>
      </paper-card>
      <!--paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F02-updated.js" target="_blank"><h2>Line Chart Path</h2></a>
          <demo-line-path></demo-line-path>
        </div>
      </paper-card-->
      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F02-updated.js" target="_blank"><h2>Line Chart</h2></a>
          <demo-line></demo-line>
        </div>
      </paper-card>
      <!--paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F02-updated.js" target="_blank"><h2>Bubble Chart</h2></a>
          <demo-bubble></demo-bubble>
        </div>
      </paper-card>
      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F02-updated.js" target="_blank"><h2>Bar Chart</h2></a>
          <demo-bar></demo-bar>
        </div>
      </paper-card-->

    `;
  }
}

customElements.define('charts-demos', ChartDemos);