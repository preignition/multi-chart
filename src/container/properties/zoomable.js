export default {
  
  /* 
   * `enableZoom` set true to enable zoom behaviors
   */
  enableZoom: {
    type: Boolean,
    attribute: 'enable-zoom'
  },

  /* 
   * [`extent`] (https://github.com/d3/d3-zoom#zoom_extent) sets the viewport extent to the specified array of points [[x0, y0], [x1, y1]]
   */
  extent: {
    type: Array
  },

  /* 
   * [`scaleExtent`](https://github.com/d3/d3-zoom#zoom_scaleExtent) sets the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor, and returns this zoom behavior.
   */
  scaleExtent: {
    type: Array,
    attribute: 'scale-extent'
  }
};