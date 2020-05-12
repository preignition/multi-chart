import { html, css } from 'lit-element';
import { DemoBase, multipleRnd } from '@preignition/preignition-demo';

// import { default as Base } from './src/demo-base.js';
// import { multipleRnd } from './src/demo-utils.js';

import './advanced/demo-bar-time.js';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

// const keys = ['tomato', 'banana', 'pear', 'apple'];
// const data = [{ 'key': 'a', 'value': { 'count': 22 } }, { 'key': 'b', 'value': { 'count': 22 } }, { 'key': 'c', 'value': { 'count': 10 } }, { 'key': 'd', 'value': { 'count': 43 } }, { 'key': 'e', 'value': { 'count': 35 } }, { 'key': 'f', 'value': { 'count': 29 } }]

// // Note(cg): config to apply to components when they are rendered.
// const config = {
//   'multi-chart-pie': {
//     scale: scaleOrdinal().range(schemeCategory10).domain(['a', 'b', 'c', 'd']),
//     data: data,
//     valuePath: '+value.count',
//     innerRadius: 30,
//     padAngle: 0.07
//   }
// };


class AdvancedDemo extends DemoBase {

  static get properties() {
    return {
      /*
       * location of web-content-analyzer json output
       */
      src: {
        type: String,
        value: '/docs/chart.json'

      },

      readme: {
        type: String,
        value: '/src/chart/README.md'
      },


    };
  }


  render() {
    return html `
    <demos-container>
      <div slot="header">
        <demo-readme src="${this.readme}"></demo-readme>
      </div>
      <fancy-accordion >
          
          <expansion-panel opened>
              <div slot="header">multi-chart-pie</div>
              <vaadin-tabs selected="${this.tabs.indexOf(this.activeTab)}" theme="centered">
                <vaadin-tab @click=${() => this.activeTab = 'intro'}>Intro</vaadin-tab>
                <vaadin-tab @click=${() => this.activeTab = 'api'}>API</vaadin-tab>
                <vaadin-tab @click=${() => this.activeTab = 'demo2'}>Alternative Demo</vaadin-tab>
            </vaadin-tabs>
            ${this.activeTab === 'intro' ? html `
              <h2>Example</h2>
              <demo-bar-time class="example"></demo-bar-time>` : ''}
            ${this.activeTab === 'api' ? html `
              <h2>API</h2>
              <demo-api-viewer selected="multi-chart-pie"  .src="${this.src}">` : ''}
          </expansion-panel>

  
    </demos-container>
    
    `;
  }



  constructor() {
    super();
    this.tabs = ['intro', 'api', 'demo2'];
    this.activeTab = 'intro';
    // Note(cg): Base method applyConfig needs config.
    // this.config = config;
  }

}

customElements.define('advanced-demo', AdvancedDemo);