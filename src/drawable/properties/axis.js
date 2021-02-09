export default {
  /**
   * `text` text for the axis 
   */
  text: { type: String },

  /**
   * `textAngle` rotation angle to be applied to text axis
   */
  textAngle: { type: Number, attribute: 'text-angle' },
  dx: { type: String },
  dy: { type: String },
  x: { type: String },
  y: { type: String },
  xText: { type: String, attribute: 'x-text' },
  yText: { type: String, attribute: 'y-text' },

  /*
   * `decorate`` is a function we can pass to process
   * drawn element once on the dom. This can be used
   * to wrap long labels for instance
   */
  decorate: {type: Function}
};
