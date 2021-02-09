import { html } from 'lit-element';

/**
 * ##  ScaleRender
 *
 * Mixin for rendering scale, depending on their type
 *
 */
const ScaleRender = superClass => {

  return class extends superClass {

    getScaleRender(type, axis) {
      return html `
     <d3-scale 
        .scaleType="${this[`${type}ScaleType`]}" 
        .range="${this.getRange(type)}" 
        .domain="${this[`${type}Domain`]}" 
        .unknown="${this[`${type}Unknown`]}" 
        .padding="${this[`${type}Padding`]}" 
        .paddingOuter="${this[`${type}PaddingOuter`]}" 
        .paddingInner="${this[`${type}PaddingInner`]}" 
        .align="${this[`${type}Align`]}" 

        @scale-changed="${e => {this[`${type}Scale`] = e.detail.value; this.refresh();}}"></d3-scale>`;
    }

    getRange(type) {
      if (type) {
        return type === 'radial' ? [0, Math.min(this.width || 0, this.height) / 2 * this.scaleFactor] :
          type === 'left' || type === 'right' ? [this.height, 0] : [0, this.width];
      }
      return [0, 1];
    }
  };
};

export default ScaleRender;
