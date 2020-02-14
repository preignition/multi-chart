import { html } from 'lit-element';
// import '../drawable/multi-drawable-line.js';
import { default as MultiContainer } from '../container/multi-container-axis.js';
import { Stack } from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiChartBar
 *
 * `<multi-chart-line>` an element for displaying data as a line chart. 
 * 
 * ### Example
 *
 * ```html
 *    <multi-chart-bar 
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
 *    </multi-chart-bar>   
 * ```
 *
 * @element multi-chart-bar

 **/
class MultiBarLine extends MultiContainer {
  
  getContentRender() {
    return html`
      ${super.getContentRender()}
      <multi-drawable-bar 
         id="drawable"
         .log="${this.log}"
         .colorScale="${this.colorScale}"
         .value="${this.value}" 
         .valuePath="${this.valuePath}" 
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
      /*
       * `valuePath` we can pass a value path to calculate value accessor
       */
      valuePath: {
        type: String,
        attribute: 'value-path'
      },

      // Note(cg): set default bottom scale type as band
      bottomScaleType: {
        type: String,
        value: 'band',
        attribute: 'bottom-scale-type'
      }
    };
  }

}

export default MultiBarLine;