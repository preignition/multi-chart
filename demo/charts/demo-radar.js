import { LitElement, html, css} from 'lit-element';
import * as scales from 'd3-scale';
import {default as chartStyle } from '../src/demo-chart-style.js';
import {multipleRnd}  from '../src/demo-utils.js';
import {default as Base } from './demo-chart-base.js';

class Chart extends Base {

  static get styles() {
    return [...super.styles, css `
      multi-chart-radar {
          height: 600px;
        }
    `];
  }

  render() {
    return html`
    
    <p>Example of a line chart</p>
    <button @click="${this.toggleData}">toggle data</button>
    <div>
      <label>value domain max</label><input  type="number" .value="${this.domainMax}" @input=${(e) => {this.domainMax = e.currentTarget.value *1;}}>  
      </div>
    <multi-chart-radar 
        id="chart" 
        .log="${this.log}"
        .axes="${this.axes}"
        .max="${this.domainMax}"
        .colorScale="${this.colorScale}"
        .data="${this.data}">
         <multi-serie key="ananas" label="ananas" path="+value.ananas" ></multi-serie>
         <multi-serie key="banana" label="banana" path="+value.banana" ></multi-serie>
         <multi-serie key="apple" label="apple" path="+value.apple" ></multi-serie>
         <multi-serie key="orange" label="orange" path="+value.orange" ></multi-serie>
        <h3 slot="header">Simple line chart</h3>
        
      </multi-chart-radar>

    `;
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }


  constructor() {
    super();
    this.axes = [
      {key: 0, label: 'first dimension'},
      {key: 1, label: 'second dimension'},
      {key: 2, label: 'third dimension'},
      {key: 3, label: 'fourth dimension'},
      {key: 4, label: 'fifth dimension'},
      {key: 5, label: 'sixth dimension'},
      {key: 6, label: 'seventh dimension'},
    ]
    
  }

}

customElements.define('demo-radar', Chart);