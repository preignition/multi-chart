import { html } from 'lit-element';
import { default as MultiContainerRadar } from '../container/multi-container-radar.js';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { curveCardinalClosed } from 'd3-shape';
import { LineRadial }  from '../d3-wrapper/d3-shape.js';


/**
 * ## Radar Chart
 * A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point. The relative position and angle of the axes is typically uninformative, but various heuristics, such as algorithms that plot data as the maximal total area, can be applied to sort the variables (axes) into relative positions that reveal distinct correlations, trade-offs, and a multitude of other comparative measures.
 *
 * @element multi-radar-chart
 */
class MultiChartRadar extends MultiContainerRadar {

  getContentRender() {

    return html `
       ${super.getContentRender()}
       <multi-drawable-radar 
         id="drawable"
         .log="${this.log}"
         .colorScale="${this.colorScale}"
         .angle="${this.angle}"
         .radius="${this.radius}"
         .curve="${curveCardinalClosed.tension(this.tension)}"
      ></multi-drawable-radar>
    `;
  }


  static get properties() {
    return {

      ...super.properties,

      ...LineRadial.properties,

      /*
       * `tension` tension for [curveCardinalClosed](https://github.com/d3/d3-shape#curveCardinalClosed)
       * value between 0 an 1.
       */
      tension: {
        type: Number,
        value: 0.6
      }
    };
  }

  constructor() {
    super();
    this.addEventListener('data-group-rescaled', this.onDataGroupRescaled);
  }
 
  onDataGroupRescaled(e) {
    this.log && console.log('data-group-rescaled', e);
    const angleScale = scaleLinear().domain([0, this.axes.length]).range([0, 2 * Math.PI]);
    this.angle = this.getAccessor(angleScale, e.detail.xAccessor);
    this.radius = this.getAccessor(e.detail.yScale, e.detail.yAccessor);
  }
}

export default MultiChartRadar;
