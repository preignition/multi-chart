import { d3 } from '../prefix.js'
import { default as Axis } from './d3-axis.js'
import { default as Transition } from './d3-transition.js'
import { default as Scale } from './d3-scale.js'
import { default as Legend } from './d3-legend.js'
import { default as ScaleColor } from './d3-scale-color.js'
import { default as Brush } from './d3-brush.js'
import * as shapes from './d3-shape.js'
import {capitalize} from '../helper/utils.js'


customElements.define(`${d3}-axis`, Axis);
customElements.define(`${d3}-transition`, Transition);
customElements.define(`${d3}-scale`, Scale);
customElements.define(`${d3}-legend`, Legend);
customElements.define(`${d3}-brush`, Brush);
customElements.define(`${d3}-scale-color`, ScaleColor);
['pie', 'arc', 'stack', 'line', 'area'].forEach(name => {
  customElements.define(`${d3}-shape-${name}`, shapes[capitalize(name)]);
})