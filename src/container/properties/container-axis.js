const props = {


  /* 
   * `margin` applied to svg container (not css margin, wich can also be applied as per normal css rules)
   * By default margins are slightly bigger than for simple `multi-container-svg`
   */
  topMargin: { type: Number, attribute: 'top-margin' },
  rightMargin: { type: Number, attribute: 'right-margin' },
  bottomMargin: { type: Number, attribute: 'bottom-margin' },
  leftMargin: { type: Number, attribute: 'left-margin' },

  /* 
   * `topAxis` true to display top axis
   */
  topAxis: {
    type: Boolean,
    attribute: 'top-axis',
    value: false
  },

  /* 
   * `rightAxis` true to display right axis
   */
  rightAxis: {
    type: Boolean,
    attribute: 'right-axis',
    value: false
  },

  /* 
   * `bottomAxis` true to display bottom axis
   */
  bottomAxis: {
    type: Boolean,
    attribute: 'bottom-axis',
    value: false
  },

  /* 
   * `leftAxis` true to display bottom axis
   */
  leftAxis: {
    type: Boolean,
    attribute: 'left-axis',
    value: false
  },


  /* 
   * `topHasScale` true to create top scale
   */
  topHasScale: {
    type: Boolean,
    attribute: 'top-has-scale',
    value: false
  },

  /* 
   * `rightHasScale` true to create right scale
   */
  rightHasScale: {
    type: Boolean,
    attribute: 'right-has-scale',
    value: false
  },
  /* 
   * `bottomHasScale` true to create bottom scale
   */
  bottomHasScale: {
    type: Boolean,
    attribute: 'bottom-has-scale',
    value: false
  },

  /* 
   * `leftHasScale` true to create left scale
   */
  leftHasScale: {
    type: Boolean,
    attribute: 'left-has-scale',
    value: false
  },


  leftTextAngle: {
    type: Number,
    attribute: 'left-axis-angle'
  },

  leftYText: {
    type: Number,
    attribute: 'left-ytext'
  },

  leftDy: {
    type: String,
    attribute: 'left-dy'
  },

  bottomDy: {
    type: String,
    attribute: 'bottom-dy'
  }
}



// Note(cg): setting default values for some properties .
const values = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 20,
  leftMargin: 30,

  leftTextAngle: -90,
  leftYText: 6,
  leftDy: '0.6em',
  bottomDy: '-0.6em'
}

const valueProperties = Object.assign({}, props)
Object.keys(values).forEach(k => valueProperties[k].value = values[k]);

export default props;
export { valueProperties };