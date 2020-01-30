import { LitElement } from 'lit-element';
import { camelToDashCase } from '../helper/utils.js';

import * as shapes from 'd3-shape';

// Note(cg): shapes that we want to expose.
const shapeNames = ['pie', 'arc', 'stack', 'line', 'lineRadial', 'area'];
const shapeType = {
  padAngle: Number,
  innerRadius: Number,
  outerRadius: Number
};
const classes = {};

class WrapperBase extends LitElement {

  get wrapper() {
    return this[this.name];
  }

  constructor() {
    super();
    this.__init = true;
    this[this.name] = shapes[this.name]();
  }

  update(props) {
    super.update(props);
    this.log && console.info(`d3-shape ${this.name} update`, props);
    this.updateWrapper(props);
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && key !== this.name) {
        shallNotify = true;
        this[this.name][key](this[key]);
      }
    });
    if (shallNotify) {
      this.dispatchEvent(new CustomEvent(`shape-changed`, { detail: { value: this[this.name], name: this.name }, bubbles: true, composed: true }));
      delete this.__init;
    }
  }
}

shapeNames.forEach(name => {
  const instance = shapes[name]();
  const keys = Object.keys(instance);
  const props = {
    // [`${name}`]: {
    //   type: Function
    // }
  };

  keys.forEach(key => {
    props[key] = {
      type: shapeType[key] || Function,
      attribute: camelToDashCase(key)
    };
  });

  classes[name] = class extends WrapperBase {

    get name() {
      return name;
    }

    static get properties() {
      return props;
    }

  }

})
// console.info(classes);
export const Pie = classes.pie;
export const Arc = classes.arc;
export const Area = classes.area;
export const Stack = classes.stack;
export const Line = classes.line;
export const LineRadial = classes.lineRadial;
