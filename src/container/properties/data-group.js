import * as accessor from '../../helper/accessor.js';

const props = {

  /*
   * `valueAccessor` accessor function for value (y)
   */
  valueAccessor: {
    type: Function
  },

  /*
   * `keyAccessor` accessor function for key (x)
   */
  keyAccessor: {
    type: Function
  },

  /*
   * `valuePosition` position of value axis and scale (x)
   */
  valuePosition: {
    type: String,
    notify: true,
    attribute: 'value-position'
  },

  /*
   * `keyPosition` position of key axis and scale (x)
   */
  keyPosition: {
    type: String,
    notify: true,
    attribute: 'key-position'
  },

  /*
   * `stacked` true when data is stacked
   */
  stacked: { type: Boolean },

  /*
   * `min` minimum value to apply to domain
   */
  min: { type: Number },

  /*
   * `max` minimum value to apply to domain
   */
  max: { type: Number },

  /*
   * `continuous` true to set continuous ordinal domain for this group
   * For instance, time series are continusou
   */
  continuous: { type: Boolean },

  /*
   * `adjustOrdinalDomain` a function to re-adjust  ordinal domain
   * for instance when time axis is too small
   */
  adjustOrdinalDomain: {
    type: Function,
    attribute: 'adjust-ordinal-domain',
    value: () => (domain) => domain
   },

   /*
    * `ordinalScaleInterval` interval for the ordinal scale. 
    * This is usefull when we have a timescale and set the interval as
    * time.timeDay 
    */
   ordinalScaleInterval: {
     attribute: 'ordinal-scale-interval',
     type: Object,
   },
};

// Note(cg): setting default values for some properties .
const values = {
  valuePosition: 'left',
  keyPosition: 'bottom',
  valueAccessor: () => accessor.value,
  keyAccessor: () => accessor.key,
};

const valueProperties = Object.assign({}, props);
Object.keys(values).forEach(k => valueProperties[k].value = values[k]);

export default props;
export { valueProperties };
