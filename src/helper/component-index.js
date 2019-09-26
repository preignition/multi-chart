import { d3, multi } from '../prefix.js'
import { default as Format } from './d3-format.js'
import { default as Fetch } from './d3-fetch.js'
import { default as Accessor } from './multi-accessor.js'
import { default as Serie } from './multi-serie.js'
import { default as Legend } from './multi-legend.js'
import { default as Select } from './multi-select.js'
import { default as Brush } from './multi-brush.js'

customElements.define(`${d3}-format`, Format);
customElements.define(`${d3}-fetch`, Fetch);
customElements.define(`${multi}-accessor`, Accessor);
customElements.define(`${multi}-serie`, Serie);
customElements.define(`${multi}-legend`, Legend);
customElements.define(`${multi}-select`, Select);
customElements.define(`${multi}-brush`, Brush);
