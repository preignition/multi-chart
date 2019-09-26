import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { cssTheme } from '@preignition/preignition-mixin';

/**
 * ## MultiHighlight
 * 
 *   adds a highlight class on shapes with same keys as `highlightedKeys`
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
const MultiHighlight = dedupingMixin(superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Mixin extends superClass {

    static get properties() {
      return {

        ...super.properties,

        highlightedKeys: {
          type: Array
        },

        highlightedCls: {
          type: String,
          value: 'highlighted'
        },

        /* 
         * `layerId` id of the layer containing elements to be highlighted.
         */
        layerId: {
          type: String,
          value: 'slot-layer'
        },

        /* 
         * `highlightAccessor` accessor function to fetch keys to be highlighted
         * default value supposes that we have elements like `<path data-key="tyhKey"></path>`
         */
        highlightAccessor: {
          type: Function,
          value: function() {
            return function(d) {
              return this.getAttribute('key');
            };
          }
        }
      };
    }

    get highlightedLayer() {
      return this.$[this.layerId];
    }

    static get observers() {
      return [
        '_observeHighlightedKeys(highlightedKeys, layer)'
      ];
    }

    _observeHighlightedKeys(keys) {

      if (!this.highlightedLayer) {
        console.error('cannot get layer in highlightedKeys');
      }
      const accessor = this.highlightAccessor;

      d3.select(this.highlightedLayer).selectAll('.selectable')
        .classed(this.highlightedCls, function(d) {
          return keys.indexOf(accessor.call(this, d)) > -1;
        });

    }
  }

  return Mixin;
});

/* 
 * @mixinClass
 */
export default MultiHighlight ;