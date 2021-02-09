
import { LitElement } from 'lit-element';


import { capitalize, shapeProperties } from '../helper/utils.js';
import * as axis from 'd3-axis';

const instance = axis.axisTop();
const keys = Object.keys(instance || {});
const props = shapeProperties(keys);

/**
 * A litElement wrapper around [d3.axis](https://github.com/d3/d3-axis). 
 * 
 * @element d3-axis
 * @fires axis-changed - fires when axis value changes (and need to be re-rendered)
 *
 * 
 * 
 */
class D3Axis extends LitElement {

  static get properties() {

    return {

      ...props,

      /**
       * type of axis
       * @type {'top'|'bottom'|'left'|'right'}
       */
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
    let refreshed; 
    this.log && console.info(`d3-axis ${this.type} update`, props);
    if (!this.type && !props.has('type')) {
      this.type = 'bottom';
    }

    // Note(cg): ensure number for ticks.
    if (props.has('ticks') && typeof this.ticks === 'string') {
      this.ticks = this.ticks * 1;
    }

    if (this.axis || props.has('type')) {
      this.axis = axis[`axis${capitalize(this.type)}`]();
      refreshed = true;
    }

    if (this.axis) {
      this.updateWrapper(props, this.__init || refreshed);
    }
    super.update(props);
  }

  updateWrapper(props, shallNotify) {
    Object.keys(this.axis).forEach(key => {
      if ((this[key] !== undefined)) {
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

export default D3Axis;
