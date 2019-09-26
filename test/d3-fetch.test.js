import { html, fixture, expect } from '@open-wc/testing';

import '../src/helper/component-index.js';

describe('Test d3-fetch', () => {
  it('will set loading to true when we load', async () => {
    const el = await fixture(html`
      <d3-fetch url="./demo/data-fetch.json"></d3-fetch>
    `);

    expect(el.loading).to.equal(true);
  });

  // TODO(cg): sync test for retrieving and parsing data .
  
});
