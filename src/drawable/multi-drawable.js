// import { SVGHelper } from '../helper/svg-helper-mixin.js';
import { CacheId } from '@preignition/preignition-mixin';
import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { default as DispatchSVG } from '../helper/dispatch-svg-mixin.js';
import { default as Draw } from './mixin/draw-mixin.js';
import { MultiChartBase } from '../base-class.js';
import {scaleOrdinal} from 'd3-scale';
import {schemeCategory10 } from 'd3-scale-chromatic';
import { css, html } from 'lit-element';


/**
 * ## MultiDrawable
 *
 * `<multi-drawable>` it a base Class for chart element that can be drawn (e.g. line, circle ...)
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.SVGHelper
 * @appliesMixin MultiChart.mixin.MultiRegisterable
 * @appliesMixin MultiChart.mixin.DispatchSVG
 * @appliesMixin MultiChart.mixin.Resizable
 * @appliesMixin MultiChart.mixin.Draw
 * @appliesMixin MultiChart.mixin.Accessor
 **/
class MultiDrawable extends(
    DispatchSVG(
        Draw(
          Registerable(
            CacheId(
              MultiChartBase))))) {

  static get styles() {
    return css`
     :host {
        display: none;
      }`
    }
    
    // Note(cg): Hack allowing extend multi-container
    // in other libraries 
    get html() {
      return html
    }

  // Note(cg): Hack allowing extend multi-drawable
  // in other libraries 
  // get css() {
  //   return css;
  // } 


  static get properties() {

    return {

      ...super.properties,

      /* 
       * `key`  some drawable need to have a key (for example lines in a line chart, to as to apply a colorScale)
       */
      key: {
        type: String
      },

      /* 
       * `colorScale` colorScale to use for the chart (example d3.scaleOrdinal().range(d3.schemeCategory10);)
       */
      colorScale: {
        type: Function, 
        attribute: 'color-scale',
        value: function() {
          return scaleOrdinal().range(schemeCategory10);
        }
      },
      
      width: {
        type: Number,
      }, 


      height: {
        type: Number,
      }


    };
  }

  /*
   * `dataProcessType` the type of data processing. Stacked data (e.g. for bar chart) will be stacked
   */
  get dataProcessType() {
    return '';
  }

  /**
   * `targetElement` getter override lifecycle Behavior and called during attached
   */
  get targetElement() {
    return this.$.drawable;
  }

  get minSize() {
    if(this.width && this.height) {
      return Math.min(this.width, this.height);
    }
    return null;

  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

}

export default MultiDrawable ;