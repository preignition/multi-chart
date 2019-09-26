import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { extent, range, max } from 'd3-array';
import { LitElement, html } from 'lit-element';
import * as accessor from '../helper/accessor.js';
import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { default as Register } from './mixin/multi-register-mixin.js';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { LitNotify } from '@morbidick/lit-element-notify';
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
   * `registerEventName`  the name of the event to be fired when connected. 
   * A container with multi-register-mixin applied 
   * will listen to this event to register the component.
   *
   * @override Registerable
   */
  get registerEventName() {
    return 'multi-data-group-register'
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
      },

    }
  }

  updated(props) {
    super.updated(props);
    if (props.has('data') || props.has('series')) {
      this._debouceDataChanged();
    }
    if (props.has('min') || props.has('max')) {
      this.setHostDomain(this.valuePosition, [...this.getDomainMinMax()]);
    }
    if(props.has('stacked')) {
      this._handleStackedChanged()
    }
  }

  _debouceDataChanged() {
    this._debounceDataChanged = Debouncer.debounce(
      this._debounceDataChanged, // initially undefined
      timeOut.after(10),
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
      throw new Error(`group name has to be set for multi-data-group. `)
    }
    if (Array.isArray(this.data) && this.data.length) {

      if (this.processType) {
        return this._processByType(this.processType)
      }

      if (this.series && this.series.length) {
        return this._processSeries()
      }

      this._multiData = this.data;
      this._callDataChanged(this._multiData);
    }

  }



  _processByType(processType) {

    if (processType === 'stack') {

      let keyAccessor = this.keyAccessor;

      // Note(cg): series and shaper stack data.
      // 
      let tmpMax = -Infinity;
      const _multiData = this.shaper(this.data).map((data, i) => {
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
      this._max = tmpMax;
      this._stackedMax = max(_multiData[this.data.length], d => d[1])

      // this.setHostDomain(this.keyPosition, this.getOrdinalDomain(this.data, keyAccessor, serie.accessor, serie.continuous););
      this.setHostDomain(this.keyPosition, this.getOrdinalDomain(this.data, this.keyAccessor, this.accessor, this.continuous));
      this.setHostDomain(this.valuePosition, [0, this.stacked ? this._stackedMax : this._max]);
      
      const valueScale = this.getHostValue(`${this.valuePosition}Scale`);
      const keyScale = this.getHostValue(`${this.keyPosition}Scale`);

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

      this._multiData = _multiData;
      this._callDataChanged(this._multiData);
      return;

    }
    throw new Error(`Trying to process data throught an unknown type (${processType})`)
  }

  _processSeries() {
    // Note(cg): we transform serie data differently for charts that expect stacked data or not.
    let keyAccessor = this.keyAccessor;

    // Note(cg): series, no stack.

    const valueDomain = [Infinity, -Infinity];
    const _multiData = this.series.map(serie => {
      const data = this.data.map((d, i) => {
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
    const ordinalDomain = this.getOrdinalDomain(this.data, keyAccessor);
    // const cfg = this.serieConfig[name];
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


    this._multiData = _multiData;
    this._callDataChanged(this._multiData);
  }

  getDomainMinMax(domain) {
    const host = this.getRootNode().host; // Note(cg): this will be chart container.
    const position = this.valuePosition;
    domain = domain || host[`${position}Domain`];

    const { min, max } = this
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
    if (item.dataProcessType) {
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
    if (this.shallNotify(this._multiData)) {
      this.callRegistered('dataChanged', this._multiData, this.transition);
    }
  }

  getOrdinalDomain(data, keyAccessor, valueAccessor, continuous) {
    // Note(cg): for continuous scales (e.g. timeseries), domain is [min, max].
    let map = [];
    if (keyAccessor) {
      data.forEach((d, i) => {
        d.__key__ = keyAccessor(d, i);
        if (valueAccessor) {
          d.__value__ = valueAccessor(d, i);
        }
        map.push(d.__key__);
      });
    } else {
      map = range(data.length);

    }
    if (continuous) {
      map = [map[0], map[map.length - 1]];
    }
    return map;
  }
}

export default MultiSerieGroup