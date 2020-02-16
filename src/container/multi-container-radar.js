import { html } from 'lit-element';
import { default as MultiContainer } from './multi-container.js';
import { default as ScaleRender } from './mixin/scale-render-mixin.js';
import { default as Axes } from '../drawable/multi-radar-axes.js';
import { RelayTo} from '@preignition/preignition-mixin';

// import { default as Scale } from '../d3-wrapper/d3-scale.js';
// import { default as Axis } from '../d3-wrapper/d3-axis.js';
// import { extendProperty } from '../helper/extend-property-mixin.js';
// import { valueProperties as axisValueProperties } from './properties/container-axis.js';
// import { default as axisProps } from '../drawable/properties/axis.js';


/**
 * ## MultiContainerRadat
 *
 * A container for radar chart. It is responsible for drawing axes.
 *
 * @element multi-container-radar
 *
 * @prop {Array} axes - array of axis for radar chart. Example {label: 'label', key: 'key', max: max, class: 'class', xOffset, offset, yOffset: offset}
 */
class MultiContainerRadar extends 
  RelayTo(
    ScaleRender(
      MultiContainer)) {

  getContentRender() {
    return html `
      ${super.getContentRender && super.getContentRender()}
      ${this.getAxisRender()}
      ${this.getScaleRender('radial')}
    `;
  }

  static get properties() {

    return {

      ...super.properties,

      ...Axes.properties,

      /*
       * `min` minumum value
       * we need to set it, otherwise will be inferred  frmo data
       */
      min: {
        type: Number,
        value: 0
      },

      /*
       * `valuePosition` position type for values.
       * this is used to calculate scale vor values in `multi-data-group`
       */
      valuePosition: {
        type: String,
        attribute: 'value-position',
        notify: true,
        value: 'radial'
      },
      
      /*
       * `keyPosition` position type for keys.
       * this is used to calculate scale vor values in `multi-data-group`
       */
      keyPosition: {
        type: String,
        attribute: 'key-position',
        notify: true,
        value: 'angle'
      },


    };
  }

  update(props) {
    super.update(props);
    this.relayTo(props, 'radar-axes');
  }
  // Note(cg): only relay properties (to multi-radar-axis) if they are 
  // part of multi-radar-axis properties.
  shallRelayTo(key, name) {
    this.log && console.info(`relaying ${key} to ${name}`)
    return (key in Axes.properties) && name === 'radar-axes';
  }

  getAxisRender() {
    return html `
      <multi-radar-axes id="radar-axes"></multi-radar-axes>
     `;
  }
}

export default MultiContainerRadar;
