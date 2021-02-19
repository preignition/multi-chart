import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { extent, range, max, min, sort } from 'd3-array';
import * as scale from 'd3-scale';
import { LitElement, html } from 'lit-element';
import * as accessor from '../helper/accessor.js';
import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { default as Register } from './mixin/multi-register-mixin.js';
import { LitNotify, DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { default as dataGroupProps } from './properties/data-group.js';

// Note(cg): yet to do
//
// - [x] remove loops over groupName
// - [x] remove groupName
// - [x] force creation of scale depending on position (top / bottom / ...)
// - [ ] integrate stack
// - [x] properly bind config: it should be easy to set it from multi-container.
//       easyt to set min max
// - [x] remove config object
// - [x] review axis listeners.

// .

class MultiSerieGroup extends
Registerable(
  Register(
    DefaultValueMixin(
      LitNotify(
        DoNotSetUndefinedValue(
          LitElement))))) {

  /*
   * `registerEventDispatch`  the name of the event to be fired when connected.
   * A container with multi-register-mixin applied
   * will listen to this event to register the component.
   *
   * @override Registerable
   */
  get registerEventDispatch() {
    return 'multi-data-group-register';
  }
  
  get registerAtConnected() {
    return true;
  }

  static get properties() {

    return {

      ...super.properties,

      ...dataGroupProps,

      log: { type: Boolean },

      /*
       * `data` to display the chart
       */
      data: { type: Array },

      /*
       * `group` the name of the group. default for default group
       */
      group: { type: String },

      /*
       * `_registeredItems` the list of registerd Items under this group.
       */
      _registeredItems: { type: Array },

      /*
       * `series` the series belonging to this serie group
       * `series` the list of data serie registered for this container.
       * We can eiher pass a serie array like [{key: 'apple', label:'apple'}, accessor: d => +d.value.apple}, {key: 'orange', label:'orange'}, accessor: d => +d.value.orange}], 
       *  or use `<multi-serie>` component to register series via markup
       *
       */
      series: {
        type: Array,
        value: []
      },

      /*
       * `processType`  the type of process type, e.g. stack for bar Chart
       */
      processType: {
        type: String,
        attribute: 'process-type'
      },

      /*
       * `sort` [sort](https://github.com/d3/d3-array/blob/v2.9.1/README.md#sort) function invoked while 
       * processing data
       */
      sort: {
        type: Function,
      },
      /*
       * `preserveSortOrder` set true to preserve sort order in domain once the first ordinal domain
       * has been computed. This is useful with dynamic data, to avoid that chart items are permuted.
       */
      preserveSortOrder: {
        attribute: 'preserve-sort-order',
        type: Boolean,
      }
    };
  }
  
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.dispatchEvent(new CustomEvent(this.registerEventDispatch, { detail: this.group, bubbles: true, composed: true }));
  // }

  updated(props) {
    if (props.has('data') || props.has('series') || props.has('sort')) {
      this._debouceDataChanged();
    }
    if (props.has('min') || props.has('max')) {
      this.setHostDomain(this.valuePosition, [...this.getDomainMinMax()]);
    }
    if (props.has('stacked')) {
      this._handleStackedChanged();
    }
    super.updated(props);
  }

  _debouceDataChanged() {
    this._debounceDataChanged = Debouncer.debounce(
      this._debounceDataChanged, // initially undefined
      timeOut.after(40),
      () => {
        this._processDataChanged();
      });
  }

  // Note(cg): we need to re-set min-max value domain when stacked changes.
  _handleStackedChanged() {
    this.setHostDomain(this.valuePosition, [0, this.stacked ? this._stackedMax : this._max]);
  }

  _processDataChanged() {
    if (!this.group) {
      throw new Error(`group name has to be set for multi-data-group. `);
    }
    if (Array.isArray(this.data) && this.data.length) {

      let multiData;
      let sortedData = this.data;

      // Note(cg): this mutates data.
      if (this.sort) {
        sortedData = sort(this.data, this.sort);
      }

      if (this.processType) {
        multiData = this._processByType(this.processType, sortedData);
      } else if (this.series && this.series.length) {
        multiData = this._processSeries(sortedData);
      }

      // Note(cg): processByType and processSeries returns a new array
      // we need to make sure charts will respond to mutation when
      // no series and no processType (e.g. pie).
      this._multiData = multiData || [...sortedData];
      this._callDataChanged(this._multiData);
    }

  }

  _processByType(processType, sortedData) {

    if (processType === 'stack') {
      const keyAccessor = this.keyAccessor;

        // Note(cg): series and shaper stack data.
        let tmpMax = -Infinity;
        const _multiData = this.shaper(sortedData).map((data, i) => {
          const ret = data.map(([y0, y1], ii) => {
            if ((y1 - y0) > tmpMax) {
              tmpMax = (y1 - y0);
            }
            // return [y0, y1, i, data[ii].data.__key__];
            return [y0, y1, i, keyAccessor(data[ii].data)];
          });
          ret.index = data.index;
          ret.key = data.key;
          return ret;
        });

        // Note(cg): cache domains to re-use when stacked changes eventually.
        this._max = this.max ? this.max : tmpMax;
        this._stackedMax = this.max ? this.max : max(_multiData[_multiData.length - 1], d => d[1]);

      const valueScale = this.getHostValue(`${this.valuePosition}Scale`);
      const keyScale = this.getHostValue(`${this.keyPosition}Scale`);
      const isContinuous = keyScale.category === 'continuous';
      
      if (this.ordinalScaleInterval) {
        keyScale.interval = this.ordinalScaleInterval;
      }

      // Note(cg): we cache ordinaldomain if sort order is preserved.
      const ordinalDomain = this.preserveSortOrder && this._ordinalDomain
        ? this._ordinalDomain
        : this.getOrdinalDomain(sortedData, this.keyAccessor, this.accessor, isContinuous);
      this._ordinalDomain = ordinalDomain;

      this.setHostDomain(this.keyPosition, this.adjustOrdinalDomain(ordinalDomain));
      this.setHostDomain(this.valuePosition, [0, this.stacked ? this._stackedMax : this._max]);

      this.dispatchEvent(new CustomEvent('data-group-rescaled', {
        detail: {
          group: this.group,
          xScale: keyScale,
          yScale: valueScale
          // xAccessor: accessor.key,
          // yAccessor: accessor.value
        },
        bubbles: true,
        composed: true
      }));

      return _multiData;
    }

    if (processType === 'choropleth') {

      const map = new Map();
      const valueAccessor = this.valueAccessor;
      const keyAccessor = this.keyAccessor;
      const valuePosition = this.valuePosition;
      const valueScale = this.getHostValue(`${valuePosition}Scale`);
      
      let min = Infinity;
      let max = -Infinity;

      sortedData.forEach(d => {
        const value = valueAccessor(d);
        map.set(keyAccessor(d), value);
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      });

      const domain = this.getDomainMinMax([min, max]);
      if (valueScale) {
        valueScale.domain(domain);
      }
      this.setValueDomain(domain);

      this.dispatchEvent(new CustomEvent('data-group-rescaled', {
        detail: {
          group: this.group,
          colorScale: valueScale,
          colorDomain: domain,
        },
        bubbles: true,
        composed: true
      }));

      // this._mapProcessed = true;
      this.choroplethMap = map;
      return map;

    }
    throw new Error(`Trying to process data throught an unknown type (${processType})`);
  }

  _processSeries(sortedData) {
    // Note(cg): we transform serie data differently for charts that expect stacked data or not.
    const keyAccessor = this.keyAccessor;

    // Note(cg): series, no stack.

    const valueDomain = [Infinity, -Infinity];
    const _multiData = this.series.map((serie, i) => {
      if (!serie.key) {
        this.log && console.warn('serie is missing a key', serie);
        serie.key = i;
      }
      const data = sortedData.map((d, i) => {
        return {
          key: keyAccessor(d, i),
          value: serie.accessor(d, i)
        };
      });
      const ext = extent(data, d => d.value);
      if (ext[0] < valueDomain[0]) { valueDomain[0] = ext[0]; }
      if (ext[1] > valueDomain[1]) { valueDomain[1] = ext[1]; }
      return { key: serie.key, label: serie.label || serie.key, group: this.group, data: data };
    });
    if (valueDomain[0] === Infinity || valueDomain[1] === -Infinity) {
      throw new Error('problem while computing value domain');
    }
      
    // Note(cg): we cache ordinaldomain if sort order is preserved.
    const ordinalDomain = this.preserveSortOrder && this._ordinalDomain
      ? this._ordinalDomain
      : this.getOrdinalDomain(sortedData, keyAccessor);

    const valuePosition = this.valuePosition;
    const keyPosition = this.keyPosition;
    const valueScale = this.getHostValue(`${valuePosition}Scale`);
    const keyScale = this.getHostValue(`${keyPosition}Scale`);

    // Note(cg): resset domains.
    this.setHostDomain(valuePosition, this.getDomainMinMax(valueDomain));
    this.setHostDomain(keyPosition, ordinalDomain);

    this.dispatchEvent(new CustomEvent('data-group-rescaled', {
      detail: {
        group: this.group,
        xScale: keyScale,
        yScale: valueScale,
        xAccessor: accessor.key,
        yAccessor: accessor.value
      },
      bubbles: true,
      composed: true
    }));

    return _multiData;
  }

  getDomainMinMax(domain) {
    const host = this.getRootNode().host; // Note(cg): this will be chart container.
    const position = this.valuePosition;
    domain = domain || host[`${position}Domain`];

    if (!domain) {
      console.warn('domain not yet instantiated')
      return [];
    }

    const { min, max } = this;
    if (min || min === 0) {
      domain[0] = min;
    }
    if (max || max === 0) {
      domain[1] = max;
    }
    return domain;
  }

  getHostValue(name) {
    return this.getRootNode().host[name];
  }

  setValueDomain(domain) {
    this.setHostDomain(this.valuePosition, domain);
  }

  setHostDomain(position, domain) {
    const host = this.getRootNode().host; // Note(cg): this will be chart container.
    host[`${position}Domain`] = domain;
  }

  // Note(cg): called by container while registering item.
  onRegister(item) {
    if (item.dataProcessType && !this.processType) {
      this.processType = item.dataProcessType;
    }
    if (this._multiData && item.dataChanged) {
      item.dataChanged(this._multiData, this.transition);
    }
  }

  /*
   * `shallNotify` should return true to actually render the component
   */
  shallNotify(data) {
    return !!data;
  }

  _callDataChanged() {
    // XXX(cg): we need to apply dataChanged to registeredItems of the same group
    // as this multi-data-group.
    if (this.shallNotify(this._multiData)) {
      this.callRegistered('dataChanged', this._multiData, this.transition);
    }
  }

  getOrdinalDomain(data, keyAccessor, valueAccessor, continuous) {
    // Note(cg): for continuous scales (e.g. timeseries), domain is [min, max].
    let domain = [];
    if (keyAccessor) {
      data.forEach((d, i) => {
        d.__key__ = keyAccessor(d, i);
        if (valueAccessor) {
          d.__value__ = valueAccessor(d, i);
        }
        if (d.__key__ === Infinity || d.__key__ === -Infinity) {
          // Note(cg): we keep track of the fact that
          // domain key holds Infinity, but remove from domain.
          domain.hasInfinity = true;
        } else {
          domain.push(d.__key__);
        }
      });
    } else {
      domain = range(data.length);

    }
    if (continuous) {
      domain = [domain[0], domain[domain.length - 1]];
    }
    return domain;
  }
}

export default MultiSerieGroup