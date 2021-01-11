import { html, css } from 'lit-element'
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { default as Registerable } from './multi-registerable-mixin.js';
import { default as DispatchSVG } from './dispatch-svg-mixin.js';
import { default as Legend } from '../d3-wrapper/d3-legend.js';
import { RelayTo, CacheId } from '@preignition/preignition-mixin';
import { MultiChartBase } from '../base-class.js';
import { default as TrackHover } from './track-hover-mixin.js';
import { select } from 'd3-selection';

/**
 * ## MultiLegend
 *
 * `<multi-legend>` a element for displaying chart legends
 * Relying on [d3-legend](https://d3-legend.susielu.com/), A library to make legends in svg-land easy as pie.
 *
 * @element multi-legend
 *
 * @cssprop --multi-legend-color -  text color for legends (#292929)
 * @cssprop --multi-legend-background -  background color for legenx box (`#efefef`)
 * @cssprop --multi-legend-stroke -  stroke color for legend box
 * @cssprop --multi-legend-opacity -  opacity for legend box  (`0.6`)
 *
 * @fires width-changed - Event fired when width changes
 * @fires height-changed - Event fired when height changes
 *
 **/
class MultiLegend extends
DispatchSVG(
  TrackHover(
    RelayTo(
      CacheId(
        Registerable(
          MultiChartBase))))) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `

    #legend.legend .legendCells {
      fill: var(--multi-legend-color, #292929);
    }

    #legend .legendTitle {
      transform: translate(0px,12px);
    }

    #legendRect {
      pointer-events: none;
      fill: var(--multi-legend-background, #efefef);
      stroke: var(--multi-legend-stroke, none);
      opacity: var(--multi-legend-opacity, 0.6);
    }`;
  }

  render() {
    return html `

    <d3-legend
      id="d3-legend"
      @legend-changed="${e => this.setLegend(e.detail.value)}"
     ></d3-legend>

    <svg>
      <rect id="legendRect" opacity="${this._opacity}"  slot-svg="slot-legend" class="legend-rect"></rect>
      <g id="legend" part="legend" opacity="${this._opacity}" slot-svg="slot-legend" transform="translate(${this._x || 0},${this._y || 0})scale(${this.scaleFactor || 1})" class="legend"></g>
    </svg>
`;
  }


  static get properties() {
    return {

      ...super.properties,

      ...Legend.properties,

      /**
       * legend `type` the type of legend 
       * @type {'color'|'size'|'symbol'}
       * for instantiating the legend ([d3-legend](http://d3-legend.susielu.com/).
       */
      type: {
        type: String,
        value: 'color'
      },

      /**
       * legend width
       */
      width: {
        type: Number,
        notify: true
      },

      /**
       * legend height
       */
      height: {
        type: Number,
        notify: true
      },

      /**
       * opacity used to hide legend before its size is 
       * computed 
       */
      _opacity: {
        type: Number,
        value: 0
      },

      /*
       * `retOffset` the offset for legend rect
       */
      rectOffset: {
        type: Number,
        attribute: 'rect-offset',
        value: 5
      },

      /**
       * factor between 0 to 1 to help make legend smaller
       */
      scaleFactor: {
        type: Number,
        attribute: 'scale-factor',
        value: 0.7
      },

      /**
       * `position` this position within the chart. e.g. top-right, bottom-left
       * position is recalculated on resize.
       */
      position: {
        type: String,
        value: 'top-right'
      },

      /**
       * `padding` the padding to be applied when calculation the position
       */
      padding: {
        type: Number,
        value: 10
      },

      /**
       * x position
       */
      _x: {
        type: Number,
        value: 0
      },

      /**
       * y position
       */
      _y: {
        type: Number,
        value: 0
      },

    };
  }

  /**
   * From RelayTo mixin, used to automatically relay properties to child components
   */
  shallRelayTo(key, name) {
    if (name === 'd3-legend') {
      return Legend.properties[key];
    }
  }

  update(props) {
    this.relayTo(props, 'd3-legend');
    super.update(props);
  }

  updated(props) {
    if (props.has('position')) {
      this.debounceDraw();
    }
    super.updated(props);
  }

  resize() {
    this.debounceDraw();
  }

  debounceDraw() {
    this._debounceDraw = Debouncer.debounce(
      this._debounceDraw, // initially undefined
      timeOut.after(10),
      () => {
        this.draw(this._shaped);
        // this._isDrawn = true;
      });
  }

  dataChanged() {
    this.debounceDraw();
  }

  draw() {
    setTimeout(() => {
      // Note(cg): async as we need to make sure legend is drawn before we can calculate real size and adjust position.
      select(this.$.legend).call(this.legend);
      setTimeout(() => { this.setPosition(); }, 60);
    }, 50);
    // if (!this._isDrawn) {
    // } else {
    //   setTimeout(() => { this.setPosition(); }, 60);
    // }
  }

  setLegend(legend) {
    if (legend) {
      legend.on('cellclick', d => {
        this.dispatchEvent(new CustomEvent('multi-cell-click', { detail: d, bubbles: true, composed: true }));
      });
      legend.on('cellover', d => { this.hovered = d; });
      legend.on('cellout', d => { this.hovered = null; });
      this.legend = legend;
      this.debounceDraw();
    }
  }

  setPosition() {

    const legendEl = this.$.legend;
    const size = legendEl.getBoundingClientRect();
    //if (!size.width || !size.height || !this.svgHost) {
    if (!size.width || !size.height) {
      return;
    }

    const position = this.position;
    const isRight = ~position.indexOf('right');
    const isBottom = ~position.indexOf('bottom');

    const chartSize = legendEl.ownerSVGElement.getBoundingClientRect();

    this._y = this.rectOffset + this.padding;
    this._x = this.rectOffset + this.padding;

    if (isRight) {
      // console.info('SIZE: ', size,chartWidth, padding )
      this._x = chartSize.width - size.width - this.padding + this.rectOffset;
    }


    if (isBottom) {
      this._y = chartSize.height - size.height - this.padding + this.rectOffset;
    }
    this._isDrawn = true;
    this._opacity = 1;
    select(this.$.legendRect)
      .attr('transform', `translate(${this._x - this.rectOffset}, ${this._y - this.rectOffset})`)
      .attr('width', size.width + 2 * this.rectOffset)
      .attr('height', size.height + 2 * this.rectOffset - 3);

    this.width = size.width;
    this.height = size.height;
  }
}

export default MultiLegend;
