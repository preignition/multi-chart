import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as DrawableSerie } from './mixin/drawable-serie-mixin.js';
import  { Line }  from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiDrawableBubble
 *
 * `<multi-drawable-bubble>` draw bubbles from serie data
 *     
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--drawable-bubble` | mixin applied to drawable | `{}`
 * `--drawable-bubble-fill` | fill color applied to bubble | `none`
 * `--drawable-bubble-strole` | stroke color applied to bubble | `none`
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.MultiDrawableSerie
 * @appliesMixin MultiChart.mixin.D3ShapeCoordinate
 * @demo
 **/
class MultiDrawableBubble extends
  DrawableSerie(
    MultiDrawable) {

  static get hostStyles() {
    return css `
      #drawable.bubble {
        @apply --drawable-bubble;
      }

      #drawable.bubble .shape {
        fill: var(--drawable-bubble-fill);
        stroke: var(--drawable-bubble-stroke);
      }
      
    `;
  }
  render() {
    return html `
    <svg>
      <g id="drawable" slot-svg="slot-chart" class="drawable bubble"></g>
    </svg>
`;
  }

  
  static get properties() {
    return {

      ...super.properties,

      
      ...Line.properties,

      /* 
       * `z` calculating radius for all data point radius = z(d,i)
       */
      z: {
        type: Function,
      }

    };
  }

  get shapeClass() {
    return 'bubble';
  }

  get shapeName() {
    return 'g';
  }

  drawSerieElement(chart, data) {
    chart
      .attr('fill', d => this.colorScale(d.key))
      .attr('class', `${this.shapeClass} selectable`)
      .attr('key', d => d.key);

    chart = this.drawSerieGroup(data, 'circle', this.shapeClass, chart, this.transition);

    return chart.attr('cx', this.x || 0)
      .attr('cy', this.y || 0)
      .attr('r', this.z || 0)
      .attr('index', (d, i) => i);
  }
}


export default MultiDrawableBubble;