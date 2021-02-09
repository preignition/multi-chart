
import '../helper/multi-accessor.js';
import { select, selectAll } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import { html } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as Shaper } from './mixin/drawable-shaper-mixin.js';
import  { Pie, Arc }  from '../d3-wrapper/d3-shape.js';

/**
 * ## MultiDrawablePie
 *
 * `<multi-drawable-pie>` draws a pie
 *
 * @memberof MultiChart
 * @element multi-drawable-chart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.D3PieProperty
 * @demo index.html#multi-pie-demo
 **/
class MultiDrawablePie extends 
  Shaper(
    MultiDrawable) {
  render() {
    return html`
     ${this.valuePath ? html`
        <multi-accessor 
          .path="${this.valuePath}"
          @accessor-changed="${e => this.value = e.detail.value}" 
        ></multi-accessor>` : ''}
         <d3-shape-pie 
          .value="${this.value}" 
          .padAngle="${this.padAngle}" 
          .sort="${this.sort}" 
          .sortValues="${this.sortValues}"
          @shape-changed="${this.onSetShaper}" 
         ></d3-shape-pie>
         <d3-shape-arc 
          .innerRadius="${this.getPieWidth() || this.innerRadius}" 
          .outerRadius="${this.getOuterRadius() || this.outerRadius}" 
          .cornerRadius="${this.cornerRadius}" 
          @shape-changed="${e => this.arc = e.detail.value}" 
        ></d3-shape-arc>
        <svg>
          <g id="drawable" 
            slot-svg="slot-chart" 
            class="drawable pie" 
            transform="translate(${this.width / 2 || 0}, ${this.height / 2 || 0})"></g>
        </svg>
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      ...Pie.properties,

      ...Arc.properties,

      /**
       * `pieWidth` a way to indicate the width of the radius (either in % or absolute value).
       * If set, inner radius will be inferred.
       */
      pieWidth: {
        type: String
      },

      arc: {
        type: Function,
      },

      /*
       * `valuePath` path for creating value accessor
       */
       valuePath: {
         type: String,
         attribute: 'value-path'
        },
    };
  }

  getOuterRadius() {
    if (typeof this.outerRadius !== 'function' && this.minSize) {
      return this.minSize / 2;
    }
  }

  getPieWidth() {
    if (this.pieWidth) {
        const outerRadius = this.getOuterRadius();
        return (this.pieWidth + '').endsWith('%') 
          ? outerRadius * (1 - parseFloat(this.pieWidth) / 100) 
          : outerRadius - parseFloat(this.pieWidth);
    }
  }

  get shapeClass() {
    return 'pie';
  }
  get shapeName() {
    return 'path';
  }

  draw() {
   const data = this.drawableData;
    if (!this.width || !this.height || !data) {
      return;
    }

    let chart = select(this.targetElement).selectAll(`${this.shapeName}.${this.shapeClass}`);

    if (this.shallTransition) {
      chart.each(function(d) {
        this._current = Object.assign({}, d);
      });
    }

    // var arcs = this.pie(data);
    const arcs = this.shaper(data); // this.$.shaper.shapedData;
    const arc = this.arc;
    const colorScale = this.colorScale;

    chart = chart.data(arcs, function(d) { return d ? d.data.key : this.getAttribute('key');});

    chart.exit().remove();

    chart = chart.enter().append(this.shapeName)
      .attr('class', `${this.shapeClass} selectable shape`)
      .merge(chart);

    if (this.shallTransition) {
      //as in https://bl.ocks.org/mbostock/5100636
      function arcTween(a) {
        var i = interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
          return arc(i(t));
        };
      }

      chart = this.applyTransition(chart, this.transition);

      chart
        .attrTween('d', arcTween);

    } else {
      chart
        .attr('d', arc);
    }

    chart.attr('key', function(d) {
        return d.data.key;
      })
      .attr('fill', function(d) {
        return colorScale(d.data.key);
      });

    return chart;
  }
}

export default MultiDrawablePie;
