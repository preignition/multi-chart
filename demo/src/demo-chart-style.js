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

        label {
          display: block;
          min-width: 150px;
          padding-right: 10px;
        }

        #chart {
          margin-top: 30px;
          min-height: 350px
        }

      `
];
