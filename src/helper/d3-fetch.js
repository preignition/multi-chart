import { MultiNotify } from '../base-class.js';

import * as fetch from 'd3-fetch';

class Fetch extends MultiNotify {

  static get properties() {

    return {

      /* 
       * `type`  data type (json, xml, blob, ...)
       */      
      type: {
        type: String
      },

      /* 
       * `url`  the url to fetch data from
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
        notify: true
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
    this.log && console.info(`d3-fetch ${this.type} update`, props)
    super.update(props);
    if (!this.type && !props.has('type')) {
      this.type = 'json';
    }

    if (!this.fetcher || props.has('type')) {
      this.fetcher = fetch[this.type];
    }
    
    if (props.has('url')) {
        if(this.url) {
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
        }
        else {
          this.error = null;
          this.data = null;
        }
    }
  }
}

export default Fetch;