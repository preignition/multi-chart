import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { select} from 'd3-selection';
import { transition as Transition} from 'd3-transition';

const MultiDrawableSerie = dedupingMixin( superClass => {

  return class extends superClass {

    static get properties() {
      return {

        ...super.properties,

        /* 
         * `selectSerie` if true, will set the `selectable` attribute at serie level. Default (falsy) will 
         * add `selectable` attribute to each individual shape (rect in car chart, circle in bubble chart)
         */
        selectSerie: {
          type: Boolean
        }

      };
    }

    get shapeClass() {
      this.log && console.warn('shapeClass need to be overriden in subClass.');
      return 'serie';
    }

    get shapeName() {
      return 'path';
    }

    drawSerieElement(chart, data) {
      this.log && console.warn('drawing serie element shall be implemented in subclass');
      return chart;
    }

    /* 
     * `drawSerieGroup` builds one level of data  binding -> remove superfluous -> append new -> merge -> return chart
     * We can hence call this function for first grouping all keys and then build individual shapes (see multi-drawable-bubble)
     */
    drawSerieGroup(data, shapeName, shapeClass, chart, transition) {
      const isTransition = chart && chart instanceof Transition;
      const cls = chart ? 'shape' : 'shape-group';
      chart = chart ?
        isTransition ?
        chart.selection().selectAll(`${shapeName}.${shapeClass}`).data(d => d.data || d) :
        chart.selectAll(`${shapeName}.${shapeClass}`).data(d => d.data || d) :
        select(this.targetElement).selectAll(`${shapeName}.${shapeClass}`).data(data);

      chart.exit().remove();

      chart = chart.enter().append(shapeName)
        .attr('class', `${shapeClass} ${cls}`)
        .merge(chart);

      if (this.shallTransition && transition) {
        chart = this.applyTransition(chart, transition);
      }
      return chart;

    }

    /* 
     * `draw` serie data, which are in the form of [{key, label, data: [dataValues]}]
     */
    _draw(data) {
      if(!this.width || !this.height || !data) {
        return;
      }

      let chart = this.drawSerieGroup(data, this.shapeName, this.shapeClass, null, this.transition);

      // Note(cg): individual serie members (e.g. draw individual line or bar) are handled by subclasses .
      return this.drawSerieElement(chart, data);

    }
  };
});


/* 
 * @mixinFunction
 */
export default MultiDrawableSerie;
