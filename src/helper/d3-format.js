import { LitElement, html } from 'lit-element';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { default as FormatMixin } from './d3-format-mixin.js';
// import * as format from 'd3-format';
// import * as time from 'd3-time-format';

/**
 * ## d3-format
 *
 *  A lit-element wrapper around [d3-format](https://github.com/d3/d3-format).
 *  d3-format helps format numbers for human consumption. See also https://observablehq.com/@d3/d3-format.
 
 * ### Example
 * `<d3-format specifier=".1f" value="12.2135"></d3-format>` will display `12.2`.
 *
 * ### Examples from [d3-format](https://github.com/d3/d3-format)
 * ```js
 * d3.format(".0%")(0.123);  // rounded percentage, "12%"
 * d3.format("($.2f")(-3.5); // localized fixed-point currency, "(£3.50)"
 * d3.format("+20")(42);     // space-filled and signed, "                 +42"
 * d3.format(".^20")(42);    // dot-filled and centered, ".........42........."
 * d3.format(".2s")(42e6);   // SI-prefix with two significant digits, "42M"
 * d3.format("#x")(48879);   // prefixed lowercase hexadecimal, "0xbeef"
 * d3.format(",.2r")(4223);  // grouped thousands with two significant digits, "4,200"
 * ```
 *
 * @element d3-format
 **/
class D3Format extends
DefaultValueMixin(
  DoNotSetUndefinedValue(
    FormatMixin(
      LitElement))) {

  render() {
    return html `${this.value !== undefined && this.value !== '' ? this._format(this.isTime ? new Date(this.value) : this.value) : ''}`;
  }

  static get properties() {
    return {

      /*
       * the value to be formated
       */
      value: {
        type: String
      }

    };
  }
}

export default D3Format;
