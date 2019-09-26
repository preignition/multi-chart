import { LitElement, html } from 'lit-element';
import * as scales from 'd3-scale';
import {multipleRnd}  from '../demo-utils.js';
import {default as Base } from './demo-chart-base.js';

class Chart extends Base {



  render() {
    return html`
    
    <p>Example of a line chart</p>
    <button @click="${this.toggleData}">toggle data</button>
    <div>
      <label>value domain max</label><input  type="number" .value="${this.domainMax}" @input=${(e) => {this.domainMax = e.currentTarget.value *1;}}>  
      </div>
    <multi-chart-line 
        id="chart" 
        bottom-axis
        right-axis
        bottom-scale-type="ordinal"
        .log="${this.log}"
        .max="${this.domainMax}"
        .colorScale="${this.colorScale}"
        value-position="right"
        .data="${this.data}">
         <multi-serie key="ananas" label="ananas" path="+value.ananas" ></multi-serie>
         <multi-serie key="banana" label="banana" path="+value.banana" ></multi-serie>
         <multi-serie key="apple" label="apple" path="+value.apple" ></multi-serie>
         <multi-serie key="orange" label="orange" path="+value.orange" ></multi-serie>
        <h3 slot="header">Simple line chart</h3>
        
      </multi-chart-line>

    `;
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }


  constructor() {
    super();
    
  }

}

customElements.define('demo-line', Chart);