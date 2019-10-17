import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import * as format from 'd3-format';
import * as time from 'd3-time-format';

const Format = dedupingMixin(superClass => {

  return class extends superClass {

    get format() {
      return this.isTime ? time.timeFormat(this.specifyer) : format.format(this.specifyer);
    }
    static get properties() {

      return {
        ...super.properties,
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
      }
    }
  }
})

export default Format;