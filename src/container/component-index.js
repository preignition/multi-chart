import { multi } from '../prefix.js'
import { default as Container } from './multi-container.js'
import { default as Layer } from './multi-container-layer.js'
import { default as DataGroup } from './multi-data-group.js'

customElements.define(`${multi}-container`, Container);
customElements.define(`${multi}-container-layer`, Layer);
customElements.define(`${multi}-data-group`, DataGroup);
