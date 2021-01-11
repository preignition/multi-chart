import { html, fixture, expect } from '@open-wc/testing';

import '../src/d3-wrapper/index.js';

import { d1 } from './data.js';


describe('Test d3-shape', () => {

  it('d3-shape-line constructs a line', async () => {

    const x = (d,i) => i;
    const y = d => d.value.count;

    const el = await fixture(html `
      <d3-shape-line .x="${x}" .y="${y}"></d3-shape-line>
    `);
    expect(el.line(d1)).to.equal('M0,22.232718101771475L1,22.817828626729607L2,0.3587187458130692L3,43.74644558397842L4,35.76742059194823L5,29.896491435248194');
  });


});

// describe('Test d3-scale', () => {
//   it('has a default scale of type linear', async () => {
//     const el = await fixture(html`
//       <d3-scale></d3-scale>
//     `);

//     expect(typeof el.scale).to.equal('function');
//     expect(el.type).to.equal('linear');
//     expect(el.family).to.equal('continuous');
//     expect(el.scale.domain()[1]).to.equal(1);
//     expect(el.scale.range()[1]).to.equal(1);
//   });

//   it('can be passed a domain via attribute', async () => {
//     const el = await fixture(html`
//       <d3-scale domain="[0,2]"></d3-scale>
//     `);
//     expect(el.domain[1]).to.equal(2);
//     expect(el.scale.domain()[1]).to.equal(2);
//   });


// });
