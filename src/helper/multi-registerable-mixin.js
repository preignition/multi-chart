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
     * `registerEventName`  the name of the event to be fired when connected. 
     * A container with multi-register-mixin applied 
     * will listen to this event to register the component.
     *
     */
    get registerEventName() {
      return 'multi-register'
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
         * `registerOrder` - registerable elements are sorted on the basis of this property. 
         */
        registerOrder: {
          type: Number,
          value: 0
        }
      };
    }

    // Note(cg): we fire under first Updated and not connectedCallback so as to make sure nested slots have had time to 
    // be effective. .
    firstUpdated(props) {
      super.firstUpdated(props);
      if (!this.registerEventName) {
        throw new Error(`registerable "registerEventName" is missing for ${this.constructor.name}`)
      }
      this.dispatchEvent(new CustomEvent(this.registerEventName, { detail: this.group, bubbles: true, composed: true }));
    }

    // Note(cg): dispatch an event along with its group.
    dispatchEventGroup(eventName, value) {
      this.dispatchEvent(new CustomEvent(eventName, { detail: { value: value, group: this.group }, bubbles: true, composed: true }));
    }

    disconnectedCallback() {
      this.postRemove();
      super.disconnectedCallback();
    }

    postRemove() {

    }


  };
};

/* 
 * @mixinFunction
 */
export default Registerable;