import { html } from 'lit-element';
import '../drawable/multi-drawable-line.js';
import { default as MultiContainer } from '../container/multi-container-axis.js';
import { Line } from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiChartLine
 *
 * `<multi-chart-line>` an element for displaying data as a line chart. 
 * 
 * ### Example
 *
 * ```html
 *    <multi-chart-line 
 *        id="chart"  
 *        color-scale="[[colorScale]]"
 *        data="[[data]]"
 *        left-tick-format="[[leftTickFormat]]">
 *      <dom-repeat items="{{keys}}">
 *        <template>
 *         <!-- set the series inthe markup. We can also pass a series object directly to the chart. -->
 *         <multi-serie key="[[item.key]]" label="[[item.label]]" accessor="{{item.accessor}}"></multi-serie>
 *         <!-- we need a accessor for y-scale -->
 *         <multi-accessor accessor="{{item.accessor}}" path="+value.[[item.key]]"></multi-accessor>
 *        </template>
 *      </dom-repeat>
 *    </multi-chart-line>   
 * ```

 **/
class MultiChartLine extends MultiContainer {
  
  getContentRender() {
    return html`
      ${super.getContentRender()}
      <multi-drawable-line 
         id="drawable"
         .colorScale="${this.colorScale}"
         .x="${this.x}"
         .y="${this.y}"
      ></multi-drawable-line>
    `
  }

  constructor() {
    super();
    this.addEventListener('data-group-rescaled', this.onDataGroupRescaled);
  }

  onDataGroupRescaled(e) {
    this.log && console.log('data-grou-rescaled', e);
    this.x = this.getAccessor(e.detail.xScale, e.detail.xAccessor) ;
    this.y = this.getAccessor(e.detail.yScale, e.detail.yAccessor) ;
    // this.x = (d, i) => e.detail.xScale(e.detail.xAccessor(d, i));
    // this.y = (d, i) => e.detail.yScale(e.detail.yAccessor(d, i));
  }

  static get properties() {
    return {
      ...super.properties,


      ...Line.properties,


      bottomScaleType: {
        type: String,
        value: 'point'
      }
    };
  }

}

export default MultiChartLine;