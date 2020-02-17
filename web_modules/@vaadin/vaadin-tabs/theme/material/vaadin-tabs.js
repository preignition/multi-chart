import '../../../../common/directive-9885f5ff.js';
import '../../../../common/boot-5426e289.js';
import '../../../../@polymer/polymer/lib/utils/mixin.js';
import '../../../../@polymer/polymer/lib/utils/async.js';
import '../../../../@polymer/polymer/lib/utils/debounce.js';
import '../../../../common/lit-html-a0bff75d.js';
import { css } from '../../../../lit-element.js';
import { r as registerStyles } from '../../../../common/vaadin-tabs-eda08c22.js';
import '../../../../tslib.js';

class Material extends HTMLElement {
  static get version() {
    return '1.3.2';
  }
}

customElements.define('vaadin-material-styles', Material);

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="material-color-light">
  <template>
    <style>
      :host,
      #host-fix {
        /* Text colors */
        --material-body-text-color: var(--light-theme-text-color, rgba(0, 0, 0, 0.87));
        --material-secondary-text-color: var(--light-theme-secondary-color, rgba(0, 0, 0, 0.54));
        --material-disabled-text-color: var(--light-theme-disabled-color, rgba(0, 0, 0, 0.38));

        /* Primary colors */
        --material-primary-color: var(--primary-color, #6200ee);
        --material-primary-contrast-color: var(--dark-theme-base-color, #fff);
        --material-primary-text-color: var(--material-primary-color);

        /* Error colors */
        --material-error-color: var(--error-color, #b00020);
        --material-error-text-color: var(--material-error-color);

        /* Background colors */
        --material-background-color: var(--light-theme-background-color, #fff);
        --material-secondary-background-color: var(--light-theme-secondary-background-color, #f5f5f5);
        --material-disabled-color: rgba(0, 0, 0, 0.26);

        /* Divider colors */
        --material-divider-color: rgba(0, 0, 0, 0.12);

        /* Undocumented internal properties (prefixed with three dashes) */

        /* Text field tweaks */
        --_material-text-field-input-line-background-color: initial;
        --_material-text-field-input-line-opacity: initial;
        --_material-text-field-input-line-hover-opacity: initial;
        --_material-text-field-focused-label-opacity: initial;

        /* Button tweaks */
        --_material-button-raised-background-color: initial;
        --_material-button-outline-color: initial;

        /* Grid tweaks */
        --_material-grid-row-hover-background-color: initial;

        /* Split layout tweaks */
        --_material-split-layout-splitter-background-color: initial;

        background-color: var(--material-background-color);
        color: var(--material-body-text-color);
      }

      [theme~="dark"] {
        /* Text colors */
        --material-body-text-color: var(--dark-theme-text-color, rgba(255, 255, 255, 1));
        --material-secondary-text-color: var(--dark-theme-secondary-color, rgba(255, 255, 255, 0.7));
        --material-disabled-text-color: var(--dark-theme-disabled-color, rgba(255, 255, 255, 0.5));

        /* Primary colors */
        --material-primary-color: var(--light-primary-color, #7e3ff2);
        --material-primary-text-color: #b794f6;

        /* Error colors */
        --material-error-color: var(--error-color, #de2839);
        --material-error-text-color: var(--material-error-color);

        /* Background colors */
        --material-background-color: var(--dark-theme-background-color, #303030);
        --material-secondary-background-color: var(--dark-theme-secondary-background-color, #3b3b3b);
        --material-disabled-color: rgba(255, 255, 255, 0.3);

        /* Divider colors */
        --material-divider-color: rgba(255, 255, 255, 0.12);

        /* Undocumented internal properties (prefixed with three dashes) */

        /* Text field tweaks */
        --_material-text-field-input-line-background-color: #fff;
        --_material-text-field-input-line-opacity: 0.7;
        --_material-text-field-input-line-hover-opacity: 1;
        --_material-text-field-focused-label-opacity: 1;

        /* Button tweaks */
        --_material-button-raised-background-color: rgba(255, 255, 255, 0.08);
        --_material-button-outline-color: rgba(255, 255, 255, 0.2);

        /* Grid tweaks */
        --_material-grid-row-hover-background-color: rgba(255, 255, 255, 0.08);
        --_material-grid-row-selected-overlay-opacity: 0.16;

        /* Split layout tweaks */
        --_material-split-layout-splitter-background-color: rgba(255, 255, 255, 0.8);

        background-color: var(--material-background-color);
        color: var(--material-body-text-color);
      }

      a {
        color: inherit;
      }
    </style>
  </template>
</dom-module><dom-module id="material-color-dark">
  <template>
    <style>
      :host,
      #host-fix {
        /* Text colors */
        --material-body-text-color: var(--dark-theme-text-color, rgba(255, 255, 255, 1));
        --material-secondary-text-color: var(--dark-theme-secondary-color, rgba(255, 255, 255, 0.7));
        --material-disabled-text-color: var(--dark-theme-disabled-color, rgba(255, 255, 255, 0.5));

        /* Primary colors */
        --material-primary-color: var(--light-primary-color, #7e3ff2);
        --material-primary-text-color: #b794f6;

        /* Error colors */
        --material-error-color: var(--error-color, #de2839);
        --material-error-text-color: var(--material-error-color);

        /* Background colors */
        --material-background-color: var(--dark-theme-background-color, #303030);
        --material-secondary-background-color: var(--dark-theme-secondary-background-color, #3b3b3b);
        --material-disabled-color: rgba(255, 255, 255, 0.3);

        /* Divider colors */
        --material-divider-color: rgba(255, 255, 255, 0.12);

        /* Undocumented internal properties (prefixed with three dashes) */

        /* Text field tweaks */
        --_material-text-field-input-line-background-color: #fff;
        --_material-text-field-input-line-opacity: 0.7;
        --_material-text-field-input-line-hover-opacity: 1;
        --_material-text-field-focused-label-opacity: 1;

        /* Button tweaks */
        --_material-button-raised-background-color: rgba(255, 255, 255, 0.08);
        --_material-button-outline-color: rgba(255, 255, 255, 0.2);

        /* Grid tweaks */
        --_material-grid-row-hover-background-color: rgba(255, 255, 255, 0.08);
        --_material-grid-row-selected-overlay-opacity: 0.16;

        /* Split layout tweaks */
        --_material-split-layout-splitter-background-color: rgba(255, 255, 255, 0.8);

        background-color: var(--material-background-color);
        color: var(--material-body-text-color);
      }
    </style>
  </template>
</dom-module><custom-style>
  <style>
    :root {
      /* Text colors */
      --material-body-text-color: var(--light-theme-text-color, rgba(0, 0, 0, 0.87));
      --material-secondary-text-color: var(--light-theme-secondary-color, rgba(0, 0, 0, 0.54));
      --material-disabled-text-color: var(--light-theme-disabled-color, rgba(0, 0, 0, 0.38));

      /* Primary colors */
      --material-primary-color: var(--primary-color, #6200ee);
      --material-primary-contrast-color: var(--dark-theme-base-color, #fff);
      --material-primary-text-color: var(--material-primary-color);

      /* Error colors */
      --material-error-color: var(--error-color, #b00020);
      --material-error-text-color: var(--material-error-color);

      /* Background colors */
      --material-background-color: var(--light-theme-background-color, #fff);
      --material-secondary-background-color: var(--light-theme-secondary-background-color, #f5f5f5);
      --material-disabled-color: rgba(0, 0, 0, 0.26);

      /* Divider colors */
      --material-divider-color: rgba(0, 0, 0, 0.12);
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);

/* Import Roboto from Google Fonts */
const $_documentContainer$1 = document.createElement('template');

$_documentContainer$1.innerHTML = `<custom-style>
  <style>
    html {
      /* Font family */
      --material-font-family: 'Roboto', sans-serif;

      /* Font sizes */
      --material-h1-font-size: 6rem;
      --material-h2-font-size: 3.75rem;
      --material-h3-font-size: 3rem;
      --material-h4-font-size: 2.125rem;
      --material-h5-font-size: 1.5rem;
      --material-h6-font-size: 1.25rem;
      --material-body-font-size: 1rem;
      --material-small-font-size: 0.875rem;
      --material-button-font-size: 0.875rem;
      --material-caption-font-size: 0.75rem;

      /* Icon size */
      --material-icon-font-size: 20px;
    }
  </style>
</custom-style><dom-module id="material-typography">
  <template>
    <style>
      body {
        font-family: var(--material-font-family);
        font-size: var(--material-body-font-size);
        line-height: 1.4;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: inherit;
        line-height: 1.1;
        margin-top: 1.5em;
      }

      h1 {
        font-size: var(--material-h3-font-size);
        font-weight: 300;
        letter-spacing: -0.015em;
        margin-bottom: 1em;
        text-indent: -0.07em;
      }

      h2 {
        font-size: var(--material-h4-font-size);
        font-weight: 300;
        letter-spacing: -0.01em;
        margin-bottom: 0.75em;
        text-indent: -0.07em;
      }

      h3 {
        font-size: var(--material-h5-font-size);
        font-weight: 400;
        margin-bottom: 0.75em;
        text-indent: -0.05em;
      }

      h4 {
        font-size: var(--material-h6-font-size);
        font-weight: 400;
        letter-spacing: 0.01em;
        margin-bottom: 0.75em;
        text-indent: -0.05em;
      }

      h5 {
        font-size: var(--material-body-font-size);
        font-weight: 500;
        margin-bottom: 0.5em;
        text-indent: -0.025em;
      }

      h6 {
        font-size: var(--material-small-font-size);
        font-weight: 500;
        letter-spacing: 0.01em;
        margin-bottom: 0.25em;
        text-indent: -0.025em;
      }

      a,
      b,
      strong {
        font-weight: 500;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer$1.content);
if (!window.polymerSkipLoadingFontRoboto) {
  const font = 'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.crossOrigin = 'anonymous';
  link.href = font;
  document.head.appendChild(link);
}

const tabStyles = css `
  :host {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-width: 90px;
    padding: 12px 16px;
    box-sizing: border-box;
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    min-height: 48px;
    line-height: 1.2;
    font-weight: 500;
    color: var(--material-secondary-text-color);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    outline: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: box-shadow 0.3s;
    -webkit-user-select: none;
    user-select: none;
  }

  /* do not prevent click on slotted links */
  :host::before,
  :host::after {
    pointer-events: none;
  }

  :host::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--material-primary-color);
    opacity: 0;
    transition: opacity 0.1s linear;
  }

  :host(:hover)::before {
    opacity: 0.04;
  }

  :host([focus-ring])::before {
    opacity: 0.1;
  }

  :host([selected]) {
    color: var(--material-primary-text-color);
    box-shadow: inset 0 -2px 0 0 var(--material-primary-color);
  }

  :host([orientation='vertical'][selected]) {
    box-shadow: inset 2px 0 0 0 var(--material-primary-color);
  }

  /* Ripple */
  :host::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-color: var(--material-primary-color);
    opacity: 0;
    transition: transform 0s cubic-bezier(0.05, 0.8, 0.5, 1), opacity 0s linear;
  }

  :host([focused]:not([focus-ring]))::after,
  :host([focused][active])::after,
  :host([focus-ring][selected])::after {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
    transition-duration: 2s, 0.6s;
  }

  :host([active]:not([selected]))::after {
    opacity: 0.2;
    transition-duration: 2s, 0s;
  }

  /* Disabled */
  :host([disabled]) {
    pointer-events: none;
    opacity: 1;
    color: var(--material-disabled-text-color);
  }

  :host ::slotted(a) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: -12px -16px;
    padding: 12px 16px;
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  /* Touch device adjustments */
  @media (pointer: coarse) {
    :host(:hover)::before {
      display: none;
    }
  }

  /* Small space between icon and label */
  ::slotted(iron-icon:not(:only-child)) {
    margin-bottom: 8px;
  }
`;

registerStyles('vaadin-tab', tabStyles);

const $_documentContainer$2 = document.createElement('template');

$_documentContainer$2.innerHTML = `<custom-style>
  <style>
    @font-face {
      font-family: 'material-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      --material-icons-arrow-downward: "\\ea01";
      --material-icons-arrow-upward: "\\ea02";
      --material-icons-calendar: "\\ea03";
      --material-icons-check: "\\ea04";
      --material-icons-chevron-left: "\\ea05";
      --material-icons-chevron-right: "\\ea06";
      --material-icons-clear: "\\ea07";
      --material-icons-clock: "\\ea08";
      --material-icons-dropdown: "\\ea09";
      --material-icons-error: "\\ea0a";
      --material-icons-eye-disabled: "\\ea0b";
      --material-icons-eye: "\\ea0c";
      --material-icons-play: "\\ea0d";
      --material-icons-reload: "\\ea0e";
      --material-icons-upload: "\\ea0f";
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer$2.content);

const tabsStyles = css `
  :host {
    -webkit-tap-highlight-color: transparent;
  }

  :host {
    display: flex;
    flex-shrink: 0;
  }

  /* Hide scroll buttons when no needed, and on touch devices */
  :host(:not([overflow])) [part='forward-button'],
  :host(:not([overflow])) [part='back-button'] {
    display: none;
  }

  @media (pointer: coarse) {
    [part='back-button'],
    [part='forward-button'] {
      display: none !important;
    }
  }

  [part='forward-button'],
  [part='back-button'] {
    font-family: material-icons;
    color: var(--material-secondary-text-color);
    font-size: 24px;
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 100%;
    transition: 0.2s opacity;
    top: 0;
  }

  [part='forward-button']:hover,
  [part='back-button']:hover {
    color: inherit;
  }

  [part='forward-button'] {
    right: 0;
  }

  [part='forward-button']::after {
    content: var(--material-icons-chevron-right);
  }

  [part='back-button']::after {
    content: var(--material-icons-chevron-left);
  }

  :host([overflow]) [part='tabs']::after {
    content: '';
    display: flex;
    flex-shrink: 0;
    width: 32px;
  }

  /* Fixed width tabs */
  :host([theme~='fixed']) [part='tabs'] ::slotted(vaadin-tab) {
    flex-basis: 0.0001px;
  }
`;

registerStyles('vaadin-tabs', tabsStyles);
