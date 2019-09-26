import { capitalize } from './utils.js';

/**
 * ## AxisProperty
 * 
 * a mixin for constructing `top`, `left`, `bottom` and `right` properties
 * 
 * @memberof MultiChart.mixin
* @polymer
* @mixinFunction
*/
export const extendProperty = (name, ...props) => {
    const namedProperties = {};
    const properties = Object.assign({}, ...props);
    Object.keys(properties).forEach(k => {
        // Note(cg): properties that need to be exported as named properies (e.g. `bottomElastic`, `rightDomain`) are marked as _multiFactory: true .
        namedProperties[`${name}${capitalize(k)}`] = Object.assign({}, properties[k])
        namedProperties[`${name}${capitalize(k)}`].attribute =  `${name}-${properties[k].attribute || k}`
    });
    return namedProperties
}

const ExtendProperty = (superClass, name, ...props) =>  {

    const namedProperties = extendProperty(name, ...props);
		
/*
* @polymer
* @mixinClass
*/
  class Mixin extends superClass {

    static get properties() {
      return Object.assign(super.properties || {}, namedProperties);
      }
    }

		return Mixin;	  
};

/* 
 * @mixinClass
 */
export default ExtendProperty
