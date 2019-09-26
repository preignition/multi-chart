import { LitElement, html } from 'lit-element';
import * as scales from 'd3-scale';
import {multipleRnd}  from '../demo-utils.js';
import {default as demoStyle } from '../demo-style.js';

const keys =  [{key: 'ananas'}, {key: 'banana'}, {key: 'apple'}, {key: 'orange'}];
const d1 = multipleRnd(keys.map(k => k.key), 50);
const d2 = multipleRnd(keys.map(k => k.key), 50);

class Chart extends LitElement {

  static get styles() {
    return demoStyle;
  }

  static get properties() {
    return {
      data : {type: Array},
      log : {type: Boolean},
      xScale: {type: Function   },
      yScale: {type: Function   },
      colorScale: {type: Function   },
      domainMax: {type: Number}

    };
  }

  toggleData() {
    this.data = this.data === d1 ? d2 : d1;
  }

  constructor() {
    super();
    this.serieConfig = {'valuePosition': 'right'}
    this.colorScale = scales.scaleOrdinal().range(['#c53929', '#c6dafc', '#7baaf7', '#4285f4', '#3367d6', '#b7e1cd', '#57bb8a', '#0f9d58', '#0b8043', '#fce8b2', '#f7cb4d', '#f4b400', '#f09300'])
    this.data = d1;

    
  }
}

export default Chart;
