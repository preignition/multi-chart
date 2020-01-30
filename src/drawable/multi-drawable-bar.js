import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as DrawableSerie } from './mixin/drawable-serie-mixin.js';
import { default as Shaper } from './mixin/drawable-shaper-mixin.js';
import { Line, Stack } from '../d3-wrapper/d3-shape.js';
import { scaleBand } from 'd3-scale';
import { transition as Transition} from 'd3-transition';

/** ## MultiDrawableBar
 *
 * `<multi-drawable-bar>` draws bar as in https://github.com/d3/d3-shape#bar
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--drawable-bar` | mixin applied to drawable | `{}`
 * `--drawable-bar-fill` | fill color applied to bar | `none`
 * `--drawable-bar-strole` | stroke color applied to bar | `none`
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.MultiDrawableSerie
 * @appliesMixin MultiChart.mixin.D3ShapeCoordinate
 * @appliesMixin MultiChart.mixin.D3StackProperty
 * @demo index.html#multi-bar-demo
 **/
// class MultiDrawableBar extends
// MultiDrawableSerie(
//   D3StackProperty(
//     D3ShapeCoordinate(
//       MultiDrawable))) {  
//       
class MultiDrawableBar extends
DrawableSerie(
  Shaper(
    MultiDrawable)) {

  /*
   * `dataProcessType` the type of data processing. 
   * @override multi-drawable
   */
  get dataProcessType() {
    return 'stack';
  }

  static get hostStyles() {
    return css `
      
      #drawable.bar .shape {
        fill: var(--drawable-bar-fill);
        stroke: var(--drawable-bar-stroke);
      }
      
    `;
  }
  render() {
    return html `
    ${this.valuePath ? html`
      <multi-accessor 
        .path="${this.valuePath}"
        @accessor-changed="${e => this.value = e.detail.value}" 
      ></multi-accessor>` : '' }
     <d3-shape-stack 
      .value="${this.value}" 
      .keys="${this.keys}" 
      .order="${this.order}" 
      .offset="${this.offset}" 
      @shape-changed="${this.onSetShaper}" 
     ></d3-shape-stack>
    <svg>
      <g id="drawable" slot-svg="slot-chart" part="drawable-bar" class="drawable bar"></g>
    </svg>
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      ...Stack.properties,

      /*
       * `stacked` if true, draw a stack chart, otherwise, default bar chart
       */
      stacked: {
        type: Boolean
      },

      /*
       * `serieName` used for resetting value domain.
       */
      serieName: {
        type: String,
        value: 'default'
      },

      xScale: { type: Function },
      yScale: { type: Function },

      /*
       * `valuePath` path for creating value accessor
       */
       valuePath: {
         type: String,
         attribute: 'value-path'
         },
    };
  }

  get shapeClass() {
    return 'bar';
  }


  get shapeName() {
    return 'g';
  }

  drawSerieElement(chart, data) {

    chart
      .attr('fill', d => this.colorScale(d.key))
      .attr('class', `${this.shapeClass} ${this.selectSerie ? 'selectable' : ''}`)
      .attr('key', d => d.key);


    chart = this.drawSerieGroup(data, 'rect', this.shapeClass, chart, this.transition);

    // Note(cg): we add selectable to shape only if selectSerie is not true.
    if (!this.selectSerie) {
      chart instanceof Transition
      ? chart.selection().classed('selectable', true)
      : chart.classed('selectable', true);
    }

    let bandwidth = this.xScale.bandwidth;
    let align = 0;
    const xScale = this.xScale;
    // we might have an x-scale that does not have a bandwidth, e.g. when we have date on x-axis and use a timeScale
    if (!bandwidth) {
      bandwidth = scaleBand().domain(data[0].map((d, i) => this.xScale(d[3] || i))).range(this.xScale.range()).padding(0.2).bandwidth;
      align = bandwidth() / 2;
    }

    if (this.stacked) {
      chart = chart
        .attr('y', d => this.yScale(d[1]) || 0)
        .attr('height', d => this.yScale(d[0]) - this.yScale(d[1]) || 0);

      return chart
        .attr('x', (d, i) => {
          return xScale(d[3] || i) - align;
        })
        .attr('width', bandwidth())
        .attr('key', d => d[3]);
      // .attr('index', (d,i) => i);
    }

    const n = data.length;
    chart = chart
      .attr('x', (d, i) => xScale(d[3] || i) + bandwidth() / n * d[2] - align)
      .attr('width', bandwidth() / n)
      .attr('key', d => d[3]);

    return chart
      .attr('y', d => this.yScale(d[1] - d[0]) || 0)
      .attr('height', d => this.yScale(0) - this.yScale(d[1] - d[0]) || 0)
      .attr('index', (d, i) => i);

  }
}

export default MultiDrawableBar;
