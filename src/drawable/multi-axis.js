import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as axisProperty } from './properties/axis.js';
// import { cssTheme } from '@preignition/preignition-mixin';
import { select } from 'd3-selection';
import '../d3-wrapper/component-index.js';

class MultiAxis extends MultiDrawable {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css`

      #axis.axis {
        @apply --multi-container-axis;
      }

      #axis.axis.left {
        @apply --multi-chart-left-axis;
      }

      #axis.axis.right {
        @apply --multi-chart-right-axis;
      }

      #axis.axis.bottom {
        @apply --multi-chart-bottom-axis;
      }  

      #axis.axis.top {
        @apply --multi-chart-top-axis;
      }

      #axis.axis line,
      #axis.axis path {
        stroke: var(--multi-axis-color, var(--secondary-text-color));
      }

      #axis.axis text {
        fill: var(--multi-axis-color, var(--secondary-text-color));
      }`;
  } 

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html `
      <d3-axis 
        .type="${this.type}" 
        .scale="${this.scale}" 
        .ticks="${this.ticks}" 
        .tickFormat="${this.tickFormat}" 
        @d3-axis-changed="${e => this.axis = e.detail.value}"></d3-axis>
      <svg>
        <g id="axis" slot-svg="slot-axis" type="${this.type}" class="axis ${this.type}" transform="translate(${this._x}, ${this._y})">
          <text class="axis-text" 
            transform="rotate(${this.textAngle || 0})" 
            x="${this._xText}" 
            y="${this._yText}" 
            dx="${this.dx || 0}" 
            dy="${this.dy || 0}" 
            text-anchor="end">${this.text}</text>
        </g>
      </svg>
    `;
  }

  get _x() {
    return this.x || (this.width && this.type && this.type === 'right' ? this.width : 0);
  }

  get _y() {
    return this.y || (this.height && this.type && this.type === 'bottom' ? this.height : 0);
  }

  get _xText() {
    return this.xText || (this.width && this.type && (this.type === 'right' || this.type === 'bottom') ? this.width : 0);
  }

  get _yText() {
    // return this.yText || (this.height && this.type && this.type === 'bottom' ? this.height : 0);
    return this.yText || 0;
  }

  static get properties() {

    return {

      ...super.properties,

      ...axisProperty,

      /**
       * `axis` the [d3 axis](https://github.com/d3/d3-axis) function 
       */
      axis: {
        type: Function,
      },


      /* 
       * `scale`  the [d3-scale](https://github.com/d3/d3-axis) to use for this axis
       */
      scale: {
        type: Function,
      },

      /**
       * `type` axis type 'left'. 'right', 'top' or 'bottom'
       */
      type: {
        type: String,
        reflect: true
      }
    }

  }

  _draw(data) {

    const sel = select(this.$.axis);
    if (sel && this.scale && this.axis) {

      // Note(cg): we skip transition first time we draw.
      if (this.shallTransition) {
        sel.transition().call(this.transition).call(this.axis.scale(this.scale));
      } else {
        sel.call(this.axis.scale(this.scale));
      }
    }
  }

}

export default MultiAxis;
// Register the new element with the browser.
// customElements.define('multi-axis', MultiAxis);