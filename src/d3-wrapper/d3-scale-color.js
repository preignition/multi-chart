import {default as Scale} from './d3-scale.js'
import {DefaultValueMixin } from '@preignition/preignition-mixin';
import {schemeCategory10 } from 'd3-scale-chromatic';

class ColorScale extends DefaultValueMixin(Scale) {

  static get properties() {
    return  {
      
      ...super.properties,

      type: {
        type: String, 
        value: 'ordinal'
      },

      range: {
        type: Array, 
        value: function() {
          return schemeCategory10;
        }
      }
    }

  }
}

export default ColorScale
