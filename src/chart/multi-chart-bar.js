import { html } from 'lit-element';
import '../drawable/multi-drawable-line.js';
import { default as MultiContainer } from '../container/multi-container-axis.js';
import { Stack } from '../d3-wrapper/d3-shape.js';

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
class MultiBarLine extends MultiContainer {
  
  getContentRender() {
    return html`
      ${super.getContentRender()}
      <multi-drawable-bar 
         id="drawable"
         .colorScale="${this.colorScale}"
         .value="${this.value}" 
         .keys="${this.keys}" 
         .order="${this.order}" 
         .offset="${this.offset}" 
         .stacked="${this.stacked}"
         .xScale="${this.xScale}"
         .yScale="${this.yScale}"
      ></multi-drawable-bar>
    `
  }

  constructor() {
    super();
    this.addEventListener('data-group-rescaled', this.onDataGroupRescaled);
  }

  onDataGroupRescaled(e) {
    this.log && console.log('data-group-rescaled for Bar', e);
    this.xScale = e.detail.xScale;
    this.yScale = e.detail.yScale;
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


      // bottomScaleType: {
      //   type: String,
      //   value: 'point'
      // }
    };
  }

}

export default MultiBarLine;