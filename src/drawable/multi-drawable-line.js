
import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as DrawableSerie } from './mixin/drawable-serie-mixin.js';
import { default as Shaper } from './mixin/drawable-shaper-mixin.js';

import { Line } from '../d3-wrapper/d3-shape.js';

 // TODO(cg): Make this as a sublcass ot MultiDrawableLinePath.
class MultiDrawableLine extends
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
    } ;

  render() {
    return html`
  	<d3-shape-line 
      @shape-changed="${this.onSetShaper}" 
      .y="${this.y}" 
      .x="${this.x}" 
      .defined="${this.defined}"
    ></d3-shape-line>
    <svg>
      <g id="drawable" slot-svg="slot-chart" part="drawable-line"  class="drawable line"></g>
    </svg>
`;
  }

  static get properties() {
    return {

       ...super.properties,

      ...Line.properties,

    };
  }

  get shapeClass() {
    return 'line';
  }

  drawSerieElement(chart) {
    return chart.attr('stroke', d => this.colorScale(d.key))
      .attr('class', `${this.shapeClass} selectable`)
      .attr('title', d => d.label)
      .attr('key', d => d.key)
      .attr('d', d => this.shaper(d.data));
  }
}

export default MultiDrawableLine;
