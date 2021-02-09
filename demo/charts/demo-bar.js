import { LitElement, html, css } from 'lit-element';
import { default as Base } from './demo-chart-base.js';
// import {default as chartStyle } from '../src/demo-chart-style.js';
import * as scales from 'd3-scale';
import * as format from 'd3-format';

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

class Chart extends LitElement {
  
  static get styles() {
    return css `
           :host {
          display: block;
          // --drawable-bar-fill: #444123;
        }

        code {
          font-size: smaller;
          line-height: 10px;
        }

        label {
          display: block;
          min-width: 150px;
          padding-right: 10px;
        }

        .chart, #chart {
          margin-top: 30px;
          min-height: 350px
        }
        `
  }
  
  render() {
    return html `
    <p>Example of a bar chart (inspired from <a href="https://bl.ocks.org/mbostock/3887051">https://bl.ocks.org/mbostock/3887051</a>)</p>
    <div>
      <button @click="${e => this.stacked = !this.stacked}">toggle stack (current: ${this.stacked ? 'stacked' : 'not stacked'})</button>
    </div>
    <label>scale padding</label><input  type="number" step="0.1" .value="${this.padding}" @input=${(e) => {this.padding = e.currentTarget.value * 1;}}>  
    <label>right margin</label><input  type="number" .value="${this.rightMargin}" @input=${(e) => {this.rightMargin = e.currentTarget.value * 1;}}>  

    <d3-fetch type="csv" url="/demo/data/census.csv" @data-changed="${this.handleData}"></d3-fetch>
    <multi-chart-bar
        id="chart" 
        bottom-axis
        left-axis
        left-ticks="5"
        .leftTickFormat="${this.format}"
        .bottomPadding="${this.padding}"
        .stacked="${this.stacked}"
        .log="${this.log}"
        .keys="${this.keys}"
        .sort="${(a, b) => ascending(a.State, b.State)}"
        .keyAccessor="${this.keyAccessor}"
        .rightMargin="${this.rightMargin}"
        .colorScale="${this.colorScale}"
        .data="${this.data}">
        <h3 slot="header">Simple Bar Chart</h3>
        <multi-legend .scale="${this.colorScale}" .labels="${this.keys}"></multi-legend>
      </multi-chart-bar>

      <multi-chart-bar
        class="chart" 
        bottom-axis
        left-axis
        value-position="bottom"
        key-position="left"
        orientation="horizontal"
        bottom-ticks="5"
        .bottomDecorate="${chart => {console.info('decorate', chart); return chart;}}"
        .bottomTickFormat="${this.format}"
        .leftPadding="${this.padding}"
        .stacked="${this.stacked}"
        .log="${this.log}"
        .keys="${this.keys}"
        .keyAccessor="${this.keyAccessor}"
        .rightMargin="${this.rightMargin}"
        .colorScale="${this.colorScale}"
        .data="${this.data}">
        <h3 slot="header">Horizontal Bar Chart</h3>
        <multi-legend .scale="${this.colorScale}" .labels="${this.keys}"></multi-legend>
      </multi-chart-bar>

    `;
  }

  static get properties() {
    return {
      data: {type: Array},
      states: {type: Array},
      keys: {type: Array},
      padding: {type: Number},
      rightMargin: {type: Number},
      format: {type: Function},
      stacked: {type: Boolean},
      orientation: {type: String},
      keyAccessor: {type: Function},
      colorScale: {type: Function}

    };
  }

  constructor() {
    super();
    this.colorScale = scales.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.rightMargin = 150;
  }



  handleData(e) {
    const data = e.detail.value;
    this.keyAccessor = d => d.State;
    this.keys = data.columns.slice(1);
    this.data = data;
    this.padding = 0.1;
    this.format = format.format('.1s');
    this.stacked = false;
    this.colorScale.domain(this.keys);
  }
}

customElements.define('demo-bar', Chart);
