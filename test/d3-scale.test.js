import { html, fixture, expect } from '@open-wc/testing';

import '../src/d3-wrapper/component-index.js';

describe('Test d3-scale', () => {
  it('has a default scale of type linear', async () => {
    const el = await fixture(html`
      <d3-scale></d3-scale>
    `);

    expect(typeof el.scale).to.equal('function');
    expect(el.type).to.equal('linear');
    expect(el.family).to.equal('continuous');
    expect(el.scale.domain()[1]).to.equal(1);
    expect(el.scale.range()[1]).to.equal(1);
  });

  it('can be passed a domain via attribute', async () => {
    const el = await fixture(html`
      <d3-scale domain="[0,2]"></d3-scale>
    `);
    expect(el.domain[1]).to.equal(2);
    expect(el.scale.domain()[1]).to.equal(2);
  });


});
