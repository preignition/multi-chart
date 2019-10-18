/**
 * Lit-Element wrapper around d3.transiton
 *
 * anytime the transition is changed, will expose a `transition-changed` event, 
 * dispatching a function applying duration, delay or ease - if they exist - to 
 * a existing transition (see https://github.com/d3/d3-transition#transition_call)
 * 
 */

import { LitElement } from 'lit-element';

class Transition extends LitElement {

  static get properties() {

    return {

      delay: { type: Object },
      duration: { type: Object },
      ease: { type: Object }

    };
  }

  update(props) {
    super.update(props);
    this.log && console.info(`d3-transition ${this.type} update`, props)
    const value = (transition) => {
      Object.keys(this.constructor.properties).forEach(pr => {
        if (this[pr] && transition[pr]) {
          transition[pr](this[pr]);
        }
      })
    }
    this.dispatchEvent(new CustomEvent(`transition-changed`, { detail: { value: value }, bubbles: true, composed: true }));
  }
}

export default Transition;