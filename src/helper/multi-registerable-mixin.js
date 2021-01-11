/**
 * ##  Registerable
 * 
 * Allow component to be registerable by containters that will listen to `multi-register` event
 * 
 * ### Events
 * Fired when the component is attached so that container can register it
 *
 * @event multi-register
 * @param {string} the namee of the curret group.
 *
 * @memberof MultiChart.mixin   
 * @polymer
 * @mixinFunction
 */

const Registerable = superClass => {

  return class extends superClass {

    /* 
     * `registerEventDispatch`  the name of the event to be fired when connected. 
     * A container with multi-register-mixin applied 
     * will listen to this event to register the component.
     *
     */
    get registerEventDispatch() {
      return 'multi-register';
    }

    /* 
     * `unregisterEventDispatch`  the name of the event to be fired when disconnected. 
     *
     */
    // get unregisterEventDispatch() {
    //   return 'multi-unregister';
    // }

    // Note(cg): some registerable (in particular multi-data-group) need to register before
    // Othewise, multi-data-mixin_onMultiRegister fail to correctly proceed with onRegister 
    // as seriGroup do not yet exist.
    get registerAtConnected() {
      return false;
    }

    static get properties() {

      return {

        ...super.properties,

        /*
         * `group` against which the drawable object is registered. 
         * A chart can have multiple group (e.g. one displayed against right axis, 
         * the other against the left axis). 
         * Set another group name for objects belonging to alternate chart settings.
         */
        group: {
          type: String,
          value: 'default'
        },

        /*
         * `multiPosition` position used to re-order items when appended by dispatch-svg
         * nodePosition larger than 0 will render on top. 
         */
        multiPosition: {
          type: Number,
          attribute: 'multi-position',
          value: 0
        },
      };
    }

    /* 
     * `registerOrder` - registerable elements are sorted on the basis of this property. 
     */
    get registerOrder() {
      return 0;
    }

    // Note(cg): we fire under first Updated and not connectedCallback so as to make sure nested slots have had time to 
    // be effective. .
    firstUpdated(props) {
      if (!this.registerAtConnected) {
        this.dispatchEvent(new CustomEvent(this.registerEventDispatch, { detail: this.group, bubbles: true, composed: true }));
      }
      super.firstUpdated(props);
    }

    connectedCallback() {
      super.connectedCallback();
      if (this.registerAtConnected || this._registerableWasDisconnected) {
        delete this._registerableWasDisconnected;
        this.dispatchEvent(new CustomEvent(this.registerEventDispatch, { detail: this.group, bubbles: true, composed: true }));
      }
    }

    disconnectedCallback() {
      // Note(cg): this is already detached from DOM. event will not bubble up.
      // fireing on parentNode.host will 
      // if (this.unregisterEventDispatch && this.parentNode && this.parentNode.host) {
      //   this.parentNode.host.dispatchEvent(new CustomEvent(this.unregisterEventDispatch, { detail: this.group, disconnected: this, bubbles: true, composed: true }));
      // }
      this._registerableWasDisconnected = true;
      this.postRemove && this.postRemove();
      super.disconnectedCallback();
    }
  };
};

/* 
 * @mixinFunction
 */
export default Registerable;
