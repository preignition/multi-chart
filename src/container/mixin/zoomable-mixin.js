import { default as zoomableProperty } from '../properties/zoomable.js';
import { select } from 'd3-selection';
import { zoom } from 'd3-zoom';
// import { selectMixin } from '/web_modules/@preignition/preignition-mixin.js';

/**
 * ##  Zoomable
 * 
 * allows charts to be zoomable
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
const Zoomable = superClass => {

  return class extends superClass {

    static get properties() {

      return {

        ...super.properties,

        ...zoomableProperty,

        /*
         * `enableZoom` set true to enable zoom behaviors
         */
        enableZoom: {
          type: Boolean,
          reflect: true,
          attribute: 'enable-zoom',
        },


      };
    }

    updated(props) {
      if (props.has('enableZoom')) {
        this._observeEnableZoom(this.enableZoom);
      }

      if (props.has('extent') && this._zoom) {
        this._zoom.extent(this.extent);
      }

      if (props.has('scaleExtent') && this._zoom) {
        this._zoom.scaleExtent(this.scaleExtent);
      }
      super.updated(props);

    }

    get zoomedEl() {
      return select(this.renderRoot.querySelector('#slot-zoom'));
      // return d3.select(this.renderRoot.querySelector('#slot-zoom'));
    }

    _observeEnableZoom(enable) {
      if (enable) {
        const zoomed = ({transform}) => {
          this.zoomedEl.attr('transform', transform);
        };

        this._zoom = zoom().on('zoom', zoomed);
        select(this.renderRoot.querySelector('#svg')).call(this._zoom);
        // d3.select(this.$.svg).call(this._zoom);

      }
      if (!enable) {
        this._zoom = null;
      }

    }
  };
};


/*
 * @mixinFunction
 */
export { Zoomable };
