// LitElement and html are the basic required imports
import { LitElement, html, css } from 'lit-element';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10 } from 'd3-scale-chromatic';

// Create a class definition for your component and extend the LitElement base class
class DemoLegend extends LitElement {
  // The render callback renders your element's template. This should be a pure function,
  // it should always return the same template given the same properties. It should not perform
  // any side effects such as setting properties or manipulating the DOM. See the updated
  // or first-updated examples if you need side effects.
  render() {
    // Return the template using the html template tag. lit-html will parse the template and
    // create the DOM elements
    return html `
      <p>Legend exmaple.</p>
      
      <div>
      <label>select position</label>
      <select .value="${this.position}" @input=${(e) => {this.position = e.currentTarget.value;}}>
          <option value="top-right">top-right</option>
          <option value="bottom-right">bottom-right</option>
          <option value="top-left">top-left</option>
          
        </select>
      </div>
        <multi-container>
          <h3 slot="header">Container with Legend</h3>
          <multi-legend 
            .position="${this.position}"  
            .scale="${this.scale}"></multi-legend>
       </multi-container>
      </div>

    `;
  }

  static get properties() {
    return {
      position: { type: String },
      scale: { type: Function },
      
    }
  }

  constructor() {
    super();
    this.position = 'top-right';
    const keys = ['tomato', 'banana', 'pear', 'apple']
    this.scale = scaleOrdinal().range(schemeCategory10).domain(keys);
    
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('demo-legend', DemoLegend);