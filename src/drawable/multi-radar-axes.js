import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { RelayTo, CacheId, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { default as axisProperty } from './properties/axis.js';
import { default as Axis } from '../d3-wrapper/d3-axis.js';
import { wrap } from '../helper/utils.js';
import { select } from 'd3-selection';
import * as multi from 'd3-selection-multi';
import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';

class MultiRadarAxes extends
CacheId(
  RelayTo(
    MultiDrawable)) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `

      #axes.axis line,
      #axes.axis path {
        stroke: var(--multi-axis-color, var(--secondary-text-color));
      }

      #axes.axis text {
        fill: var(--multi-axis-color, var(--secondary-text-color));
      }`;
  }

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html `
     
      <svg>
        <g id="axes" part="axes-group" slot-svg="slot-background" transform="translate(${this.width / 2 || 0}, ${this.height / 2 || 0})">
          <g id="axisWrapper"></g>
        </g>
      </svg>
    `;
  }

  static get properties() {

    return {

      ...super.properties,

      /**
       * `axes` array of axis for radat chart
       *  {label: 'label', key: 'key', max: max, class: 'class', xOffset, offset, yOffset: offset}
       */
      axes: {
        type: Array,
      },

      /*
       * `labelAccessor` accessor to get text labels
       */
      labelAccessor: {
        type: Function,
        value: () => {
          return (d) => d.label || d;
        }
      },

      /*
       * `radius` - radius of the chart. Set by multi-chart-radar when scale is calculated (onDataGroupRescaled)
       */
      // radius: {
      //   type: Number,
      // },

      /*
       * `levels` How many levels or inner circles should there be drawn
       */
      levels: {
        type: Number,
        value: 3
      },

      hideAxis: {
        type: Boolean,
        value: false
      },

      hideCircles: {
        type: Boolean,
        value: false
      },

      /*
       * `circleConfig` config applied to circles
       */
      circleConfig: {
        type: Object,
        value: {
          'fill': '#cdcdcd',
          'stroke': '#fff',
          'stroke-width': 2,
          'stroke-dasharray': 10,
          'fill-opacity': 0.15
        }
      },

      /*
       * `axisTextConfig` config to be applied to axis text
       */
      axisTextConfig: {
        type: Object,
        value: {
          'dy': '0.4em',
          'font-size': '10',
          'fill': '#737373'
        }
      },

      /*
       * `axisLineConfig` config to be applied to axis line
       */
      axisLineConfig: {
        type: Object,
        value: {
          'stroke': '#fff',
          'stroke-width': '3'
        }
      },

      /*
       * `axisLabelConfig` config to be applied to axis label
       */
      axisLabelConfig: {
        type: Object,
        value: {
          'font-size': '11',
          'text-anchor': 'middle',
          'dy': '0.35em'
        }
      },

      /*
       * `wrapWidth`
       */
      wrapWidth: {
        type: Number,
        value: 50
      },

      /*
       * `labelFactor` How much farther than the radius of the outer circle should the labels be placed
       */
      labelFactor: {
        type: Number,
        value: 1.1
      },

      /*
       * `scaleFactor` factor by which we reduce the size of the chart so that labels
       * do not overflow
       */
      scaleFactor: {
        type: Number,
        value: 0.8
      },

      /*
       * `format` d3.format to use for grid circles labels
       */
      format: {
        type: String,
        // value: '.0%'
        value: '.2s'
      },

      radialDomain: {
        type: Array,
      },

      radialScale: {
        type: Function,
      }

    };

  }

  draw(data) {
    const axisWrapper = select(this.$.axisWrapper);
    if (!this.width || !this.height) {
      return;
    }
    if (!this.axes || !this.axes.length || !this.radialScale) {
      return;
    }

    // Wrapper for the grid & axes
    // const axisGrid = sel.append('g').attr('class', 'axisWrapper');
    // const radius = this.minSize / 2 * this.scaleFactor;
    const scale = this.radialScale;
    const radius = scale.range()[1];
    const maxValue = scale.domain()[1];
    const Format = format(this.format);
    const angleSlice = Math.PI * 2 / this.axes.length;


    // Draw the background circles
    if (!this.hideCircles) {
      let levels = axisWrapper.selectAll('.gridCircle')
        .data(range(1, (this.levels + 1)).reverse());

      levels.exit().remove();

      levels = levels
        .enter()
        .append('circle')
        .merge(levels)
        .attr('class', 'gridCircle')
        .attr('r', (d, i) => { return radius / this.levels * d; })
        .attrs(this.circleConfig);
    }

    if (!this.hideAxis) {
      // Text indicating at what % each level is
      let grids = axisWrapper.selectAll('.axisLabel')
        .data(range(1, (this.levels + 1)).reverse());

      grids.exit().remove();

      grids = grids
        .enter()
        .append('text')
        .merge(grids)
        .attr('class', 'axisLabel')
        .attr('x', 4)
        .attr('y', (d) => { return -d * radius / this.levels; })
        .attrs(this.axisTextConfig)
        .text((d, i) => { return Format(maxValue * d / this.levels); });

      // Create the straight lines radiating outward from the center
      let axis = axisWrapper.selectAll('.axis')
        .data(this.axes);

      axis.exit().remove();

      axis = axis
        .enter()
        .append('g')
        .merge(axis)
        .attr('class', 'axis');

      axis.selectAll('*').remove();

      axis.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => { return scale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2); })
        .attr('y2', (d, i) => { return scale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2); })
        .attrs(this.axisLineConfig)
        .attr('class', 'line');

      // Append the labels at each axis
      axis.append('text')
        .attr('class', 'legend')
        .attrs(this.axisTextConfig)
        .attr('x', (d, i) => { return scale(maxValue * this.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2); })
        .attr('y', (d, i) => { return scale(maxValue * this.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2); })
        .attr('text-anchor', function(d, i) {
          return this.getAttribute('x') * 1 < 0 ? 'end' : '';
        })
        .text(this.labelAccessor)
        .call(wrap, this.wrapWidth);
    }
  }
}

export default MultiRadarAxes;
