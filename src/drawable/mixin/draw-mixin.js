
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';

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
         filter : {
           type:  Function
           }

      };
    }

    /* 
     * `getDrawable` allows to specify which data to use for generating the chart. 
     * This is usefull for multi-geo where chart is generated by topojson feature and not by raw data.
     */
    get drawableData() {
      return this.data;
    }

    setData(data) {
       if (data) {
        // Note(cg): filter allows to dispay only a subset of the data. 
        // This is usefull for instance when we want to display multiple groups. 
        if(this.filter) {
          this.data = data.filter(this.filter);
        }
        else {this.data = data ;}
      }
    }

    // get propertiesToDraw() {
    //   return ['data'];
    // }

    // shallDraw(changedProperties) {
    //   return this.propertiesToDraw.some(k=> changedProperties.has(k))
    // }

    update(props) {
      super.update(props);
      if(props.has('data')) {
        this._shaped = this.shape(this.data);
      }
    }

    updated(props) {
      super.updated(props);
      this.debounceDraw();
    }

    /* 
     * `shape` some charts are easier to draw is data is reshaped (for instance, stack chart)
     */
    shape(data) {
      return data;
    }

    debounceDraw() {
      this._debounceDraw = Debouncer.debounce(
        this._debounceDraw, // initially undefined
        timeOut.after(10),
        () => {
          this._draw(this._shaped);
          this._isDrawn = true;
          this.dispatchEvent(new CustomEvent('multi-drawn', {detail: {}, bubbles: true, composed: true})); 
        });
    }

    /* 
     * `_draw` this is where we work !
     */
    _draw() {
      this.log && console.error(`draw method shall be overriden in subClasses.`)
    }
    
    /* 
     * `shallTransition` called within the draw function to know if transition shall be applied 
     */
    get shallTransition() {
      // Note(cg): by default, we skip the transition for first draw.
      return this.transition && this._isDrawn === true;
    }

    dataChanged(data, transition) {
      this.data = data; 
      if(transition) {
        this.transition = transition;
      }
      // this._shaped = null;
      // this.render(data, transition);
    }
    /* 
     * `applyTransition`  applies a transition to chart
     */
    applyTransition(chart, transition) {
      return chart.transition().call(transition)
        .on('end', this.onEndTransition);
    }

    onEndTransition() {}

    // redraw() {
    //   if(this.drawableData) {
    //     this.dataChanged(this.drawableData);
    //   }
    // }


    /* 
     * `render` the rendering logic: predraw => shape => draw => postDraw
     * if drawing is not successfull, `render` function is called again in 50ms, 4 additional time. 
     */
    // render(data, transition) {
    //   if (this.preDraw(data) === false) {
    //     return;
    //   }
      
    //   this.setData(data);

    //   // Note(cg): if width or height is not set (because chart is hidden or in a hidden container, we skip it)
    //   if(!this.width || !this.height) {
    //     return;
    //   }
    //   this._isDrawing = true;
    //   if (transition) {
    //     this.transition = transition;
    //   }
    //   let chart;
    //   try {
    //     // Note(cg): this._shaped is a cached version of shaped data. 
    //     this._shaped = this._shaped || this.shape(this.drawableData);
    //     chart = this.draw(this._shaped);
    //     this._isDrawn = true;
    //   } catch (e) {
    //     // Note(cg): we might have some properties not yet set.
    //     this._error(`draw error, we will try again.`, e);
    //     this._countError = this._countError || 1;
    //     this._countError++;
    //     if (this._countError < 4) {
    //       this._isDrawing = false;
    //       // setTimeout(() => { this.render(); }, 50);
    //     }
    //   }
    //   this.postDraw(chart);
    // }

    // debounceRender() {
    //   if (this.drawableData) {
    //     this.debounce('multi-draw-render', () => {
    //       this.render(this.drawableData);
    //     }, 10);
    //   }
    // }
    /* 
     * `preDraw` do anything that need to be done before we draw. 
     * returning false will cancel the draw process
     */
    // preDraw(chart) {
    //   if (this._isDrawing) {
    //     return false;
    //   }
    // }


    /* 
     * `postDraw` set click/tap/mouseenter/mouseleave event. 
     */
    // postDraw() {
    //   // this._setEventListeners();
    //   this._countError = 1;
    //   this._isDrawing = false;
    // }


    // onMultiRefresh(e) {
    //   e.stopPropagation();
    //   this.debounceRender();
    // }

    /* 
     * `postRemove` is called when the element is disconnected from DOM
     */
    // postRemove(){
    //   this._isDrawing = false;
    //   this._isDrawn = false;
    //   super.postRemove();
    // }

  };
};

/*
 * @mixinFunction
 */
export default Draw ;
