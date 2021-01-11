import { html, fixture, expect } from '@open-wc/testing';

import '../src/helper/index.js';

describe('Test multi-accessor', () => {
  it('has an accessor function', async () => {
    const el = await fixture(html`
      <multi-accessor path='a'></multi-accessor>
    `);

    expect(typeof el.accessor).to.equal('function');
    
  });

  it('access the correct path', async () => {
    const el = await fixture(html`
      <multi-accessor path='a'></multi-accessor>
    `);

    const f = el.accessor;

    expect(f({a:1})).to.equal(1);
    
  });

  it('access the correct path and converts to numnber', async () => {
    const el = await fixture(html`
      <multi-accessor path='+a'></multi-accessor>
    `);

    const f = el.accessor;

    expect(f({a:'1'})).to.equal(1);
    
  });

  it ('access the correct sub-path', async () => {
    const el = await fixture(html`
      <multi-accessor sub-path path='a'></multi-accessor>
    `);

    const f = el.accessor;

    expect(f({a:[1]}, 0)).to.equal(1);
    
  });

  


});
