import { LitElement, html } from 'lit-element';
import { default as Registerable } from '../helper/multi-registerable-mixin.js';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';

class MultiSerie extends
Registerable(
  DefaultValueMixin(
    DoNotSetUndefinedValue(
      LitElement))) {

  /* 
   * `registerEventDispatch`  the name of the event to be fired when connected. 
   * A container with multi-register-mixin applied 
   * will listen to this event to register the component.
   *
   * @override Registerable
   */
  get registerEventDispatch() {
    return 'multi-serie-register'
  }

  render() {
    return html `
        ${this.path ? this.getPathRender() : ''}
        ${this.keyPath ? this.getKeyPathRender() : ''}
      `;
  }
  getPathRender() {
    return html `
       <multi-accessor 
        @accessor-changed="${ e => {this.accessor = e.detail.value}}"
        path="${this.path}" 
        ></multi-accessor>
    `;
  }
  getKeyPathRender() {
    return html `
       <multi-accessor 
        @accessor-changed="${ e => this.keyAccessor = e.detail.value}"
        path="${this.keyPath}" 
        ></multi-accessor>
    `;
  }


  static get properties() {

    return {

      ...super.properties,

      /* 
       * `key` the key used for this data serie
       */
      key: { type: String },


      /* 
       * `label` a label describing the serie
       */
      label: { type: String },

      /**
       * `path` the path from which the value accessor function is built
       * For instance `+value.count` will create `d => {return +d.value.count}` function.
       */
      path: { type: String , reflect: true},

      subPath: { type: Boolean },

      /* 
       * `accessor` the accessor function for transforming data. 
       */
      accessor: { 
        type: Function
      },

      /**
       * `keyPath` the path from which the key accessor function is built
       * For instance `key` will create `d => {return d.key}` function.
       */
      keyPath: {
        type: String,
        attribute: 'key-path'
      },

      /* 
       * `keyAccessor` the accessor function for accessiong key. 
       * Data will be reshaped as  `[{key: key, label: label, value: data.map(d=>accessor(d))}]
       */
      keyAccessor: {
        type: Function,
        attribute: 'key-accessor'
      },

      /* 
       * `group` name of the group against which this serie is registeredthe serie
       */
      group: { type: String }


    }
  }
}

export default MultiSerie