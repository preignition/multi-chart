/**
 * a mixin for avoiding that undefined attributes or properties values set by parent 
 * are applied to the element
 * @param  {LiElement Class} baseElement 
 * @return {LitElement Class}             
 */

const doNotSetUndefinedValue = (baseElement) => class extends baseElement {

  /**
   * Override LitElement `getPropertyDescriptor` method to avoid undefined values to be set
   */

  static getPropertyDescriptor(name, key, options) {
    return {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },
      set(value) {
        // Note(cg): prevent undefined value to be set.
        if (value === undefined) {
          return;
        }
        const oldValue = this[name];
        this[key] = value;
        this
          .requestUpdateInternal(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
};

const queryShadow = (selector, el) => {
  return el.renderRoot.querySelector(selector);
};

const selectMixin = (superclass) => class extends superclass {
  queryShadow(selector) {
    return queryShadow(selector, this);
  }
};

/**
 * Enables the default option for properties to be applied as initial property values
 *
 * @param {LitElement} baseElement - the LitElement to extend
 */
const defaultValue = (baseElement) => class extends baseElement {

  constructor() {
    super();
    if (this.constructor.properties) {
      const { properties } = this.constructor;
      const propertyNames = Object.keys(properties);
      propertyNames.forEach((propertyName) => {
        if (!this.hasOwnProperty(propertyName) && properties[propertyName].hasOwnProperty('value')) {
          this[propertyName] = properties[propertyName].value instanceof Function ? properties[propertyName].value() : properties[propertyName].value;
        }
      });
    }
  }
};

// import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * RelayTo mixin, used to automatically relay properties to child components
 */

const RelayTo = superClass => {

  return class extends superClass {

    shallRelayTo() {
      this.log && console.warn(`shallPassTo method has to be overriden`);
      return false;

    }

    async relayTo(props, name) {
      if (!this[`__${name}`]) {
        this[`__${name}`] = this.queryShadow(`#${name}`);
        if (!this[`__${name}`]) {
          console.warn(`Failed to get ${name} from shadowDom!`);
          await this.updateComplete;
          return this.relayTo(props, name);
          // throw new Error(`Failed to get ${name} from shadowDom!`)
        }
      }
      props.forEach((value, key) => {
        if (this.shallRelayTo(key, name)) {
          this.log && console.log('Change', key);
          this[`__${name}`][key] = this[key];
        }
      });
    }
  };

};

/**
 * Cache template nodes with an id so that we can call this.$.id
 */

const CacheId = superClass => {

  return class extends superClass {

    constructor() {
      super();
      this.$ = {};
    }

    // Note(cg): stores all ids under this.$
    firstUpdated(props) {
      [...this.renderRoot.querySelectorAll('[id]')].forEach(node => {
        this.$[node.id] = node;
      });
      super.firstUpdated(props);
    }
  };
};

/**
 * Returns the event name for the given property.
 * @param  {string}                       name    property name
 * @param  {PropertyDeclaration} options property declaration
 * @return                                event name to fire
 */
function eventNameForProperty(name, { notify, attribute } = {}) {
    if (notify && typeof notify === 'string') {
        return notify;
    } else if (attribute && typeof attribute === 'string') {
        return `${attribute}-changed`;
    } else {
        return `${name.toLowerCase()}-changed`;
    }
  }
  
  // eslint-disable-next-line valid-jsdoc
  /**
  * Enables the nofity option for properties to fire change notification events
  *
  * @template TBase
  * @param {Constructor<TBase>} baseElement
  */
  const LitNotify = (baseElement) => class NotifyingElement extends baseElement {
    /**
     * check for changed properties with notify option and fire the events
     */
    update(changedProps) {
        super.update(changedProps);
  
        for (const prop of changedProps.keys()) {
            const declaration = this.constructor._classProperties.get(prop);
            if (!declaration || !declaration.notify) continue;
            const type = eventNameForProperty(prop, declaration);
            const value = this[prop];
            this.dispatchEvent(new CustomEvent(type, { detail: { value } }));
        }
    }
  };

export { CacheId, defaultValue as DefaultValueMixin, doNotSetUndefinedValue as DoNotSetUndefinedValue, LitNotify, RelayTo, selectMixin as SelectMixin };
