import { default as MultiRegister } from './mixin/multi-register-mixin.js';
// import { default as MultiData } from './mixin/multi-data-mixin.js';
import { default as DispatchSVG } from '../helper/dispatch-svg-mixin.js';
import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { default as MultiHighlight } from '../helper/multi-highlight-mixin.js';
import { CacheId } from '@preignition/preignition-mixin';
// import { valueProperties as dataGroupValueProperties } from './properties/data-group.js';
import { Base } from '../base-class.js';
import { html } from 'lit-element';
/**
 * # MultiContainerLayer
 * 
 * `<multi-container-layer>` is a proxy for svg g element. 
 * It will be inserted within `multi-container-svg#slot-chart` and can contain other svg content like geo layer. 
 *
 *
 * ### Events
 * Fired when `multi-container-layer` is attached .
 *
 * @event multi-verse-added
 * @param {string} the name of the curret group.
 *
 * Fired when `multi-container-layer` is removed .
 *
 * @event multi-verse-removed
 * @param {string} the name of the current group.
 *
 *
 *
 * @memberof MultiChart
 * @appliesMixin  MultiChart.mixin.SVGHelper    
 * @appliesMixin  MultiChart.mixin.MultiRegister    
 * @appliesMixin  MultiChart.mixin.MultiRegisterable    
 * @appliesMixin  MultiChart.mixin.DispatchSVG    
 * @appliesMixin  MultiChart.mixin.SVGHelper    
 * @appliesMixin  MultiChart.mixin.Resizable    
 * @appliesMixin MultiChart.mixin.Accessor
 * @appliesMixin  MultiChart.mixin.MultiData    
 * @appliesMixin  MultiChart.mixin.PolymerExtends    
 * @customElement
 * @polymer
 **/
class MultiContainerLayer
// extends Polymer.mixinBehaviors([Polymer.IronResizableBehavior],
extends 
// SVGHelper(
  DispatchSVG(
      CacheId(
        MultiHighlight(
          // MultiData(
            MultiRegister(
              Registerable(
                Base))))) {
render() {
  return html `
    <slot></slot>
    <svg id="svg">
      <g slot-svg="slot-chart" data-multi-position="${this.multiPosition}" id="slot-layer" .class="${this.layer}"></g>
    </svg>
`;
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * `group` the name of the group (used when to registering this element under a multi-verse)
       */
      group: {
        type: String,
        value: 'default'
      },

      /* 
       * `layer` the name of the layer - is set to g#svg-slot
       */
      layer: {
        type: String
      }


    };
  }


  firstUpdated(props) {
    // Note(cg): chart container might be registered against multi-verse. We nee to notify their creation upwards.
    this.dispatchEvent(new CustomEvent('multi-verse-added', { detail: this.group, bubbles: true, composed: true }));
    super.firstUpdated(props);
  }
  disconnectedCallback() {
    // TODO(cg): replace multi-removed -> multi-verse-remover
    // XXX(cg): this event will never be caught! unregister from host instead like for drawablse
    this.dispatchEvent(new CustomEvent('multi-verse-removed', { detail: this.group, bubbles: true, composed: true }));
    super.disconnectedCallback();
  }

  /* 
   * `dataChanges` relay dataChanged to registeredItems
   */
  dataChanged() {
    this.callRegistered('dataChanged', ...arguments);
  }

  // Note(cg): refresh drawable components for the chart. 
  debounceDraw() {
    this.callRegistered('debounceDraw', ...arguments);
  }

  resize(width, height) {
    super.resize && super.resize();
    this.callRegistered('resize', width, height);
  }
}

export default MultiContainerLayer;
