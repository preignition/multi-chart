/**
 * ## MultiChartBase
 *
 * `<multi-chart-base>` base class for multi-chart other elements
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.Logger
 * @appliesMixin MultiChart.mixin.PolymerExtends
 * @demo
 **/


// import { Logger } from './helper/logger-mixin.js';
import { LitElement } from 'lit-element';
import { SelectMixin, DefaultValueMixin, DoNotSetUndefinedValue, LitNotify } from '@preignition/preignition-mixin';
// import { LitNotify } from '@morbidick/lit-element-notify';


const deep = (action, obj, keys, id, key) => {
  keys = keys.split('.');
  id = keys.splice(-1, 1);
  for (key in keys) obj = obj[keys[key]] = obj[keys[key]] || {};
  return action(obj, id);
}

const get = (obj, prop) => obj[prop];
const set = n => (obj, prop) => (obj[prop] = n);

export class Base extends
DefaultValueMixin(
  SelectMixin(
    DoNotSetUndefinedValue(
      LitElement))) {

  dispatch(name) {
    this.dispatchEvent(new CustomEvent(`${name}-changed`, {
      detail: {
        value: this[name]
      },
      bubbles: true,
      composed: true
    }));
  }

  get(path) {
    return deep(get, this, path);
  }

  set(path, value) {
    return deep(set(value), this, path);
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `log`  true to show log
       */
      log: {
        type: Boolean,
      },
    }
  }

}

// export class MultiSync extends LitSync(Base) {}
// export class MultiNotifySync extends LitSync(LitNotify(Base)) {}
export class MultiNotify extends LitNotify(Base) {}
export class MultiChartBase extends MultiNotify {}
