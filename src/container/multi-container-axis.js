import { html } from 'lit-element';
import { default as ScaleRender } from './mixin/scale-render-mixin.js';
import { default as MultiContainer } from './multi-container.js';
import { default as Scale } from '../d3-wrapper/d3-scale.js';
import { default as Axis } from '../d3-wrapper/d3-axis.js';
import { extendProperty } from '../helper/extend-property-mixin.js';
import { valueProperties as axisValueProperties } from './properties/container-axis.js';
import { default as axisProps } from '../drawable/properties/axis.js';


class MultiContainerAxis extends ScaleRender(MultiContainer) {

  getContentRender() {
    return html `
      ${super.getContentRender && super.getContentRender()}
      ${this.topHasScale || this.topAxis ? this.getScaleRender('top') : ''}
      ${this.rightHasScale || this.rightAxis ? this.getScaleRender('right') : ''}
      ${this.bottomHasScale || this.bottomAxis ? this.getScaleRender('bottom') : ''}
      ${this.leftHasScale || this.leftAxis ? this.getScaleRender('left') : ''}
      ${this.topAxis ? this.getAxisRender('top') : ''}
      ${this.rightAxis ? this.getAxisRender('right') : ''}
      ${this.bottomAxis ? this.getAxisRender('bottom') : ''}
      ${this.leftAxis ? this.getAxisRender('left') : ''}
    `;
  }

  static get properties() {

    return {

      ...super.properties,

      ...extendProperty('top', Axis.properties, Scale.properties, axisProps),
      ...extendProperty('right', Axis.properties, Scale.properties, axisProps),
      ...extendProperty('bottom', Axis.properties, Scale.properties, axisProps),
      ...extendProperty('left', Axis.properties, Scale.properties, axisProps),

      ...axisValueProperties,
    };
  }

  getAxis(type) {
    return this.renderRoot.querySelector(`multi-axis[type=${type}]`);
  }

  getAxisRender(type) {
    // const tagName = `d3-axis-${type}`;
    return html `
      <multi-axis 
        type="${type}"
        .decorate="${this[`${type}Decorate`]}"
        .scale="${this[`${type}Scale`]}" 
        .xText="${this[`${type}XText`]}" 
        .yText="${this[`${type}YText`]}" 
        .text="${this[`${type}Text`]}" 
        .dx="${this[`${type}Dx`]}" 
        .dy="${this[`${type}Dy`]}" 
        .textAngle="${this[`${type}TextAngle`]}" 
        .tickSize="${this[`${type}TickSize`]}" 
        .tickPadding="${this[`${type}TickPadding`]}" 
        .ticks="${this[`${type}Ticks`]}" 
        .tickFormat="${this[`${type}TickFormat`]}"         
        .tickArguments="${this[`${type}TickArguments`]}" 
        ></multi-axis>
     `;
  }
}

export default MultiContainerAxis;
