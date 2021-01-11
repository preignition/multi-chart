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
        },

        /*
         * `subGroup` needed when we want to register child element under a separate group,
         * needed for instance for  multi-container-layer
         */
        subGroup: {
          type: String,
          attribute: 'sub-group'
        },

      };
    }

    /* 
     * `registerEventListen` the name of the event that will trigger 
     * a registration. This event is fired by an element applying 
     * Resiterable Mixin
     *
     */
    get registerEventListen() {
      return 'multi-register'
    }

    /* 
     * `unregisterEventListen` the name of the event that will trigger 
     * a unregistration.
     *
     */
    // get unregisterEventListen() {
    //   return 'multi-unregister'
    // }

    constructor() {
      super();
      this.addEventListener(this.registerEventListen, this._onMultiRegister);
    }

    _registerItem(name, item) {
      if (!this[name]) { this[name] = []; }
      // Note(cg): we remove all elements that have been removed from the dom.
      // we need to have a non mutable fitler
      for (let i = this[name].length - 1; i > -1; i--) {
        if (!this[name][i].isConnected) {this[name].splice(i, 1);}
      }

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
      this.log && console.info('Register', e, e.composedPath()[0]);
      // Note(cg): only react if group is not set or is the same.
      // 
      // Note(cg): multi-container-layer can register sub-groups.
      const group = this.subGroup || this.group;
      if (e.detail === group) {
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

    // _onMultiUnregister(e) {
    //   this.log && console.info('Unregister', e, e.composedPath()[0]);
    // }


    unregister(registered) {
      if (this.onUnegister) {
        this.onUnregister(registered);
      }

      if (this._registeredItems && this._registeredItems.filter) {
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

      (this.registeredItems || [])
        .filter(el => {
          return el.isConnected && el[methodName];
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