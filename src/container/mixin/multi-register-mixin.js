/**
 * ## MultiRegister
 * 
 * The responsibility of this mixin is to observe nodes added to `#obseveNodes`. 
 * It adds elements fireing a`multi-register to `_registeredItems` and elements 
 * fireing `multi-serie-register` to `series`.
 * 
 *
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

const MultiRegister = dedupingMixin(superClass => {

  /*
   * @polymer
   * @mixinClass
   */
  class Register extends superClass {

    static get properties() {

      return {

        ...super.properties,

        /* 
         * `registerContainerName` the name of the container set to registered items. This is needed because
         * some items can be registered agains mutiple domain. For instance, multi-g : as an resizable svg item 
         * and against multi-verse.
         */
        registerContainerName: {
          type: String,
          attribute: 'register-container-name',
          value: 'svgHost'
        }

      };
    }

    _registerItem(name, item) {
      if(!this[name]){this[name] = []}
      if (!this[name].includes(item)) {
        this[name].push(item);
        if (this.onRegister) {
          this.onRegister(item, name);
        }
        if (item.afterRegister) {
          item.afterRegister(this, this.registerContainerName);
        }
      }
    }

    _onMultiRegister(e) {
      // Note(cg): only react if groupName is not set or is the same.
      if (!e.detail || e.detail === this.groupName) {
        // Note(cg): make sure we are not self-registering 
        // (this can be the case for elements that are registerable and also register like multi-container-layer).
        const target = e.composedPath()[0];
        if (target !== this) {
          e.stopPropagation();
          this._registerItem('_registeredItems', target);
          // Note(cg): if data is set before items are registered, they are not drawn.
          // this.debouceRefresh();
        }
      }
    }


    unregister(registered) {
      if (this.onUnegister) {
        this.onUnregister(registered);
      }

      if(this._registeredItems && this._registeredItems.filter) {
        this._registeredItems = this._registeredItems.filter(item => item !== registered);
      }

      if (registered.afterUnregister) {
        registered.afterUnregister(this, this.registerContainerName);
      }
    }

    get registeredItems() {
      return this._registeredItems;
    }

    callRegistered(methodName) {
      // we replace `methodName`` with `this host` as the first argument 
      [].splice.call(arguments, 0, 1);
      const args = arguments;
      
      this.registeredItems
        .filter(el => {
          return el[methodName];
        })
        // Note(cg): we make sure that some registered elements (for instance `multi-select`) are called later.
        .sort((a, b) => {
          return a.registerOrder - b.registerOrder;
        })
        .forEach(el => {
          el[methodName].apply(el, args);
        });
    }

  }
  return Register;
});

/*
 * @mixinClass
 */
export default MultiRegister;