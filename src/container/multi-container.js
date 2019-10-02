import { html, css } from 'lit-element';
// import { CacheId } from '@preignition/preignition-mixin';
// import { SVGHelper } from '../helper/svg-helper-mixin.js';
import { default as ObserveResize } from './mixin/observe-resize-mixin.js';
import { default as MultiRegister } from './mixin/multi-register-mixin.js';
import { default as MultiData } from './mixin/multi-data-mixin.js';
import { Zoomable } from '../d3-wrapper/zoomable-mixin.js';

import { MultiChartBase } from '../base-class.js';
import { pattern } from './pattern-template.js';
import { valueProperties as dataGroupValueProperties } from './properties/data-group.js';



/**
 * # MultiContainer
 * 
 * `<multi-chart-base>` is a base element for buiding charts 
 *
 *
 * ### Events
 * Fired when `multi-container` is attached .
 *
 * @event multi-verse-added
 * @param {string} the name of the current group.
 *
 * Fired when `multi-container` is removed .
 *
 * @event multi-container-removed
 * @param {string} the name of the current group.
 *
 *
 * @memberof MultiChart
 * @appliesMixin  Vaadin.ThemableMixin    
 * @appliesMixin  MultiChart.mixin.MultiRegister    
 * @appliesMixin  MultiChart.mixin.SVGHelper   
 * @appliesMixin MultiChart.mixin.Accessor
 * @appliesMixin  MultiChart.mixin.Zoomable
 * @customElement
 * @polymer
 **/


