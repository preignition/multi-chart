import { LitElement } from 'lit-element';

import { capitalize, shapeProperties } from '../helper/utils.js';
import * as axis from 'd3-axis';

const instance = axis.axisTop();
const keys = Object.keys(instance || {});
const props = shapeProperties(keys);

class Axis extends LitElement {

  static get properties() {

    return {

      ...props,

      type: {
        type: String,
      },

      domain: {
        type: Array
      },
      range: {
        type: Array
      }
    };
  }
  constructor() {
    super();
    this.__init = true;
  }

  update(props) {
    super.update(props);
    this.log && console.info(`d3-axis ${this.type} update`, props)
    if (!this.type && !props.has('type')) {
      this.type = 'bottom';
    }

    if (!this.axis || props.has('type')) {
      this.axis = axis[`axis${capitalize(this.type)}`]();
    }

    if (this.axis) {
      this.updateWrapper(props);
    }
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && key !== 'axis' && this.axis[key]) {
        shallNotify = true;
        this.axis[key](this[key]);
      }
    });
    if (shallNotify) {
      this.dispatchEvent(new CustomEvent(`axis-changed`, { detail: { value: this.axis, type: this.type }, bubbles: true, composed: true }));
      delete this.__init;
    }
  }
}

export default Axis;