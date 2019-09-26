import { LitElement } from 'lit-element';

import { capitalize, camelToDashCase  } from '../helper/utils.js';
import * as brush from 'd3-brush';

const props = {};
const instance = brush.brush();
const keys = Object.keys(instance || {});
keys.forEach(key => {
  if (!props[key]) {
    props[key] = {
      type: Function,
      attribute: camelToDashCase(key)
    }
  }
})


class Brush extends LitElement {

  static get properties() {

    return {

      ...props,

      type: {
        type: String
      },

      
    };
  }
  constructor() {
    super();
    this.__init = true;
  }

  update(props) {
    super.update(props);
    this.log && console.info(`d3-brush${this.type} update`, props)
    if (!this.type && !props.has('type')) {
      this.type = 'brushX';
    }

    if (!this.brush || props.has('type')) {
      this.brush = brush[`brush${capitalize(this.type)}`]();
    }

    if (this.brush) {
      this.updateWrapper(props);
    }
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && key !== 'brush' && this.brush[key]) {
        shallNotify = true;
        this.brush[key](this[key]);
      }
    });
    if(shallNotify) {
      this.dispatchEvent(new CustomEvent(`d3-brush-changed`, { detail: { value: this.brush, type: this.type }, bubbles: true, composed: true }));
       delete this.__init;
    }
  }
}

export default Brush;
