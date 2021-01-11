import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { select } from 'd3-selection';
/**
 * ##  TrackHover
 * 
 * track which element is being hovered
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
const TrackHover = dedupingMixin(superClass => {

  return class extends superClass {

    static get properties() {
      return {

        ...super.properties,

        /* 
         * `trackHover` set true if selector listen to mouseenter/mouseleave events and set hoveredItem accordingly. 
         * When true, this element also and fires `multi-mouseenter` and multi-mouseleave. 
         */
        trackHover: {
          type: Boolean,
          value: false,
          attribute: 'track-hover'
        },

        /* 
         * `hovered` the hovered item, tracked when `trackHover` is set to true. 
         * This is usefull for instance when we want to highlight the legend being hovered
         */
        hovered: {
          type: String,
          notify: true,
        },
      };
    }

    /* 
     * `attachListeners` listen to click, mouseenter and mouseleave and 
     * fires their respective `multi` events (`multi-tap`, `multi-mouse-enter` and `multi-mouse-leave`)
     */
    attachListeners(sel) {
      const me = this;
      if (this.trackHover) {
        sel
          .on('mouseenter', function(d, i) { me.onMouseenter(d, i, this); })
          .on('mouseleave', function(d, i) { me.onMouseleave(d, i, this); });
      }
    }

    detatchListeners(sel) {
      sel
        .on('mouseenter', null)
        .on('mouseleave', null);
    }

    onMouseenter(d, i, el) {
      this.hovered = this.getKey(d, el);
      this.dispatchEvent(new CustomEvent('multi-mouseenter', { detail: { data: d, index: i, element: el }, bubbles: true, composed: true }));
    }

    onMouseleave(d, i, el) {
      this.hovered = null;
      this.dispatchEvent(new CustomEvent('multi-mouseleave', { detail: { data: d, index: i, element: el }, bubbles: true, composed: true }));
    }

    getKey(d) {
      return d.data ? d.data.key : d.key ? d.key : d;
    }

    updated(props) {
      if (props.has('hovered')) {
        this._observerHovered(this.hovered);
      }
      super.updated(props);
    }

    /* 
     * `_observerHoveredItem` add `.hovered` class to all items with same key as hovered
     */
    _observerHovered(hovered) {
      if (this.svgHost) {
        const me = this;
        select(this.svgHost).attr('is-hovered', hovered ? true : null);
        select(this.svgHost.renderRoot).selectAll('.selectable, .cell')
          .attr('hovered', function(d) {
            return me.getKey(d, this) === hovered ? true : null;
          });
      }
    }
  };
});

export default TrackHover;