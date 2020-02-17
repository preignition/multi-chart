import { __decorate } from "tslib";
import { LitElement, html, css, customElement, property } from 'lit-element';
import { ExpansionPanel } from './expansion-panel.js';
/**
 * A custom element implementing the accordion widget: a vertically stacked set of expandable panels
 * that wraps several instances of the `<expansion-panel>` element. Only one panel can be opened
 * (expanded) at a time.
 *
 * Panel headings function as controls that enable users to open (expand) or hide (collapse) their
 * associated sections of content. The user can toggle panels by mouse click, Enter and Space keys.
 *
 * The component supports keyboard navigation and is aligned with the
 * [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).
 *
 * @element fancy-accordion
 *
 * @slot - Slot fot panel elements.
 *
 * @fires opened-index-changed - Event fired when changing currently opened panel.
 */
let FancyAccordion = class FancyAccordion extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Index of the currently opened panel. By default all the panels are closed.
         * Only one panel can be opened at the same time. Setting `null` or `undefined`
         * closes all the accordion panels.
         */
        this.openedIndex = null;
        this._items = [];
        this._boundOnOpened = this._onOpened.bind(this);
    }
    static get styles() {
        return css `
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }

      ::slotted([opened]:not(:first-child)) {
        margin-top: 16px;
      }

      ::slotted([opened]:not(:last-child)) {
        margin-bottom: 16px;
      }

      ::slotted(:not([opened])) {
        position: relative;
      }

      ::slotted(:not([opened]))::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        opacity: 1;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.12);
      }
    `;
    }
    render() {
        return html `
      <slot></slot>
    `;
    }
    firstUpdated() {
        this.addEventListener('keydown', e => this._onKeydown(e));
        Array.from(this.children).forEach(node => {
            if (node instanceof ExpansionPanel) {
                this._items.push(node);
                node.addEventListener('opened-changed', this._boundOnOpened);
            }
        });
    }
    update(props) {
        if (props.has('openedIndex') && this._items) {
            const item = this.openedIndex == null ? null : this._items[this.openedIndex];
            this._items.forEach(el => {
                el.opened = el === item;
            });
        }
        super.update(props);
    }
    get focused() {
        const root = this.getRootNode();
        return root.activeElement;
    }
    _onKeydown(event) {
        const target = event.composedPath()[0];
        if (target.getAttribute('part') !== 'header') {
            return;
        }
        const key = event.key.replace(/^Arrow/, '');
        const currentIdx = this._items.indexOf(this.focused);
        let idx;
        let increment;
        switch (key) {
            case 'Up':
                increment = -1;
                idx = currentIdx - 1;
                break;
            case 'Down':
                increment = 1;
                idx = currentIdx + 1;
                break;
            case 'Home':
                increment = 1;
                idx = 0;
                break;
            case 'End':
                increment = -1;
                idx = this._items.length - 1;
                break;
            default:
        }
        idx = this._getAvailableIndex(idx, increment);
        if (idx >= 0) {
            this._items[idx].focus();
            this._items[idx].setAttribute('focus-ring', '');
            event.preventDefault();
        }
    }
    _getAvailableIndex(index, increment) {
        const total = this._items.length;
        let idx = index;
        for (let i = 0; typeof idx === 'number' && i < total; i++, idx += increment || 1) {
            if (idx < 0) {
                idx = total - 1;
            }
            else if (idx >= total) {
                idx = 0;
            }
            const item = this._items[idx];
            if (!item.disabled) {
                return idx;
            }
        }
        return -1;
    }
    _onOpened(e) {
        const target = e.composedPath()[0];
        const idx = this._items.indexOf(target);
        if (e.detail.value) {
            if (target.disabled || idx === -1) {
                return;
            }
            this.openedIndex = idx;
            this._notifyOpen();
            this._items.forEach(item => {
                if (item !== target && item.opened) {
                    item.opened = false;
                }
            });
        }
        else if (!this._items.some(item => item.opened)) {
            this.openedIndex = undefined;
            this._notifyOpen();
        }
    }
    _notifyOpen() {
        this.dispatchEvent(new CustomEvent('opened-index-changed', {
            detail: {
                value: this.openedIndex
            }
        }));
    }
};
__decorate([
    property({ type: Number, attribute: 'opened-index' })
], FancyAccordion.prototype, "openedIndex", void 0);
FancyAccordion = __decorate([
    customElement('fancy-accordion')
], FancyAccordion);
export { FancyAccordion };
//# sourceMappingURL=fancy-accordion.js.map