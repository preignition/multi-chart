import { LitElement, html, css } from 'lit-element';

// import '/web_modules/@preignition/multi-chart.js';
// import '@preignition/multi-chart';

// import '/web_modules/@polymer/paper-card.js';
// Note(cg): meterial still depends on polymer.
// import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs.js';
import '@vaadin/vaadin-tabs';
import 'api-viewer-element';
import { Router } from '@vaadin/router';

import { github } from '../assets/github.js';
import { preignition } from '../assets/preignition.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

/**
 * This component combines all the examples to be displayed. See the basic/intermediate/advanced folders for the actual examples.
 */

class OpenWcDemo extends LitElement {
  static get styles() {
    return [
      css `
        :host {
          display: block;
          margin: 20px;
          color: var(--primary-text-color);
        }

        h2 {
          font-size: 20px;
          color: var(--primary-color);
        }

        h1 {
          align-self: center;
          margin: 0;
          color: var(--primary-color);
          font-size: 60px;
          font-weight: 400;
          letter-spacing: -.018em;
          line-height: 55px;

          
        }

        #header {
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:visited {
          color: #217FF9;
        }

        #header h1 { 
          flex: 1; 
          padding-left: 50px;
        }

        .github {
          transform: scale(1.2, 1.2);
          align-self: center;
        }
        
        .nav { margin-bottom: 20px; }
        .footer { text-align: center; color: #a8a8a8;}
      `,
    ];
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.activeTab = location.pathname === '/' ? 'helper' : location.pathname.replace('/', '');
    this.tabs = ['helper', 'container', 'charts', 'advanced'];

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      { path: '/', component: 'helper-demos' },
      { path: '/charts', component: 'charts-demos' },
      { path: '/helper', component: 'helper-demos' },
      { path: '/container', component: 'container-demos' },
      { path: '/advanced', component: 'advanced-demos' },
      {
        path: '(.*)',
        redirect: '/',
        action: () => {
          this.activeTab = 'helper';
        }
      }
    ]);
  }

  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`);
  }

  render() {
    return html `
      <div id="header">
        <span class="logo"><a href="https://preignition.org">${preignition}</a></span>
        <h1>Multi chart - ${this.capitalize(this.activeTab)} API and demos</h1>
        <a class="github" href="https://www.github.com/preignition/multi-chart" target="_blank">${github}</a>
      </div>

      <vaadin-tabs class="${this.smallScreen ? 'nav' : ''}" orientation="${this.smallScreen ? 'vertical' : 'horizontal'}" selected=${this.tabs.indexOf(this.activeTab)} theme="${this.smallScreen ? '' : 'centered'}">
        <vaadin-tab @click=${() => this.switchRoute('charts')}>Charts</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('container')}>Container</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('helper')}>Helper</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('advanced')}>Advanced</vaadin-tab>
      </vaadin-tabs>

      <div id="outlet">
      </div>
      <p class="footer">Made with love by <a target="_blank" href="https://preignition.org/">preignition</a>, with the help of <a target="_blank" href="https://github.com/web-padawan/api-viewer-element">api-viewer-element</a> and <a target="_blank" href="https://github.com/runem/web-component-analyzer">web-component-analyzer</a></p>
    `;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

customElements.define('multi-chart-demo', OpenWcDemo);