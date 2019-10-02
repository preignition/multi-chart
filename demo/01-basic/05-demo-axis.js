// LitElement and html are the basic required imports
import { LitElement, html, css } from 'lit-element';
import { d1 } from '../data.js'

// Create a class definition for your component and extend the LitElement base class
class DemoAxis extends LitElement {
  // The render callback renders your element's template. This should be a pure function,
  // it should always return the same template given the same properties. It should not perform
  // any side effects such as setting properties or manipulating the DOM. See the updated
  // or first-updated examples if you need side effects.
  render() {
    // Return the template using the html template tag. lit-html will parse the template and
    // create the DOM elements
    return html `
      <p>Example of a container with axis</p>
      <div>
        <label>bottom-axis</label><input name="bottom" type="checkbox" .checked="${this.bottomAxis}" @input=${(e) => {this.bottomAxis = e.currentTarget.checked;}}>  
        <label>right-axis</label><input name="bottom" type="checkbox" .checked="${this.rightAxis}" @input=${(e) => {this.rightAxis = e.currentTarget.checked;}}>
        <label>left-axis</label><input name="left" type="checkbox" .checked="${this.leftAxis}" @input=${(e) => {this.leftAxis = e.currentTarget.checked;}}>  
        </div>
      <div>
      <div>
        <label>bottom-text</label><input  .value="${this.bottomText}" @input=${(e) => {this.bottomText = e.currentTarget.value;}}>  
        <label>left-text</label><input  .value="${this.leftText}" @input=${(e) => {this.leftText = e.currentTarget.value;}}>  
      </div>
        <multi-container-axis
          .bottomAxis="${this.bottomAxis}"
          .bottomText="${this.bottomText}"
          .leftAxis="${this.leftAxis}"
          .leftText="${this.leftText}"
          .rightAxis="${this.rightAxis}"
          .rightText="${this.rightText}"
          
          bottom-accessor-path="key"
          bottom-scale-type="point"
          right-accessor-path="+value.count"
          
          .data="${this.data}"
          right-tick-format="${this.rightTickFormat}">
          <h3 slot="header">Container with Axis</h3>
       </multi-container-axis>
      </div>

    `;
  }

  static get properties() {
    return {
      data: { type: Array },
      bottomAxis: { type: Boolean },
      rightAxis: { type: Boolean },
      leftAxis: { type: Boolean },
      bottomText: { type: String },
      rightText: { type: String },
      leftText: { type: String },
    }
  }

  constructor() {
    super();
    this.data = d1;
    this.bottomAxis = true;
    this.leftText = 'left axis'
    this.bottomText = 'bottom axis'
    this.rightText = 'right axis'
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('demo-axis', DemoAxis);