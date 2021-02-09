import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { transition } from 'd3-transition';

/**
 * ##  Draw
 *
 * handles drawable drawing mechanism
 *
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
const Draw = superClass => {

  return class extends superClass {

    static get properties() {

      return {

        ...super.properties,

        /*
         * `data`  to draw the chart from
         */
        data: {
          type: Array
        },

        /*
         * `transition` a transition composer function
         */
        transition: {
          type: Function,
          value: function() {
            return function(transition) {
              return transition.duration(200);
            };
          }
        },

        /*
         * `filter` a way to filter data passed to draw method
         *
         */
        filter: {
          type: Function
        },

        /*
         * `decorate` the chart once drawn
         */
        decorate: {
          type: Function
        }

      };
    }

    constructor() {
      super();
      super.decorate = chart => chart;
    }

    /*
     * `getDrawable` allows to specify which data to use for generating the chart.
     * This is usefull for multi-geo where chart is generated by topojson feature and not by raw data.
     */
    get drawableData() {
      return this._shaped;
    }

    setData(data) {
      if (data) {
        // Note(cg): filter allows to dispay only a subset of the data.
        // This is usefull for instance when we want to display multiple groups.
        if (this.filter) {
          this.data = data.filter(this.filter);
        } else { this.data = data; }
      }
    }

    update(props) {
      this.log && console.info('update props', props, this);
      if (props.has('data')) {
        this._shaped = this.shape(this.data);
      }
      super.update(props);
    }

    updated(props) {
      this.log && console.info('updated props', props, this);
      this.debounceDraw();
      super.updated(props);
    }

    /*
     * `shape` some charts are easier to draw is data is reshaped (for instance, stack chart)
     */
    shape(data) {
      return data;
    }

    debounceDraw() {
      this.log && console.info('debounce', this);
      this._debounceDraw = Debouncer.debounce(
        this._debounceDraw, // initially undefined
        timeOut.after(10),
        () => {
          this.log && console.info('debounced', this);
          const isDrawn = this.draw();
          this._isDrawn = !!isDrawn;
          if (this.decorate && this._isDrawn) {
            this.decorate(isDrawn, this.drawableData);
          }
          this.dispatchEvent(new CustomEvent('multi-drawn', { detail: {
            drawn: isDrawn,
            data: this.drawableData
          }, bubbles: true, composed: true }));
        });
    }

    /*
     * `draw` this is where do the work !
     */
    draw() {
      this.log && console.error(`draw method shall be overriden in subClasses.`);
    }

    /*
     * `shallTransition` called within the draw function to know if transition shall be applied
     */
    get shallTransition() {
      // Note(cg): by default, we skip the transition for first draw.
      return this.transition && this._isDrawn === true;
    }

    dataChanged(data, transition) {
      this.log && console.info('dataChanged', this.data === data)
      this.data = data;
      if (transition) {
        this.transition = transition;
      }

    }
    /*
     * `applyTransition`  applies a transition to chart
     */
    applyTransition(chart, transition) {
      return chart.transition().call(transition)
        .on('end', this.onEndTransition);
    }

    onEndTransition() {}


  };
};

export default Draw;