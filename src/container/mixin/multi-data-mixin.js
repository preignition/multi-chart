  import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import * as accessor from '../../helper/accessor.js';
import { extendProperty } from '../../helper/extend-property-mixin.js';
import { extent, range } from 'd3-array';


/**
 * ##  MultiData
 * 
 * Mixin for reacting to dataChange. User by multi-container-layer and multi-container-svg
 * 
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
const MultiData = superClass => {

  return class extends superClass {

    static get properties() {

      return {

        ...super.properties,


        /* 
         * `data` to display the chart
         */
        data: {
          type: Array
        },

        /* 
         * `transition` to apply while drawing
         */
        transition: {
          type: Function
        }
      };
    }



    constructor() {
      super();

      this._serieGroup = {} // Note(cg): we will map the serie group by name.

      this.addEventListener('multi-serie-register', this._onMultiSerieRegister);
      this.addEventListener('multi-data-group-register', this._onMultiSerieGroupRegister);
      this.addEventListener('d3-shape-changed', this._onShapeChanged);


    }

    _onShapeChanged(e) {
      const serieGroup = this._serieGroup[e.detail.group];
      if (serieGroup) {
        serieGroup.shaper = e.detail.value;
      }
    }
    
    _onMultiSerieGroupRegister(e) {
      e.stopPropagation();
      const serieGroup = e.composedPath()[0];
      const group = serieGroup.group;

      if (!group) {
        throw new Error(`serieGroup must have a group`)
      }
      if (this._serieGroup[group]) {
        throw new Error(`serieGroup with group name ${group } has already been registered. Choose another group name.`)
      }
      
      if (!this[`_series.${group}`]) {
        this[`_series.${group}`] = []
      }
      if (!this[`_registeredItems.${group}`]) {
        this[`_registeredItems.${group}`] = []
      }
      serieGroup.series = this[`_series.${group}`];
      serieGroup._registeredItems = this[`_registeredItems.${group}`];
      this._serieGroup[group] = serieGroup;

    }

    _onMultiSerieRegister(e) {
      e.stopPropagation();
      const group = e.detail || 'default'
      this._registerItem(`_series.${group}`, e.composedPath()[0]);
    }

    /**
     * `register-item` event callback. Register all item, in contrast
     * with the original function. 
     * @override MultiRegisterMixin because of multi-data-group
     * @param  {Event} e 
     * @return {[type]}   [description]
     */
    _onMultiRegister(e) {
      // Note(cg): only react if groupName is not set or is the same.
      const group = e.detail || 'default';
      // Note(cg): make sure we are not self-registering 
      // (this can be the case for elements that are registerable and also register like multi-container-layer).
      const target = e.composedPath()[0];
      if (target !== this) {
        e.stopPropagation();
        this._registerItem(`_registeredItems.${group}`, target);
        if(this._serieGroup[group]) {
          this._serieGroup[group].onRegister(target);
        } 
      }
    }

    // Note(cg): loop through _serieGroup.
    get registeredItems() {
      return (Object.keys(this._serieGroup || {}).map(k => this._serieGroup[k]._registeredItems)).flat();
    }

    unregister(registered) {
      const group = registered.group;

      if(group) {
        if(this[`_series.${group}`]) {
          this[`_series.${group}`] = this[`_series.${group}`].filter((s => s !== registered));
        }
        if(this[`_registeredItems.${group}`]) {
          this[`_registeredItems.${group}`] = this[`_registeredItems.${group}`].filter((s => s !== registered));
        }
      }
      super.unregister && super.unregister(registered);
    }

   /* 
     * `dataChanged` might be called by parents to reset the entied chart. 
     * For instance, this is called by multi-verse, once a new filter is applied 
     * and data to display have changed.
     */
    dataChanged() {
      this._processDataChanged();
    }

    _processDataChanged() {
      Object.keys(this._serieGroup || {}).forEach(k => {
        this._serieGroup[k]._processDataChanged();
      })
    }
  };
};

/* 
 * @mixinFunction
 */
export default MultiData;