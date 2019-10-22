import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { cssTheme } from '@preignition/preignition-mixin';
import { select } from 'd3-selection';
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
          type: Array,
          attribute: 'highlighted-keys'
        },

        highlightedCls: {
          type: String,
          value: 'highlighted',
          attribute: 'highlighted-cls'
        },

        /* 
         * `layerId` id of the layer containing elements to be highlighted.
         */
        layerId: {
          type: String,
          value: 'slot-layer',
          attribute: 'layer-id'
        },

        /* 
         * `highlightAccessor` accessor function to fetch keys to be highlighted
         * default value supposes that we have elements like `<path data-key="tyhKey"></path>`
         */
        highlightAccessor: {
          type: Function,
          attribute: 'highlight-accessor',
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

    updated(props) {
      super.updated(props);
      if(props.has('highlightedKeys')) {
        this._observeHighlightedKeys();
      }
    }

    // static get observers() {
    //   return [
    //     '_observeHighlightedKeys(highlightedKeys, layer)'
    //   ];
    // }

     _observeHighlightedKeys() {

      if (!this.highlightedLayer) {
        console.error('cannot get layer in highlightedKeys');
      }
      
      const {highlightAccessor, highlightedKeys} = this;

      select(this.highlightedLayer).selectAll('.selectable')
        .classed(this.highlightedCls, function(d) {
          return highlightedKeys.indexOf(highlightAccessor.call(this, d)) > -1;
        });

    }
  }

  return Mixin;
});

/* 
 * @mixinClass
 */
export default MultiHighlight ;