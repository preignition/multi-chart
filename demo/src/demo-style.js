import { css } from 'lit-element';

export default [
  css `
       :host {
          display: block;
        }

        code {
          font-size: smaller;
          line-height: 10px;
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

        .nav { 
          margin-bottom: 20px; 
        }
        
        .footer { 
          text-align: center; color: #a8a8a8;
        }

       demo-api-viewer {
         margin: auto;
         --ave-primary-color: var(--primary-color);
         --ave-link-color: var(--primary-color);
         --ave-accent-color: var(--accent-color);
       } 
           
      demo-api-viewer::part(docs-description) {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;  /* OS X subpixel AA bleed bug */
      }
/* [paper-font=display2] */
h1 {
  font-size: 45px;
  font-weight: 400;
  letter-spacing: -.018em;
  line-height: 48px;
}

/* [paper-font=display1] */
h2 {
  font-size: 34px;
  font-weight: 400;
  letter-spacing: -.01em;
  line-height: 40px;
}

/* [paper-font=headline] */
h3 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -.012em;
  line-height: 32px;
}

/* [paper-font=subhead] */
h4 {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

/* [paper-font=body2] */
h5, h6 {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
      
      `
];
