import { LitElement, html } from 'lit-element';
import * as scales from 'd3-scale';
import { multipleRnd } from '../demo-utils.js';
import {default as Base } from './demo-chart-base.js';


class Chart extends Base {

  render() {

    return html `
    <p>Example of a bubble chart</p>
    <button @click="${this.toggleData}">toggle data</button>
    <div>
      <label>z range min</label><input  type="number" .value="${this.zRangeMin}" @input=${(e) => {this.zRangeMin= e.currentTarget.value *1;}}>  
      <label>z range Max</label><input  type="number" .value="${this.zRangeMax}" @input=${(e) => {this.zRangeMax= e.currentTarget.value *1;}}>  
    </div>
      <multi-chart-bubble 
        
        id="chart" 
        log
        bottom-axis
        left-axis
        .zDomain=${this.zDomain}
        
        .zRange=${[this.zRangeMin, this.zRangeMax]}
        .zPath=${this.zPath}
        .rightMax="${this.domainMax}"
        .colorScale="${this.colorScale}"
        .data="${this.data}">
         <multi-serie key="ananas" label="ananas" path="+value.ananas" ></multi-serie>
         <multi-serie key="banana" label="banana" path="+value.banana" ></multi-serie>
         <multi-serie key="apple" label="apple" path="+value.apple" ></multi-serie>
         <multi-serie key="orange" label="orange" path="+value.orange" ></multi-serie>
        
        <h3 slot="header">Simple line chart</h3>
        
      </multi-chart-bubble>
    `;
  }

  static get properties() {
    return {
      ...super.properties,

      zDomain: {type: Array},
      zPath: {type: String},
      zRange: {type: Array},
      zRangeMin: {type: Number},
      zRangeMax: {type: Number},
    };
  }

  constructor() {
    super();
    this.zDomain = [0,10];
    this.zPath = '+value';
    this.zRangeMin= 2;
    this.zRangeMax = 6;
    // this.zRange = [3,10];
  }


}

customElements.define('demo-bubble', Chart);