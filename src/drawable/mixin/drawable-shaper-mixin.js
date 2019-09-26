/**
 * ##  MultiDrawableSerie
 * 
 * a Mixin to implement generic draw function for seriest
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
const Shaper = dedupingMixin( superClass => {

  return class extends superClass {

    static get properties() {
      return {

        ...super.properties,

        /* 
         * `shaper`  shaper function for generating path ([for instance, pie](https://github.com/d3/d3-shape#lines)
         */
        shaper: {
          type: Function
        }


      };
    }

    onSetShaper(e) {

      // Note(cg): allow the event to further propagate and assign proper group.
      e.detail.group = this.group;
      this.shaper = e.detail.value;
    }

  };
});


/* 
 * @mixinFunction
 */
export default Shaper;
