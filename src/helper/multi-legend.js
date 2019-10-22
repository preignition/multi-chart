import { html, css } from 'lit-element'
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { default as Registerable } from './multi-registerable-mixin.js';
import { default as DispatchSVG } from './dispatch-svg-mixin.js';
import { default as Legend } from '../d3-wrapper/d3-legend.js';
import { RelayTo, CacheId } from '@preignition/preignition-mixin';
import { MultiChartBase } from '../base-class.js';
// import { Resizable } from './resizable-mixin.js';
import { default as TrackHover } from './track-hover-mixin.js';
import { select } from 'd3-selection';

/**
 * ## MultiLegend
 *
 * `<multi-legend>` a element for displaying chart legends
 * Relying on [d3-legend](https://d3-legend.susielu.com/), A library to make legends in svg-land easy as pie.
 *
 * ### Styling
 * `<multi-drawable-feature>` provides the following custom properties and mixins
 * for styling:
 * 
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--multi-legend-color` | text color for legends | `#292929`
 * `--multi-legend-background` | background color for legenx box | `#efefef` 
 * `--multi-legend-stroke` | stroke color for legend box | `none` 
 * `--multi-legend-opacity` | opacity for legend box | `0.6` 
 * `--multi-legend` | Mixin applied to legend | `{}`

 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.SVGHelper
 * @appliesMixin MultiChart.mixin.MultiRegisterable
 * @appliesMixin MultiChart.mixin.DispatchSVG
 * @appliesMixin MultiChart.mixin.Resizable
 * @appliesMixin MultiChart.mixin.TrackHover
 * @appliesMixin MultiChart.mixin.Draw
 * @demo
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
    return css`

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
      <rect id="legendRect" opacity="${this.opacity}"  slot-svg="slot-legend" class="legend-rect"></rect>
      <g id="legend" part="legend" opacity="${this.opacity}" slot-svg="slot-legend" transform="translate(${this.x || 0},${this.y || 0})scale(${this.scaleFactor || 1})" class="legend"></g>
    </svg>
`;
  }


  static get properties() {
    return {

      ...super.properties,

      ...Legend.properties,
      /**
       * legend `type` the type of legend (`color`, `size`, `symbol`) 
       * for instantiating the legend ([d3-legend](http://d3-legend.susielu.com/).
       */
      type: {
        type: String,
        value: 'color'
      },

      width: {
        type: Number,
        notify: true
      },

      height: {
        type: Number,
        notify: true
      },

      opacity: {
        type: Number,
        value: 0
      },

      /* 
       * `retOffset` the offset for legend rect
       */
      rectOffset: {
        type: Number,
        value: 5
      },

      scaleFactor: {
        type: Number,
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

      x: {
        type: Number,
        value: 0
      },

      y: {
        type: Number,
        value: 0
      },

    };
  }

  shallRelayTo(key, name) {
    if (name === 'd3-legend') {
      return Legend.properties[key];
    }
  }

  update(props) {
    super.update(props);
    this.relayTo(props, 'd3-legend');
  }

  updated(props) {
    super.updated(props);
    if(props.has('position')) {
      this.debounceDraw();
    }
  }



  // connectedCallback() {
  //   super.connectedCallback();
  //   // this.addEventListener('multi-refresh', this.onRefresh);
  //   // this.notifyResize();

  // }

  resize() {
    this.debounceDraw();
  }

  debounceDraw() {
    this._debounceDraw = Debouncer.debounce(
      this._debounceDraw, // initially undefined
      timeOut.after(10),
      () => {
        this.draw(this._shaped);
        this._isDrawn = true;
      });
  }

  dataChanged() {
    this.debounceDraw();
  }

  draw() {
    setTimeout(() => {
      // Note(cg): async as we need to make sure legend is drawn before we can calculate real size and adjust position.
      // this.selectShadow('#legend').call(this.legend);
      select(this.$.legend).call(this.legend);
      setTimeout(() => { this.setPosition(); }, 50);
    }, 10);
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

    // const legendEl = this.queryShadow('#legend');
    const legendEl = this.$.legend;
    const size = legendEl.getBoundingClientRect();
    if (!size.width || !size.height || !this.svgHost) {
      return;
    }

    const position = this.position;
    const isRight = ~position.indexOf('right');
    const isBottom = ~position.indexOf('bottom');

    const chartSize = legendEl.ownerSVGElement.getBoundingClientRect();

    this.y = this.rectOffset + this.padding;
    this.x = this.rectOffset + this.padding;

    if (isRight) {
      // console.info('SIZE: ', size,chartWidth, padding )
      this.x = chartSize.width - size.width - this.padding + this.rectOffset;
    }


    if (isBottom) {
      this.y = chartSize.height - size.height - this.padding + this.rectOffset;
    }
    this._isDrawn = true;
    this.opacity = 1;
    select(this.$.legendRect)
      .attr('transform', `translate(${this.x - this.rectOffset}, ${this.y - this.rectOffset})`)
      .attr('width', size.width + 2 * this.rectOffset)
      .attr('height', size.height + 2 * this.rectOffset - 3);

    this.width = size.width;
    this.height = size.height;
  }
}


export default MultiLegend;