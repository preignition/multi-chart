import { LitElement, html } from 'lit-element';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { default as FormatMixin } from './d3-format-mixin.js';
import * as format from 'd3-format';
import * as time from 'd3-time-format';

/**
 * ## D3Format
 *
 * `<d3-format>` display formated value
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @applies MultiChart.mixin.D3Format
 * @demo
 **/
class D3Format extends 
  DefaultValueMixin(
    DoNotSetUndefinedValue(
      FormatMixin (
        LitElement))) {

  render() {
    return html `${this.value !== undefined && this.value !== '' ? this.format(this.isTime ? new Date(this.value) : this.value) : '' }`;
  }

  static get properties() {
    return {


      /* 
       * `value` the value to be formated
       */
      value: {
        type: String
      }

    };
  }


}

export default D3Format;