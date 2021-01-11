
export { default as RegisterMixin } from './container/mixin/multi-register-mixin.js'
// export { default as ObserverResizeMixin } from './container/mixin/observe-resize-mixin.js'
export { default as RegisterableMixin } from './helper/multi-registerable-mixin.js'
export { default as FormatMixin } from './helper/d3-format-mixin.js'
export { default as DispatchMixin } from './helper/dispatch-svg-mixin.js'
export { default as ExtendPropertyMixin } from './helper/extend-property-mixin.js'

export * from './d3-wrapper/index.js';
export * from './drawable/index.js';
export * from './container/index.js';
export * from './chart/index.js';
export * from './helper/index.js';
export * from './chart/index.js';

export const define = (name, cls) => {
  if (customElements.get(name)) {
    return console.warn(`custom element ${name} has already been registered`);
  }
  customElements.define(name, cls);
};
