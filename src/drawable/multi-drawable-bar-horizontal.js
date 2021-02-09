import { html, css } from 'lit-element';

import { scaleBand } from 'd3-scale';
import { transition as Transition} from 'd3-transition';
import MultiDrawableBar from './multi-drawable-bar.js';

/** ## MultiDrawableBarHorizontal
 *
 * `<multi-drawable-bar>` draws bar as in https://github.com/d3/d3-shape#bar
 * 
 */
  
class MultiDrawableBarHorizontal extends MultiDrawableBar {


  drawSerieElement(chart, data) {

    chart
      .attr('fill', d => this.colorScale(d.key))
      .attr('class', `${this.shapeClass} ${this.selectSerie ? 'selectable' : ''}`)
      .attr('key', d => d.key);

    const keyFn = function(d) { return d ? d[3] : this.getAttribute('key');};
    chart = this.drawSerieGroup(data, 'rect', this.shapeClass, chart, this.transition, keyFn);

    // Note(cg): we add selectable to shape only if selectSerie is not true.
    if (!this.selectSerie) {
      chart instanceof Transition
      ? chart.selection().classed('selectable', true)
      : chart.classed('selectable', true);
    }

    let bandwidth = this.yScale.bandwidth;
    let align = 0;
    const yScale = this.yScale;
    // we might have an x-scale that does not have a bandwidth, e.g. when we have date on x-axis and use a timeScale
    if (!bandwidth) {
      if (yScale.interval && yScale.interval.range) {
        const d = yScale.domain();
        bandwidth = scaleBand().domain(yScale.interval.range(d[0], d[1]))
          .range(yScale.range())
          .padding(0.2)
          .bandwidth;
      } else {
        bandwidth = scaleBand().domain(data[0].map((d, i) => yScale(d[3] || i)))
          .range(yScale.range())
          .padding(0.2)
          .bandwidth;
      }
      align = bandwidth() / 2;
    }

    if (this.stacked) {
      chart = chart
            .attr('x', d => this.xScale(d[0]) || 0)
            .attr('width', d => (this.xScale(d[1]) - this.xScale(d[0])) || 0);
      
     return chart
          .attr('y', (d, i) => {
            return yScale(d[3] || i) - align;
          })
          .attr('height', bandwidth())
          .attr('key', d => d[3]);
    }

    const n = data.length;
    chart = chart
      .attr('y', (d, i) => yScale(d[3] || i) + bandwidth() / n * d[2] - align)
      .attr('height', bandwidth() / n)
      .attr('key', d => d[3]);

    return chart
      .attr('x', d => this.xScale(0))
      .attr('width', d => this.xScale(d[1] - d[0]) || 0)
      .attr('index', (d, i) => i);

  }
}

export default MultiDrawableBarHorizontal;
