import { __decorate } from "tslib";
import { LitElement, html, css, customElement, property } from 'lit-element';
const normalizeValue = (value, min, max) => {
    let nV;
    if (!value && value !== 0) {
        nV = 0;
    }
    else if (min >= max) {
        nV = 1;
    }
    else {
        nV = (value - min) / (max - min);
        nV = Math.min(Math.max(nV, 0), 1);
    }
    return nV;
};
/**
 * A custom element similar to the HTML5 `<progress>` element.
 *
 * @element progress-bar
 *
 * @cssprop --progress-bar-fill-color - Color of the filled progress bar part.
 * @cssprop --progress-bar-opacity - Opacity set on the underlying track.
 *
 * @csspart bar - A progress bar background.
 * @csspart value - A progress bar foreground.
 */
let ProgressBar = class ProgressBar extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Current progress value.
         */
        this.value = 0.5;
        /**
         * Minimum bound of the progress bar.
         */
        this.min = 0;
        /**
         * Maximum bound of the progress bar.
         */
        this.max = 1;
        /**
         * Indeterminate state of the progress bar.
         * This property takes precedence over other state properties (min, max, value).
         */
        this.indeterminate = false;
    }
    static get styles() {
        return css `
      :host {
        display: block;
        width: 100%;
        height: 4px;
        margin: 8px 0;
        position: relative;
        overflow: hidden;

        --progress-bar-fill-color: #6200ee;
        --progress-bar-opacity: 0.16;
      }

      :host::before {
        content: '';
        display: block;
        height: 100%;
        background-color: var(--progress-bar-fill-color);
        opacity: var(--progress-bar-opacity);
      }

      :host([hidden]) {
        display: none !important;
      }

      [part='bar'] {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        transform: scaleX(var(--progress-value));
        transform-origin: 0 0;
      }

      [part='value'] {
        height: 100%;
        background-color: var(--progress-bar-fill-color);
      }

      :host([indeterminate]) [part='bar'] {
        left: -100%;
        animation: progress-indeterminate-translate 2s infinite linear;
      }

      :host([indeterminate]) [part='value'] {
        animation: progress-indeterminate-scale 2s infinite linear;
      }

      @keyframes progress-indeterminate-translate {
        0% {
          transform: translateX(0);
        }
        20% {
          animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
          transform: translateX(0);
        }
        59.15% {
          animation-timing-function: cubic-bezier(
            0.302435,
            0.381352,
            0.55,
            0.956352
          );
          transform: translateX(83.67142%);
        }
        100% {
          transform: translateX(200.611057%);
        }
      }

      @keyframes progress-indeterminate-scale {
        0% {
          transform: scaleX(0.08);
        }
        36.65% {
          animation-timing-function: cubic-bezier(
            0.334731,
            0.12482,
            0.785844,
            1
          );
          transform: scaleX(0.08);
        }
        69.15% {
          animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
          transform: scaleX(0.661479);
        }
        100% {
          transform: scaleX(0.08);
        }
      }
    `;
    }
    render() {
        return html `
      <div part="bar"><div part="value"></div></div>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'progressbar');
    }
    updated(props) {
        const minChanged = props.has('min');
        if (minChanged) {
            this._minChanged(this.min);
        }
        const maxChanged = props.has('max');
        if (maxChanged) {
            this._maxChanged(this.max);
        }
        const valueChanged = props.has('value');
        if (valueChanged) {
            this._valueChanged(this.value);
        }
        if (valueChanged || minChanged || maxChanged) {
            this._normalizedValueChanged(this.value, this.min, this.max);
        }
    }
    _normalizedValueChanged(value, min, max) {
        const newValue = normalizeValue(value, min, max);
        this.style.setProperty('--progress-value', `${newValue}`);
    }
    _valueChanged(value) {
        this.setAttribute('aria-valuenow', `${value}`);
    }
    _minChanged(min) {
        this.setAttribute('aria-valuemin', `${min}`);
    }
    _maxChanged(max) {
        this.setAttribute('aria-valuemax', `${max}`);
    }
};
__decorate([
    property({ type: Number })
], ProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ProgressBar.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ProgressBar.prototype, "max", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ProgressBar.prototype, "indeterminate", void 0);
ProgressBar = __decorate([
    customElement('progress-bar')
], ProgressBar);
export { ProgressBar };
//# sourceMappingURL=progress-bar.js.map