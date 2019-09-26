import { default as MultiRegister } from './mixin/multi-register-mixin.js';
import { default as MultiData } from './mixin/multi-data-mixin.js';
import { default as DispatchSVG } from '../helper/dispatch-svg-mixin.js';
import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { default as MultiHighlight } from '../helper/multi-highlight-mixin.js';
// import { default as Accessor } from '../helper/accessor-mixin.js';
import { MultiChartBase } from '../base-class.js';
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
      MultiHighlight(
          MultiData(
            MultiRegister(
              Registerable(
                MultiChartBase))))) {
  static get template() {
    return Polymer.html`
    <style>
    #observedNode {
      display: none;
    }
    </style>
    <div id="observedNode">
      <slot></slot>
    </div>
    <svg id="svg">
      <g slot-svg="slot-chart" id="slot-layer" class\$="[[layer]]"></g>
    </svg>
`;
  }

  static get is() { return 'multi-container-layer'; }

  static get properties() {
    return {

      /**
       * `group` the name of the group (used when to registering this element under a multi-verse)
       */
      group: {
        type: String
      },

      /* 
       * `layer` the name of the layer - is set to g#svg-slot
       */
      layer: {
        type: String,
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    Polymer.RenderStatus.afterNextRender(this, () => {
      this.dispatchEvent(new CustomEvent('multi-verse-added', { detail: this.group, bubbles: true, composed: true }));
    });
  }

  /* 
   * `dataChanges` relay dataChanged to registeredItems
   */
  dataChanged() {
    this.callRegistered('dataChanged', ...arguments);
  }

  resize(width, height) {
    super.resize && super.resize();
    this.callRegistered('resize', width, height);
  }
}

export default MultiContainerLayer;
