import { LitElement } from 'lit-element';
// import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
/**
 * ## MultiAccessor
 *
 * `<multi-accessor>` creates an accessor function from a String path
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 **/
class MultiAccessor extends
  DoNotSetUndefinedValue(LitElement) {

  static get properties() {
    return {
      /**
       * `accessor` the accessor function 
       * example function : `d => {return +d.count}`
       */
      accessor: {
        type: Function
      },

      /**
       * `path` the path from which tha accessor function is built
       * For instance `+count` will create `d => {return +d.count}` function.
       */
      path: {
        type: String
      },

      subPath: {
        type: Boolean,
        attribute: 'sub-path'
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Note(cg): we need to make sure accessor is initiated soon enough.
    // Otherwise call to series.accessor fail in multi-data.
    // we cannot process this in constructor because  attribute and values have 
    // not yet been assigned.
    if (this.path) {
      this._observePath(this.path, this.subPath);
    }
  }

  update(props) {
    super.update(props);
    if (props.has('path') || props.has('subPath')) {
      this._observePath(this.path, this.subPath);
    }
  }

  _observePath(path, subPath) {
    if (path && (!this.accessor || ( this.accessor && this.accessor._signature !== `${path}${subPath}`))) {
      let isAdd = path.substring(0, 1) === '+';
      let p = isAdd ? path.substring(1) : path;
      p = p.split('.').join("']['");
      let fn;
      if (subPath) {
        fn = new Function('d', 'k', isAdd ? `return +d['${p}'][k]` : `return d['${p}'][k]`);
      } else {
        fn = new Function('d', isAdd ? `return +d['${p}']` : `return d['${p}']`);
      }
      this.accessor = fn;
      this.accessor._signature = `${path}${subPath}`;
      this.dispatchEvent(new CustomEvent('accessor-changed', { detail: { value: this.accessor }, bubbles: true, composed: true }));

    }
  }
}

export default MultiAccessor;