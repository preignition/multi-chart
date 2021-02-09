import { html, css } from 'lit-element';
import { select } from 'd3-selection';
import { brushSelection } from 'd3-brush';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { MultiChartBase } from '../base-class.js';
import { default as DispatchSVG } from './dispatch-svg-mixin.js';
import { default as Brush } from '../d3-wrapper/d3-brush.js';
import { RelayTo, CacheId } from '@preignition/preignition-mixin';
import { default as Registerable } from './multi-registerable-mixin.js';
import { camelToDashCase } from '@polymer/polymer/lib/utils/case-map.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';


/**
 * ## MultiBrush
 *
 * `<multi-brush>` implements a brush selection as in  [d3-brush](https://github.com/d3/d3-brush)
 *
 * @element multi-brush
 * @fires selected-values-changed - Event fired when selectedValues changes
 * @fires is-range-changed - Event fired when isRange changes
 * @fires has-selection-changed - Event fired when selection changes
 * 
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
      @brush-changed="${e => this.setBrush(e.detail.value)}"
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
      selectedValues: {
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
       * extent of the brush  as per https://github.com/d3/d3-brush#brush_extent
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

      /*
       * `preventClear` set true to prevent selection to cleat on brush end
       */
      preventClear: {
        type: Boolean,
        attribute: 'prevent-clear'
      },

      /**
       * true when brush is implemented with a range scale
       * @type {Object}
       */
      isRange: {
        type: Boolean,
        notify: true,
      },
      /**
       * `xContinuous` indicate true if we have a `continuous` scale on X when the xScale is `ordinal` (e.g. a scaleBand for bar charts). If true a `xContinuousScale` is computed
       */
      xContinuous: {
        type: Boolean,
        attribute: 'x-continuous'
      },

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

  /**
   * From RelayTo mixin, used to automatically relay properties to child components
   */
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
    if (props.has('selectedValues')) {
      this._observeSelectedValues()
    }


  }

  _observeSelectedValues() {
    this._debounceSelect = Debouncer.debounce(
      this._debounceSelect, // initially undefined
      microTask,
      () => {
        this.log && console.log('brush selection', this.selectedValues);
        this.dispatchEvent(new CustomEvent('multi-select', {
          detail: {
            isRange: !!this.isRange,
            isMulti: false,
            selection: this.selectedValues
          },
          bubbles: true,
          composed: true
        }));
      });
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.extent = [
      [0, 0],
      [this.width, this.height]
    ];
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
    if (this.brush && !this._clearing) {
      this._clearing = true;
      this.brush.clear(select(this.targetElement));
      delete this._clearing;
    }
    this.selectedValues = [];
  }

  setBrush(brush) {
    if (brush) {
      var me = this;
      this.brush = brush;
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
    if (this._clearing) {
      return;
    }
    const selection = brushSelection(this.targetElement);

    if (!selection) {
      return this.clearSelection();
    }

    let scale = this.effectiveScale;

    const xScale = this.xScale;
    let sel;

    if (scale = scale.x) {
      sel = scale.y ? selection[0] : selection;
      if (scale.invert) {
        // isRange = true;
        this.isRange = true;
        sel = sel.map(scale.invert);
        // console.info('SEL', sel);
        if (this.selectedValues[0] !== sel[0] || this.selectedValues[1] !== sel[1]) {
          // only call the splice when needed 
          this.selectedValues = [sel[0], sel[1]]
        }
      } else {
        sel = xScale.domain().filter(function(d) {
          return sel[0] <= (d = xScale(d)) && d <= sel[1];
        });
        if (this.selectedValues.length !== sel.length || this.selectedValues[0] !== sel[0] || this.selectedValues[1] !== sel[1]) {
          // only call the splice when needed 
          this.selectedValues = [...sel];
        }
      }
    }
  }

  onMultiBrushStart() {
    this._refreshContiunousScale(this.xScale);
    // Note(cg): we need to clear the selection if not done on brushEnd.
    if (this.preventClear) {
      this.clearSelection();
    }
    this.isSelecting = true;
  }

  onMultiBrushEnd() {
    if (brushSelection(this.targetElement) && !this._clearing) {
      this._clearing = true;
      if (!this.preventClear) {
        this.clearSelection();
      }
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
        this._xContinuous = this.xContinuousScale.domain(extent(scale.domain())).range(range);
      } else {
        this._xContinuous = null;
      }
    }
  }

  get effectiveScale() {
    return {
      x: (this.brushType === 'brushY') ? null : this._xContinuous || this.xScale,
      y: (this.brushType === 'brushX') ? null : this._yContinuous || this.yScale,
    };
  }
}

export default MultiBrush;
