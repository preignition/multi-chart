
/**
 * Lit-Element wrapper around d3.transiton
 *
 * anytime the transition is changed, will expose a `transition-changed` event
 */

import { LitElement } from 'lit-element';
import { camelToDashCase  } from '../helper/utils.js';
import { transition } from 'd3-transition';

const props = {};
const instance = transition();
const keys = Object.keys(instance || {});
keys.filter(key => key !== 'transition').forEach(key => {
  if (!props[key]) {
    props[key] = {
      type: Function,
      attribute: camelToDashCase(key)
    }
  }
})


class Transition extends LitElement {

  static get properties() {

    return {

      ...props
      
    };
  }

  constructor() {
    super()
    this.transition = transition();
    this.__init = true;
  }

  update(props) {
    super.update(props);
    this.log && console.info(`d3-transition ${this.type} update`, props)
    this.updateWrapper(props);
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && this.transition[key]) {
        shallNotify = true;
        this.transition[key](this[key]);
      }
    });
    if(shallNotify) {
      this.dispatchEvent(new CustomEvent(`transition-changed`, { detail: { value: this.transition }, bubbles: true, composed: true }));
      delete this.__init;
    }
  }
}

export default Transition;
