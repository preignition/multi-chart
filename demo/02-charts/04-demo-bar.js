import { LitElement, html } from '/web_modules/lit-element.js';
import { default as Base } from './demo-chart-base.js';
import * as scales from '/web_modules/d3-scale.js';
import * as format from '/web_modules/d3-format.js';

class Chart extends LitElement {

  render() {
    return html `
    <p>Example of a bar chart (inspired from <a href="https://bl.ocks.org/mbostock/3887051">https://bl.ocks.org/mbostock/3887051</a>)</p>
    <div>
      <button @click="${ e => this.stacked = !this.stacked}">toggle stack</button>
    </div>
    <label>scale padding</label><input  type="number" step="0.1" .value="${this.padding}" @input=${(e) => {this.padding = e.currentTarget.value *1;}}>  
    <label>right margin</label><input  type="number" .value="${this.rightMargin}" @input=${(e) => {this.rightMargin = e.currentTarget.value *1;}}>  

    <d3-fetch type="csv" url="./data/census.csv" @data-changed="${this.handleData}"></d3-fetch>
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
        .keyAccessor="${this.keyAccessor}"
        .rightMargin="${this.rightMargin}"
        .colorScale="${this.colorScale}"
        .data="${this.data}">
        <h3 slot="header">Simple line chart</h3>
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
      keyAccessor: {type:Function},
      colorScale: {type:Function}

    };
  }

  constructor() {
    super()
    this.colorScale = scales.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.rightMargin = 150;
  }



  handleData(e) {
    const data = e.detail.value;
    this.keyAccessor = d => d.State;
    this.keys = data.columns.slice(1);
    this.data = data;
    this.padding = 0.1
    this.format = format.format(".1s")
    this.stacked = false;
    this.colorScale.domain(this.keys);
  }


}

customElements.define('demo-bar', Chart);