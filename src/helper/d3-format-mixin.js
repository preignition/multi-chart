import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import * as format from 'd3-format';
import * as time from 'd3-time-format';

const Format = dedupingMixin(superClass => {

  return class extends superClass {

    get _format() {
      return this.isTime ? time.timeFormat(this.specifier) : format.format(this.specifier);
    }

    static get properties() {

      return {

        ...super.properties,

        /*
         * true to indicate the use of d3.timeFormat (instead of d3.format)
         */
        isTime: {
          type: Boolean,
          attribute: 'is-time'
        },

        /**
         * `specifier` for the format function (as per https://github.com/d3/d3-format#locale_format)
         */
        specifier: {
          type: String,
          value: '.1f'
        }
      };
    }
  };
});

export default Format;
