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
});

/**
 * ## D3Legend
 *
 * a wrapper around  [`d3-svg-legend`](https://d3-legend.susielu.com/)
 *
 * @prop {Function} scale - d3.scale to use for the legend
 */
class D3Legend extends LitElement {

  static get properties() {

    return {

      ...props,

      type: { type: String }

    };
  }

  constructor() {
    super();
    this.__init = true;
  }

  update(props) {
    if (!this.type && !props.has('type')) {
      this.type = 'color';
    }

    if (!this.legend || props.has('type')) {
      this.legend = legend[`legend${capitalize(this.type)}`]();
    }

    if (this.legend) {
      this.updateWrapper(props);
    }
    super.update(props);
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