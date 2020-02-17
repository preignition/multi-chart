import { LitElement, html } from '/web_modules/lit-element.js';
import { timeData } from '../demo-utils.js';
import * as scales from '/web_modules/d3-scale.js';
import * as format from '/web_modules/d3-format.js';
import {timeFormat} from '/web_modules/d3-time-format.js';
import * as time from '/web_modules/d3-time.js';

class Chart extends LitElement {

  render() {
    return html `
    <p>Example of a bar chart with a time scale</p>

    <label>scale padding</label><input  type="number" step="0.1" .value="${this.padding}" @input=${(e) => {this.padding = e.currentTarget.value *1;}}>  
    <label>right margin</label><input  type="number" .value="${this.rightMargin}" @input=${(e) => {this.rightMargin = e.currentTarget.value *1;}}>  
    <div>
      <label>time format</label><input .value="${this.timeFormat}" @input=${(e) => {this.timeFormat = e.currentTarget.value}}> , as per https://github.com/d3/d3-time-format#d3-time-format
    </div>

    <multi-chart-bar
        id="chart" 
        bottom-axis
        left-axis
        left-ticks="2"
        bottom-ticks="3"
        .leftTickFormat="${this.format}"
        .bottomPadding="${this.padding}"
        bottom-scale-type="time"
        .bottomTickFormat="${timeFormat(this.timeFormat)}"
        
        stacked

        .data="${this.data}"
        .log="${this.log}"
        .keys="${this.keys}"
        .keyAccessor="${this.keyAccessor}"
        .value="${this.value}"
        .rightMargin="${this.rightMargin}"
        .colorScale="${this.colorScale}"
        >
        <h3 slot="header">time serie</h3>
        <multi-legend .scale="${this.colorScale}" .labels="${this.keys}"></multi-legend>
      </multi-chart-bar>

    `;
  }

  static get properties() {
    return {
      data: { type: Array },
      states: { type: Array },
      keys: { type: Array },
      padding: { type: Number },
      rightMargin: { type: Number },
      format: { type: Function },
      stacked: { type: Boolean },
      keyAccessor: { type: Function },
      value: { type: Function },
      
      timeFormat: { type: String },
      colorScale: { type: Function }

    };
  }

  constructor() {
    super()
    this.colorScale = scales.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.rightMargin = 150;
    this.data = timeData(30);
    this.keys = ['count']

    this.value = (d,key) => {return d.value.count}
    this.timeFormat = '%d %b'
    this.keyAccessor = d => d.key;
    this.padding = 0.1
  }
}

customElements.define('demo-bar-time', Chart);