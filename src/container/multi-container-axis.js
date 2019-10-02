import { html } from 'lit-element';
import { default as MultiContainer } from './multi-container.js';
import { default as Scale } from '../d3-wrapper/d3-scale.js';
import { default as Axis } from '../d3-wrapper/d3-axis.js';
import { extendProperty } from '../helper/extend-property-mixin.js';
import { valueProperties as axisValueProperties } from './properties/container-axis.js';
import { default as axisProps } from '../drawable/properties/axis.js';


class MultiContainerAxis extends MultiContainer {

  getContentRender() {
    return html `
      ${super.getContentRender()}
      ${this.topHasScale || this.topAxis ? this.getScaleRender('top') : ''}
      ${this.rightHasScale || this.rightAxis ? this.getScaleRender('right') : ''}
      ${this.bottomHasScale || this.bottomAxis ? this.getScaleRender('bottom') : ''}
      ${this.leftHasScale || this.leftAxis ? this.getScaleRender('left') : ''}
      ${this.topAxis ? this.getAxisRender('top') : ''}
      ${this.rightAxis ? this.getAxisRender('right') : ''}
      ${this.bottomAxis ? this.getAxisRender('bottom') : ''}
      ${this.leftAxis ? this.getAxisRender('left') : ''}
    `
  }

  static get properties() {

    return {

      ...super.properties,

      ...extendProperty('top', Axis.properties, Scale.properties, axisProps),
      ...extendProperty('right', Axis.properties, Scale.properties, axisProps),
      ...extendProperty('bottom', Axis.properties, Scale.properties, axisProps),
      ...extendProperty('left', Axis.properties, Scale.properties, axisProps),

      ...axisValueProperties,
    }
  }

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
        @d3-scale-changed="${e => {this[`${type}Scale`] = e.detail.value; this.refresh();}}"></d3-scale>`
  }

  getAxisRender(type) {
    // const tagName = `d3-axis-${type}`;
    return html `
      <multi-axis 
        type="${type}"
        .scale="${this[`${type}Scale`]}" 
        .xText="${this[`${type}XText`]}" 
        .yText="${this[`${type}YText`]}" 
        .text="${this[`${type}Text`]}" 
        .dx="${this[`${type}Dx`]}" 
        .dy="${this[`${type}Dy`]}" 
        .ticks="${this[`${type}Ticks`]}" 
        .tickFormat="${this[`${type}TickFormat`]}" 
        .textAngle="${this[`${type}TextAngle`]}" 
        ></multi-axis>
     `
  }
}

export default MultiContainerAxis