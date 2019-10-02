import { html } from 'lit-element';
import '../drawable/multi-drawable-line.js';
import { default as MultiContainer } from '../container/multi-container-axis.js';
import { Line } from '../d3-wrapper/d3-shape.js';
import { default as Scale } from '../d3-wrapper/d3-scale.js';
import { default as Accessor } from '../helper/multi-accessor.js';
import { extendProperty } from '../helper/extend-property-mixin.js';
import { default as minMax } from '../container/properties/min-max.js'

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

const zProperties = { ...extendProperty('z', Scale.properties, Accessor.properties, minMax)};
  
class MultiChartLine extends MultiContainer {
  
  getContentRender() {
    return html`
     ${super.getContentRender()}
      <d3-scale 
        id="zScale"
        .scaleType="${this.zScaleType}"
        .domain="${this.zDomain}"
        .range="${this.zRange}"
        @d3-scale-changed="${e => this.zScale = e.detail.value}"
      ></d3-scale>
      <multi-accessor 
        .path="${this.zPath}"
        @accessor-changed="${e => this.zAccessor = e.detail.value}" 
     ></multi-accessor>
      <multi-drawable-bubble 
         id="drawable"
         .colorScale="${this.colorScale}"
         .x="${this.x}"
         .y="${this.y}"
         .z="${this.getAccessor(this.zScale, this.zAccessor)}"
      ></multi-drawable-bubble>
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
  }

  // updated(props) {
  //   super.updated(props)
  //   if((props.has('zScale') && this.zScale) || props.has('zAccessor') && this.zAccessor) {
  //     this.z = this.getAccessor(this.zScale, this.zAccessor) ;
  //   }
  // }

  static get properties() {
    return {
      ...super.properties,

      ...Line.properties,

      ...zProperties,

      zScaleType: {
        type: String, 
        value: 'sqrt'
      },

      zScale: {
        type: Function
      },

      bottomScaleType: {
        type: String,
        value: 'point'
      }
    };
  }

}

export default MultiChartLine;