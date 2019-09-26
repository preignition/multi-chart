import { LitElement, html } from 'lit-element';
// import { randomUniform } from 'd3-random';

class DemoScale extends LitElement {
  static get properties() {
    return {
      domain: {
        type: Array
      },
      range: {
        type: Array
      },
      value: {
        type: Number
      },
      // scale: {
      //   type: Function,
      //   hasChanged: (value, old) => {
      //     return value !== old || value.domain() !== old.domain() || value.range() !== old.range() || value.clamp() !== old.clamp();
      //   }
      // },

      clamp: {type: Boolean},
      scaledValue: {type: String},

      data: {
        type: Array
      }

    };
  }

  constructor() {
    super();
    this.domain = [0, 1];
    this.range = [0, 2];
    this.value = 0.5;
    this.clamp = true;

    // Note(cg): set data
    // const keys = ['a', 'b', 'c', 'd', 'e', 'f'];
    // const rnd = (keys, max) => {
    //   var r = randomUniform(max);
    //   return keys.map(function(d, i) {
    //     return { key: d, value: { count: r() } };
    //   });
    // }
    // this.data = rnd(keys, 50);
  }

  render() {
    return html `
    <p>Example of setting domain and scales: <code>scaled value = scale(value)</code></p>
       <div>
          <d3-scale type="linear" .domain="${this.domain}" .clamp="${this.clamp}" .range="${this.range}" @d3-scale-changed="${(e) => {console.info('scale changed');this.scaledValue = e.detail.value && e.detail.value(this.value)}}"  ></d3-scale>
          <div>domain: ${JSON.stringify(this.domain)} | range: ${JSON.stringify(this.range)}</div>
          <div>value: ${this.value} | scaled value: ${this.scaledValue}</div>
          <p>
            <label>value</label><input  type="number" .value="${this.value}" @input=${(e) => this.value = e.currentTarget.value}> 
          | <label>domain max</label><input  type="number" .value="${this.domain[1]}" @input=${(e) => {this.domain[1] = (e.currentTarget.value * 1); this.domain = [...this.domain];}}>
          | <label>clamp</label><input name="clamp" type="checkbox" .checked="${this.clamp}" @input=${(e) => {this.clamp = e.currentTarget.checked;}}>  
          </p>
        </div>
    `;
  }
}

customElements.define('demo-scale', DemoScale);