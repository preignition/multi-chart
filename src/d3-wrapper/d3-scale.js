import { LitElement } from 'lit-element';
import { capitalize, shapeProperties } from '../helper/utils.js';
import * as scales from 'd3-scale';

// Note(cg): allowed scales
const scaleNames = {
  'linear': 'continuous',
  'pow': 'continuous',
  'sqrt': 'continuous',
  'log': 'continuous',
  'identity': 'continuous',
  'time': 'continuous',
  'sequential': 'sequential',
  'quantize': 'quantize',
  'quantile': 'quantile',
  'threshold': 'threshold',
  'ordinal': 'ordinal',
  'band': 'ordinal',
  'point': 'ordinal'
};


const hasChanged = (val, old) => {
  return (val !== old) || (JSON.stringify(val || []) !== JSON.stringify(old || []))
}

const props = {};
Object.keys(scaleNames).forEach(name => {
  const instance = scales[`scale${capitalize(name)}`]()
  const keys = Object.keys(instance || {});
  shapeProperties(keys, props);
})


class Scale extends LitElement {

  get family() {
    if (this.type) {
      return scaleNames[this.type];
    }
    return null;
  }

  static get properties() {

    return {

      ...props,

      scaleType: {
        type: String,
        attribute: 'scale-type'
      },

      domain: {
        type: Array,
        hasChanged: hasChanged
      },
      range: {
        type: Array,
        hasChanged: hasChanged
      }
    };
  }

  constructor() {
    super();
    this.__init = true;
  }

  update(props) {
    super.update(props);
    if (!this.scaleType && !props.has('scaleType')) {
      this.scaleType = 'linear';
    }

    if (!this.scale || props.has('scaleType')) {
      this.scale = scales[`scale${capitalize(this.scaleType)}`]()
    }

    if (this.scale) {
      this.updateWrapper(props);
    }
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && key !== 'scale' && this.scale[key]) {
        shallNotify = true;
        this.log && console.info(`d3-scale ${this.type} updates ${key} to ${JSON.stringify(this[key])}`);
        this.scale[key](this[key]);
      }
    });
    if (shallNotify) {
      this.dispatchEvent(new CustomEvent(`scale-changed`, { detail: { value: this.scale, type: this.scaleType }, bubbles: true, composed: true }));
      delete this.__init;
    }
  }
}

export default Scale;