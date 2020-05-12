import { MultiNotify } from '../base-class.js';

import * as fetch from 'd3-fetch';

/**
 * ## d3-fetch
 *
 * A wrapper aroud [d3-fetch](https://github.com/d3/d3-fetch), a module providing convenient parsing on top of [Fetch](https://fetch.spec.whatwg.org/).
 *
 * @fires loading-changed - Event fired when loading property changes
 * @fires data-changed - Event fired when data is set
 * @fires error-changed - Event fired when there is an error
 * @element d3-fetch
 */
class Fetch extends MultiNotify {

  static get properties() {

    return {

      /*
       * expected data type
       * @type {'blob'|'buffer'|'csv'|'dsv'|'html'|'image'|'json'|'svg'|'text'|'tsv'|'xml'}
       */
      type: {
        type: String
      },

      /*
       * the url to fetch data from
       */
      url: {
        type: String
      },

      /*
       * `loading` true when loading
       */
      loading: {
        type: Boolean,
        value: false,
        notify: true
      },

      /*
       * `data` fetched data
       */
      data: {
        type: Array,
        notify: true,
        attribute: false
      },

      /*
       * `error`
       */
      error: {
        type: Object,
        notify: true
      }
    };
  }

  update(props) {
    this.log && console.info(`d3-fetch ${this.type} update`, props);
    if (!this.type && !props.has('type')) {
      this.type = 'json';
    }

    if (!this.fetcher || props.has('type')) {
      this.fetcher = fetch[this.type];
    }

    if (props.has('url')) {
      if (this.url) {
        this.loading = true;
        this.fetcher(this.url)
          .then(data => {
            this.loading = false;
            this.error = null;
            this.data = data;
          })
          .catch(error => {
            this.log && console.error(error);
            this.loading = false;
            this.error = error;
            this.data = null;
          });
      } else {
        this.error = null;
        this.data = null;
      }
    }
    super.update(props);
  }
}

export default Fetch;
