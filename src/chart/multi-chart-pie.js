import { html } from 'lit-element';
import { default as MultiContainer } from '../container/multi-container.js';
import  { Pie, Arc }  from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiChartPie
 *

 *
 * @memberof MultiChart
 * @group App Elements
 * @element multi-chart-pie
 * appliesMixin MultiChart.mixin.MultiChartProperty
 * @appliesMixin MultiChart.mixin.D3PieProperty
 * @appliesMixin MultiChart.mixin.ColorScale
 * @demo index.html#multi-pie-demo
 **/
class MultiChartPie extends MultiContainer {
    
    getContentRender() {
    
      return html`
        <multi-drawable-pie 
          .log="${this.log}"
          .transition="${this.transition}" 
          .value="${this.value}" 
          .valuePath="${this.valuePath}" 
          .padAngle="${this.padAngle}" 
          .sort="${this.sort}" 
          .sortValues="${this.sortValues}" 
          .innerRadius="${this.innerRadius}" 
          .outerRadius="${this.outerRadius}" 
          .cornerRadius="${this.cornerRadius}" 
          .pieWidth="${this.pieWidth}" 
          .colorScale="${this.colorScale}"
        ></multi-drawable-pie>
    `;
  }


  static get properties() {
    return {

      ...super.properties,

      ...Pie.properties,

      ...Arc.properties,


      valuePath: {
        type: String,
        attribute: 'value-path'
      },

      /**
       * `pieWidth` a way to indicate the width of the radius (either in % or absolute value). 
       * If set, inner radius will be inferred.
       */
      pieWidth: {
        type: String,
        attribute: 'pie-width'
      }

    };
  }
}


export default MultiChartPie;