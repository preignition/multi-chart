// LitElement and html are the basic required imports
import { LitElement, html, css } from '/web_modules/lit-element.js';

// Create a class definition for your component and extend the LitElement base class
class DemoRadarAxes extends LitElement {
  // The render callback renders your element's template. This should be a pure function,
  // it should always return the same template given the same properties. It should not perform
  // any side effects such as setting properties or manipulating the DOM. See the updated
  // or first-updated examples if you need side effects.
  render() {
    // Return the template using the html template tag. lit-html will parse the template and
    // create the DOM elements
    return html `
      <p>Radar Axes</p>
      
      <div>
        <multi-container-radar .axes=${this.axes}>
          <h3 slot="header">Radar Container </h3>
       </multi-container-radar>
      </div>

    `;
  }

  static get properties() {
    return {
      axes: { type: Array },
    };
  }

  constructor() {
    super();
    this.axes = [1, 2, 3, 4, 5];
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('demo-radar-axes', DemoRadarAxes);
