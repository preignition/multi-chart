import { LitElement, html } from 'lit-element';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
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
      LitElement)) {

  render() {
    const f = this.isTime ? time.timeFormat(this.specifyer) : format.format(this.specifyer);
    return html `${this.value !== undefined && this.value !== '' ? f(this.isTime ? new Date(this.value) : this.value) : '' }`;
  }

  static get properties() {
    return {


      /* 
       * `value` the value to be formated
       */
      value: {
        type: String
      },

      /* 
       * `isTime` true to indicate the use of d3.timeFormat (instead of d3.format)
       */
      isTime: {
        type: Boolean,
        attribute: 'is-time'
      },

      /**
       * `specifyer` for the format function
       */
      specifyer: {
        type: String,
        value: '.1f'
      }
    };
  }


}

export default D3Format;