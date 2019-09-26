import './multi-accessor.js';
import { MultiRegisterable } from './multi-registerable-mixin.js';

/**
 * ## MultiSerie
 *
 * `<multi-serie>` a helper to transform data so that it is easier to draw.

 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @demo
 * @appliesMixin MultiChart.mixin.MultiRegisterable
 **/
class MultiSerie extends MultiRegisterable(Polymer.Element) {
  static get template() {
    return Polymer.html`
    <template is="dom-if" if="[[path]]">
      <multi-accessor path="[[path]]" accessor="{{accessor}}" sub-path="[[subPath]]"></multi-accessor>
    </template>
    <template is="dom-if" if="[[keyPath]]">
      <multi-accessor path="[[keyPath]]" accessor="{{keyAccessor}}"></multi-accessor>
    </template>
`;
  }

  static get is() { return 'multi-serie'; }

  static get properties() {
    return {
      /* 
       * `key` the key used for this data serie
       */
      key: {
        type: String
      },


      /* 
       * `label` a label describing the serie
       */
      label: {
        type: String
      },

      /**
       * `path` the path from which the value accessor function is built
       * For instance `+value.count` will create `d => {return +d.value.count}` function.
       */
      path: {
        type: String
      },

      subPath: {
        type: Boolean
      },

      /* 
       * `accessor` the accessor function for transforming data. 
       */
      accessor: {
        type: Function,
      },

      /**
       * `keyPath` the path from which the key accessor function is built
       * For instance `key` will create `d => {return d.key}` function.
       */
      keyPath: {
        type: String
      },

      /* 
       * `keyAccessor` the accessor function for accessiong key. 
       * Data will be reshaped as  `[{key: key, label: label, value: data.map(d=>accessor(d))}]
       */
      keyAccessor: {
        type: Function,
      },

      /* 
       * `fireEventName`  the name of the event to be used for registering
       * @override `multi-registerable-mixin`
       */
      fireEventName: {
        type: String,
        value: 'multi-serie-register'
      },

      /* 
       * `serieName` name of the serie
       */
      serieName: {
        type: String
      },

      /* 
       * `continuous` true to set continuous domain for this serie 
       */
       continuous : {
         type:  Boolean,
         },
    };
  }
}

customElements.define(MultiSerie.is, MultiSerie);

if (!window.MultiChart) {}

export { MultiSerie };
