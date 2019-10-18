import { LitElement } from 'lit-element';
import { capitalize, shapeProperties } from '../helper/utils.js';
import * as legend from 'd3-svg-legend';

// Note(cg): allowed scales
const legendNames = ['color', 'size', 'symbol'];

const props = {};
legendNames.forEach(name => {
  const instance = legend[`legend${capitalize(name)}`]()
  const keys = Object.keys(instance || {});
  shapeProperties(keys, props);
  
})

class D3Legend extends LitElement {

  static get properties() {

    return {

      ...props,

      type: { type: String }

    };
  }

  constructor() {
    super()
    this.__init = true;
  }

  update(props) {
    super.update(props);
    if (!this.type && !props.has('type')) {
      this.type = 'color';
    }

    if (!this.legend || props.has('type')) {
      this.legend = legend[`legend${capitalize(this.type)}`]()
    }

    if (this.legend) {
      this.updateWrapper(props);
    }
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && this.legend[key]) {
        shallNotify = true;
        this.legend[key](this[key]);
      }
    });
    if (shallNotify) {
      this.dispatchEvent(new CustomEvent(`legend-changed`, { detail: { value: this.legend }, bubbles: true, composed: true }));
      delete this.__init;
    }
  }
}

export default D3Legend;