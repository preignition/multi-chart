import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
// import { dedupingMixin } from '@polymer/lib/utils/mixin.js';

/**
 * ##  Resizable
 * 
 * handles size and resizing
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */

const ResizeObserver = window.ResizeObserver || Polyfill;
const ro = new ResizeObserver((entries, observer) => {
  entries.forEach((entry, index) => entry.target.onResize(entry, index));
});

const Resizable = dedupingMixin(superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Mixin extends superClass {


    static get properties() {
      
      return {

        ...super.properties,
        /* 
         * `width`  of SVG host
         */
        width: {
          type: Number
        },

        /* 
         * `height` of SVG host
         */
        height: {
          type: Number
        }

      };
    }

    connectedCallback() {
      super.connectedCallback();
      ro.observe(this);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      ro.unobserve(this);
    }
    
    onResize(entry, index) {
      throw new Error('on resize need to be overridden ')
    }

  }

  return Mixin;
});

export default Resizable