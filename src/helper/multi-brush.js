import { html, css } from 'lit-element';
import { select, event as d3Event } from 'd3-selection';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { MultiChartBase } from '../base-class.js';
import { default as DispatchSVG } from './dispatch-svg-mixin.js';
import { default as Brush } from '../d3-wrapper/d3-brush.js';
import { RelayTo, CacheId } from '@preignition/preignition-mixin';
import { default as Registerable } from './multi-registerable-mixin.js';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map.js';
// import { Resizable } from './resizable-mixin.js';


/**
 * ## MultiBrush
 *
 * `<multi-brush>` implements a brush selection as in  [d3-brush](https://github.com/d3/d3-brush) 
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @demo
 **/
class MultiBrush extends
DispatchSVG(
  Registerable(
    CacheId(
      RelayTo(
        MultiChartBase)))) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `
      /* TODO(cg): make sure brush is styled properly;*/
      #brush rect.extent {
        fill: steelblue;
        fill-opacity: .125;
      }

      #brush .resize path {
        fill: #eee;
        stroke: #666;
      }
    `;
  }
  render() {
    return html `
    <d3-brush
      id="d3-brush"
      @d3-brush-changed="${e => this.setBrush(e.detail.value)}"
     ></d3-legend>

    <svg>
      <g id="brush" slot-svg="slot-brush" class="selector brush">
      </g>
    </svg>
`;
  }


  static get properties() {

    return {


      ...super.properties,

      ...Brush.properties,


      /**
       * Returns an array of currently selected items.
       */
      selectedItems: {
        type: Array,
        notify: true,
        value: []
      },

      xScale: { type: Function, },

      yScale: { type: Function, },


      /**
       * `brush` brushing for mouse or touch event implementation [d3-brush](https://github.com/d3/d3-brush) 
       */
      brush: { type: Function, },

      /**
       * `extent` extent of the brush
       */
      extent: { type: Array },

      /**
       * `isSelection` is true when a selection is being done (e.g. by brushing). The attribute is used for css rules.
       * This property is aimed at being bound to a multi-container-svg
       */
      isSelecting: {
        type: Boolean,
        value: false
      },

      /**
       * `hasSelection`  is true when a selection exists. The attribute is used for css rules.
       * This property is aimed at being bound to a multi-container-svg
       */
      hasSelection: {
        type: Boolean,
        notify: true
      },

      isRange: {
        type: Boolean,
        notify: true,
      },
      /**
       * `xContinuous` indicate true if we have a `continuous` scale on X when the xScale is `ordinal` (e.g. a scaleBand for bar charts). If true a `xContinuousScale` is computed
       */
      xContinuous: { type: Boolean },

      /**
       * `xContinuousScale` the continuous scale to use when selecting ranges 
       */
      xContinuousScale: {
        type: Function,
        value: function() {
          return scaleLinear();
        }
      },
    };
  }

  shallRelayTo(key, name) {
    if (name === 'd3-brush') {
      return Brush.properties[key];
    }
  }

  update(props) {
    super.update(props);
    this.relayTo(props, 'd3-brush');
    if (props.has('isSelecting')) {
      this.reflectToHost('isSelecting')
    }
    if (props.has('hasSelection')) {
      this.reflectToHost('hasSelection')
    }

  }

  static get observers() {
    return [
      '_observeSelectedItems(selectedItems, selectedItems.*)'
    ];
  }

  _observeSelectedItems() {
    this.debounce('multi-brush-select-debounce', () => {
      this.dispatchEvent(new CustomEvent('multi-select', {
        detail: {
          isRange: this.isRange,
          selection: this.selectedItems
        },
        bubbles: true,
        composed: true
      }));
    }, 30);
  }

  resize() {
    this._computeExtent();
  }

  get targetElement() {
    return this.$.brush;
  }

  reflectToHost(name) {
    if (this.svgHost) {
      select(this.svgHost).attr(camelToDashCase(name), this[name] ? true : null);
    }
  }

  clearSelection() {
    // this.brush.move(null);
    if (this.brush && this.brush.move) {
      select(this.targetElement).call(this.brush.move, null);
    }
    this.selectedItems = [];
  }

  _computeExtent() {
    this.extent = [
      [0, 0],
      [this.width, this.height]
    ];
  }


  setBrush(brush) {
    if (brush) {
      var me = this;

      brush
        .on('start', function() {
          me.onMultiBrushStart();
        })
        .on('end', function() {
          me.onMultiBrushEnd();
        })
        .on('brush', function() {
          me.onMultiBrush();
        });
      select(this.targetElement).call(brush);
    } else {
      select(this.targetElement).selectAll('*').remove();
    }
  }

  onMultiBrush() {
    if (!d3Event.sourceEvent || this._clearing) {
      return;
    }
    const selection = d3Event.selection;

    if (!selection) {
      return this.clearSelection();
    }

    let scale = this.effectiveScale;
    // var isRange = false;

    const xScale = this.xScale;
    let sel;

    if (scale = scale.x) {
      sel = scale.y ? selection[0] : selection;
      if (scale.invert) {
        // isRange = true;
        this.isRange = true;
        sel = sel.map(scale.invert);
        // console.info('SEL', sel);
        if (this.selectedItems[0] !== sel[0] || this.selectedItems[1] !== sel[1]) {
          // only call the splice when needed 
          this.splice('selectedItems', 0, 2, sel[0], sel[1]);
        }
      } else {
        sel = xScale.domain().filter(function(d) {
          return sel[0] <= (d = xScale(d)) && d <= sel[1];
        });
        if (this.selectedItems.length !== sel.length || this.selectedItems[0] !== sel[0] || this.selectedItems[1] !== sel[1]) {
          // only call the splice when needed 
          this.splice.apply(this, ['selectedItems', 0, this.selectedItems.length + 1].concat(sel));
        }
      }
    }
  }

  onMultiBrushStart() {
    this._refreshContiunousScale(this.xScale);
    // this.effectiveScale = this._getEffectiveScale();
    this.isSelecting = true;
  }

  onMultiBrushEnd() {
    if (!d3Event.selection && !this._clearing) {
      this._clearing = true;
      this.clearSelection();
    }

    delete this._clearing;
    this.isSelecting = false;
  }

  _refreshContiunousScale(scale) {
    if (scale) {
      if (scale && !scale.invert && this.xContinuous) {
        var range = scale.range();
        if (scale.bandwidth) {
          // it is a scaleBand; we need to re-adjust the range taking bandWIdth and padding into account (see https://github.com/d3/d3-scale#band-scales)
          var step = scale.step();
          range = [range[0] + step / 2, range[1] - step / 2];
        }
        this.__xContinuous = this.xContinuousScale.domain(extent(scale.domain())).range(range);
      } else {
        this.__xContinuous = null;
      }
    }
  }

  get effectiveScale() {
    return {
      x: (this.brushType === 'brushY') ? null : this.__xContinuous || this.xScale,
      y: (this.brushType === 'brushX') ? null : this.__yContinuous || this.yScale,
    };
  }
}

export default MultiBrush;