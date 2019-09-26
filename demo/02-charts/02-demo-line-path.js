import { LitElement, html } from 'lit-element';
import * as scales from 'd3-scale';

class Chart extends LitElement {

  render() {
    return html`
    <d3-fetch url="./demo/data.json" @data-changed="${e => this.data = e.detail.value}"></d3-fetch>
    <p>Example of a pie chart with values = <code>${JSON.stringify(this.data)}</code></p>
    <label>inner radius</label><input  type="number" .value="${this.innerRadius}" @input=${(e) => {this.innerRadius = e.currentTarget.value;}}>  
    <multi-chart-line 
        id="chart" 
        .colorScale="${this.colorScale}"
        .xScale="${this.xScale}"
        .yScale="${this.yScale}"
        .data="${this.data}">
        <h3 slot="header">This is a line</h3>
        
      </multi-chart-line>

    `;
  }

  static get properties() {
    return {
      data : {type: Array},
      xScale: {type: Function   },
      yScale: {type: Function   },
      colorScale: {type: Function   },
    };
  }

  constructor() {
    super();
    this.xScale = scales.scaleLinear();
    this.yScale = scales.scaleOrdinal();
    this.colorScale = scales.scaleOrdinal().range(['#c53929', '#c6dafc', '#7baaf7', '#4285f4', '#3367d6', '#b7e1cd', '#57bb8a', '#0f9d58', '#0b8043', '#fce8b2', '#f7cb4d', '#f4b400', '#f09300'])
  }

}

customElements.define('demo-line-path', Chart);