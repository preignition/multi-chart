
import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as DrawableSerie } from './mixin/drawable-serie-mixin.js';
import { default as Shaper } from './mixin/drawable-shaper-mixin.js';

import { LineRadial } from '../d3-wrapper/d3-shape.js';

 // TODO(cg): Make this as a sublcass ot MultiDrawableLinePath.
class MultiDrawableRadar extends
  DrawableSerie(
    Shaper(
      MultiDrawable)) {

    // Note(cg): style to add to svghost while dispatching SVG.
    static get hostStyles() {
      return css`
        
        #drawable.line .shape {
          fill: var(--drawable-line-fill);
          stroke: var(--drawable-line-stroke);
        }
      `;
    }

  render() {
    return html`
  	<d3-shape-line-radial 
      @shape-changed="${this.onSetShaper}" 
      .angle="${this.angle}" 
      .radius="${this.radius}" 
      .defined="${this.defined}"
      .curve="${this.curve}"
    ></d3-shape-line-radial>
    <svg>
      <g id="drawable" slot-svg="slot-chart" part="drawable-line-radial"  class="drawable line-radial" transform="translate(${this.width / 2 || 0}, ${this.height / 2 || 0})"></g>
    </svg>
`;
  }

  static get properties() {
    return {

       ...super.properties,

      ...LineRadial.properties,

      /*
       * `hideCircles` 
       */
      hideCircles: {
        type: String,
        value: false,
        attribute: 'hide-circles'
      },

    };
  }

  get shapeClass() {
    return 'line-radial';
  }

  get shapeName() {
    return 'g';
  }

  drawSerieElement(chart, data) {

    chart
      .attr('class', `${this.shapeClass} selectable`)
      .attr('title', d => d.label)
      .attr('key', d => d.key)
      .attr('tabindex', 0)
      .attr('stroke', d => this.colorScale(d.key))
      .attr('stroke-width', 2)
      .append('path')
        .attr('fill',d => this.colorScale(d.key))
        .attr('fill-opacity', 0.1)
        .attr('d', d => {
          return this.shaper(d.data);
        });

    const {angle, radius } = this;
    if (!this.hideCircles) {
      const circles = this.drawSerieGroup(data, 'circle', `${this.shapeClass}-circle`, chart, this.transition);
      circles
        .attr('cx', function(d, i) {
          return radius(d) * Math.cos(angle(d) - Math.PI / 2);
        })
        .attr('cy', function(d, i) {
          return radius(d) * Math.sin(angle(d) - Math.PI / 2);
        })
        .attr('fill', '#fff')
        .attr('r', 4)
        .attr('index', (d, i) => i);
    }

    return chart;
  }
}

export default MultiDrawableRadar;
