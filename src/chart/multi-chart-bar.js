import { html } from 'lit-element';
import { default as MultiContainerAxis } from '../container/multi-container-axis.js';
import { Stack } from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiChartBar
 *
 * `<multi-chart-line>` an element for displaying data as a line chart. 
 * 
 * ### Example (Polymer)
 *
 * ```html
 *    <multi-chart-bar 
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
class MultiChartBar extends MultiContainerAxis {
  
  getContentRender() {
    return html`
      ${super.getContentRender()}
      ${this.orientation === 'horizontal' 
        ? html `
            <multi-drawable-bar-horizontal 
               id="drawable"
               .log="${this.log}"
               .decorate="${this.decorate}"
               .colorScale="${this.colorScale}"
               .colorSerie="${this.colorSerie}"
               .value="${this.value}" 
               .valuePath="${this.valuePath}" 
               .keys="${this.keys}" 
               .order="${this.order}" 
               .offset="${this.offset}" 
               .stacked="${this.stacked}"
               .orientation="${this.orientation}"
               .xScale="${this.yScale}"
               .yScale="${this.xScale}"
            ></multi-drawable-bar-horizontal>
           `
        : html `
            <multi-drawable-bar 
               id="drawable"
               .log="${this.log}"
               .decorate="${this.decorate}"
               .colorScale="${this.colorScale}"
               .colorSerie="${this.colorSerie}"
               .value="${this.value}" 
               .valuePath="${this.valuePath}" 
               .keys="${this.keys}" 
               .order="${this.order}" 
               .offset="${this.offset}" 
               .stacked="${this.stacked}"
               .orientation="${this.orientation}"
               .xScale="${this.xScale}"
               .yScale="${this.yScale}"
            ></multi-drawable-bar>
           `
    }
    `;
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

  updated(props) {
    if (props.has('keyPosition')) {
      // Note(cg): we set scaletype for key scale to band by default 
      // if none is set
      if (this.keyPosition && !this[`${this.keyPosition}ScaleType`]) {
        this[`${this.keyPosition}ScaleType`] = 'band';
      }
    }
    super.updated(props);
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
      /*
       * `orientation` {'vertical'|'horizontal'}
       */
      orientation: {
        value: 'vertical',
        type: String
      },
    };
  }

}

export default MultiChartBar;
