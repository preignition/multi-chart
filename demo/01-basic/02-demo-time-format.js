// LitElement and html are the basic required imports
import { LitElement, html, css} from 'lit-element';

// Create a class definition for your component and extend the LitElement base class
class DemoFormat extends LitElement {
  // The render callback renders your element's template. This should be a pure function,
  // it should always return the same template given the same properties. It should not perform
  // any side effects such as setting properties or manipulating the DOM. See the updated
  // or first-updated examples if you need side effects.
  render() {
    // Return the template using the html template tag. lit-html will parse the template and
    // create the DOM elements
    return html`
      <p>Setting date format example</p>
      <div>
      Value: <input  type="date" value="${this.value}" @input=${(e) => this.value = e.currentTarget.value}></input> |
      Format: <input  .value="${this.specifyer}" @input=${(e) => this.specifyer = e.currentTarget.value}></input> 
      </div>
      <div>
      Format:  <d3-format is-time .value=${this.value} .specifyer=${this.specifyer}></d3-format>
      </div>
      <a href="https://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95" target="_blank">time format specifyer examples</a>

    `;
  }

  static get properties() {
    return {
      value : {
        type: Date
      },
      specifyer: {
        type: String
      }
    }
  }

  constructor() {
    super();
    this.value = '2019-09-04';
    this.specifyer = '%Y-%m-%d'
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('demo-time-format', DemoFormat);