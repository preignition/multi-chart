import { LitElement, html, css } from 'lit-element';

// import 'api-viewer-element';
// import './demo-api-viewer.js';


class DemoContainer extends LitElement {
  static get styles() {
    return css `
      :host {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        margin: 0;
      }

      #main {
        display: flex;
        flex: 1;
        margin: 10px 30px;
        box-sizing: border-box;
      }

      #main > * {
        box-sizing: border-box;
      }
      
      header {
        margin: 20px 30px;
        width: 70vw;
        min-width: 600px;
      }

      #main > div {
        width: 700px;
        margin: auto;
        margin-top: 0;
        min-height: auto;
      }
      
      aside {
        flex: auto;
        margin-left: 20px;
      }

      @media screen and (max-width: 992px) {
        #main {
          display: block;
        }
        aside {
          max-width: initial;  
        }
      }
    `;
  }

  static get properties() {
    return {

    };
  }


  render() {
    return html `
     <header>
        <slot name="header"></slot>
      </header>
      <div id="main">
        <div>
          <slot name="list"></slot>
        </div>
        
        <aside>
          <slot name="aside"></slot>
        </aside>
      </div>
    `;
  }

}

customElements.define('demo-container', DemoContainer);