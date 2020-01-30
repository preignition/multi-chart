import { html } from 'lit-element';
import { select} from 'd3-selection';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as Shaper } from './mixin/drawable-shaper-mixin.js';
import  { Line }  from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiDrawableLinePath
 *
 * `<multi-drawable-line-path>` draws a line in a single svg path element
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @demo
 **/
class MultiDrawableLinePath extends  
  Shaper(
    MultiDrawable) {
  render() {
    return html`
    <d3-shape-line 
      @shape-changed="${this.onSetShaper}" 
      .y="${this.y}" 
      .x="${this.x}" 
      .defined="${this.defined}"
    ></d3-shape-line>
    <svg>
      <path id="drawable" slot-svg="slot-chart" class="drawable selectable line"> </path>
    </svg>
`;
  }

  static get is() { return 'multi-drawable-line-path'; }

  static get properties() {

    return {
      ...super.properties, 

      // ...coordinateProperties,

      ...Line.properties

    };
  }

  draw() {
    const data = this.drawableData;
    if (!this.width || !this.height || !data) {
      return;
    }

    let chart = select(this.targetElement).datum(data);

    if (this.shallTransition) {
      chart = this.applyTransition(chart, this.transition);
    }

    chart.attr('stroke', this.colorScale(this.key))
      .attr('key', this.key)
      .attr('d', this.shaper);

   return chart;

  }
}

export default MultiDrawableLinePath;