class MultiContainer
extends
// SVGHelper(
MultiData(
  ObserveResize(
    MultiRegister(
      Zoomable(
        MultiChartBase)))) {

  static get styles() {
    return css `
     :host {
        display: flex;
        flex-direction: column;
      }

      ::slotted([slot=header]),
      ::slotted([slot=footer]) {
        margin: 0;
      }

      #observedNode {
        display: none;
      }

      #svg {
        /* need width here, otherwise the size of this svg is not properly calculated on resize*/
        width: 100%;
        flex: 1;
        @apply --multi-container;
      }

      #background {
        fill: var(--multi-chart-background-color, var(--light-theme-background-color));
        @apply --multi-chart-background;
      }

      #slot-chart-content {
        @apply --multi-chart-content;
      }

      .drawable {
        fill: none;
      }

      slot[name="svg"] {
        display: none;
      }

      .highlighted {
        fill-opacity: 0.9;
        opacity: 1;
        stroke: #FFF;
        stroke-width: 0;
        /*mask: url(#mask-stripe-thick);*/
        /*mask: url(var(--multi-highlight-mask));*/
        fill: var(--multi-highlight-fill);
        @apply --multi-highlight;
      }
 
    `;
  }


  render() {
    return html `
    <slot name="header"></slot>
    <div id="observedNode">
      ${this.getContentRender()}
      <multi-data-group 
        group="default" 
        .valuePosition="${this.valuePosition}"
        .keyPosition="${this.keyPosition}"
        .valueAccessor="${this.valueAccessor}"
        .keyAccessor="${this.keyAccessor}"
        .stacked="${this.stacked}"
        .min="${this.min}"
        .max="${this.max}"
        .data="${this.data}"
        ></multi-data-group>
      <slot></slot>
    </div>
    <svg id="svg">
      <g transform="translate(${this.leftMargin || 0}, ${this.topMargin || 0})">
        <g id="slot-background">
        </g>
        <g id="slot-chart-content">
          <g id="slot-zoom">
            <g id="slot-chart" class="chart">
            </g>
            <g id="slot-brush"></g>
          </g>
          <g id="slot-axis"></g>
        </g>
      </g>
      <g id="slot-legend"></g>
    </svg>
    <slot name="footer"></slot>
    <slot name="svg"></slot>
    ${this.pattern ? pattern: ''}
  `;
  }

  /**
   * used when subclassing `multi-container` and add content to the chart
   * @return {TemplateResult} content to be added
   */
  getContentRender() {
    return '';
  }

  getRange(type) {
    if (type) {

      return type === 'left' || type === 'right' ? [this.height, 0] : [0, this.width];
    }
    return [0, 1];
  }

  /**
   * return a scaled accessor function
   * @param  {d3Scale} scale    scale as 
   * @param  {Function} accessor function (exampe: `(d,i) => d.value.x``)
   * @return {Function} an accessor function
   */
  getAccessor(scale, accessor) {
    if (scale && accessor) {
      return (d, i) => scale(accessor(d, i));
    }
    return () => {};
  }


  static get properties() {

    return {

      ...super.properties,

      ...dataGroupValueProperties,

      /* 
       * `width`  of the chart area. Equals actual width of component - margins
       */
      width: { type: Number, },

      /* 
       * `height`  of the chart area. Equals actual height of component - margins
       */
      height: { type: Number, },

      /**
       * `group` the name of the group (used when to registering this element under a multi-verse)
       */
      group: { type: String },

      /*
       * colorScale for the chart
       */
      colorScale: { type: Function },

      /*
       * `pattern` set true for charts using patterns (e.g. geo charts)
       */
      pattern: { type: Boolean },

    };
  }


  constructor() {
    super();
    // Note(cg): allow drawble elements to be registered in this container.
    this.addEventListener('multi-drawn', this.onDrawn);
    this.addEventListener('multi-register', this._onMultiRegister);

    // Note(cg): multi-data-group notify value-position. We need to make sure 
    // a scale exist for used position (left, bottom,...)
    this.addEventListener('value-position-changed', this._onScalePosition);
    this.addEventListener('key-position-changed', this._onScalePosition);
  }

  updated(props) {
    super.updated(props)
    if (props.has('topMargin') || props.has('rightMargin') || props.has('bottomMargin') || props.has('leftMargin')) {
      this.onResize()
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties)
    this.dispatchEvent(new CustomEvent('multi-verse-added', { detail: this.group, bubbles: true, composed: true }));
    this.onResize();
    // this.assignSlottedSVG();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // TODO(cg): replace multi-removed -> multi-verse-remover
    // XXX(cg): this event will never be caught! unregister from host instead like for drawablse
    this.dispatchEvent(new CustomEvent('multi-verse-removed', { detail: this.group, bubbles: true, composed: true }));
  }

  // Note(cg): refresh drawable components for the chart. 
  refresh() {
    this.callRegistered('debounceDraw');
  }

  getSize() {
    const svg = this.selectShadow('#svg').node();
    return {
      width: svg && svg.width.baseVal.value,
      height: svg && svg.height.baseVal.value
    };
  }

  onRegister(item) {
    super.onRegister && super.onRegister(item)
    if (this.width && this.height && item.resize) {
      item.resize(this.width, this.height)
    }
  }

  onResize(rect, entry) {
    const { width, height } = this.getSize();
    // Note(cg): if width or height is 0 (as it is the case when char is hiddem -> do nothing).
    if (width && height) {
      // Note(cg): as we cannot use offsetWidth and offsetHeight for svg, we take the value of $0.$.svg.height.baseVal.
      this.width = Math.floor(width - (this.leftMargin || 0) - (this.rightMargin || 0));
      this.height = Math.floor(height - (this.bottomMargin || 0) - (this.topMargin || 0));
      this.callRegistered('resize', this.width, this.height);
    }
  }

  onDrawn() {
    // Note(cg): a container is responsible for notifying resize events to the registered elements.
    this.callRegistered('onDrawn');
  }

  _onScalePosition(e) {
    const position = e.detail.value;
    // Note(cg): construct the scale is axis not existing;.
    if (position && !this[`${position}Axis`]) {
      this[`${position}HasScale`] = true;
    }
  }
}

export default MultiContainer;