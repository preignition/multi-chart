import { multi } from '../prefix.js'
import { default as Pie } from './multi-chart-pie.js'
import { default as Line } from './multi-chart-line.js'
import { default as Bubble } from './multi-chart-bubble.js'
import { default as Bar } from './multi-chart-bar.js'

customElements.define(`${multi}-chart-pie`, Pie);
customElements.define(`${multi}-chart-line`, Line);
customElements.define(`${multi}-chart-bubble`, Bubble);
customElements.define(`${multi}-chart-bar`, Bar);
