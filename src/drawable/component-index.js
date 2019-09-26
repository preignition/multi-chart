import { multi } from '../prefix.js'
import { default as Axis } from './multi-axis.js'
import { default as DrawablePie } from './multi-drawable-pie.js'
import { default as DrawableLine } from './multi-drawable-line.js'
import { default as DrawableLinePath } from './multi-drawable-line-path.js'
import { default as DrawableBubble } from './multi-drawable-bubble.js'
import { default as DrawableBar } from './multi-drawable-bar.js'

customElements.define(`${multi}-axis`, Axis);
customElements.define(`${multi}-drawable-pie`, DrawablePie);
customElements.define(`${multi}-drawable-line`, DrawableLine);
customElements.define(`${multi}-drawable-line-path`, DrawableLinePath);
customElements.define(`${multi}-drawable-bubble`, DrawableBubble);
customElements.define(`${multi}-drawable-bar`, DrawableBar);
