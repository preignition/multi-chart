import { LitElement, html } from 'lit-element';
import {chartStyle } from '@preignition/preignition-demo';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10 } from 'd3-scale-chromatic';

class Chart extends LitElement {

  static get styles() {
    return chartStyle;
  }

  render() {
    return html`
    <d3-fetch url="/demo/data/data.json" @data-changed="${e => this.data = e.detail.value}"></d3-fetch>
    <p>Example of a pie chart with values :</p> <code>${JSON.stringify(this.data)}</code>
    <label>inner radius<input  type="number" .value="${this.innerRadius}" @input=${(e) => {this.innerRadius = e.currentTarget.value;}}></label>  
    <label>pad angle<input  type="number" step="0.01" .value="${this.padAngle}" @input=${(e) => {this.padAngle = e.currentTarget.value;}}></label>  
    <multi-chart-pie 
        id="chart" 
        value-path="+value.count" 
        .innerRadius="${this.innerRadius}"
        .padAngle="${this.padAngle}"  
        .colorScale="${this.colorScale}"
        .data="${this.data}">
        <!-- add a legend -->
        <multi-legend .scale="${this.colorScale}" position="top-right"></multi-legend>
        <!-- make it selectable -->
        <multi-select @selected-changed="${e => this.selected = e.detail.value}" track-hover></multi-select>
        <h4 slot="header">This is a pie</h4>
        <code slot="footer">selected: ${this.selected}</code>
      </multi-chart-pie>

    `;
  }

  static get properties() {
    return {
      ...super.properties,

      data: {type: Array},
      innerRadius: {type: Number},
      padAngle: {type: Number},
      colorScale: {type: Function},
      selected: {type: String}
    };
  }

  constructor() {
    super();
    this.colorScale = scaleOrdinal().range(schemeCategory10).domain(['a', 'b', 'c', 'd']);
    this.innerRadius = 30;
    this.padAngle = 0.07;
    this.selected = '';
  }


}

customElements.define('demo-pie', Chart);