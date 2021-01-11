import { html, fixture, expect } from '@open-wc/testing';

import '../src/helper/index.js';

describe('Test d3-format', () => {
  it('format 1 to 1.0 by default', async () => {
    const el = await fixture(html `
      <d3-format value="1"></d3-format>
    `);

    expect(el.shadowRoot.textContent).to.equal('1.0');
  });

  it('format 1 to 1.00 with a specifier of .2f', async () => {
    const el = await fixture(html `
      <d3-format value="1" specifier=".2f"></d3-format>
    `);

    expect(el.shadowRoot.textContent).to.equal('1.0');
  });

  it('can convert a date', async () => {
    const date = new Date(1568921703426);
    const el = await fixture(html `
      <d3-format .value=${date} is-time specifier="%Y-%m-%d"></d3-format>
    `);
    expect(el.shadowRoot.textContent).to.equal('2019-09-19');

  });

  it('can convert date via attribute', async () => {
    const el = await fixture(html `
      <d3-format value='2019-10-10' is-time specifier="%Y"></d3-format>
    `);
    expect(el.shadowRoot.textContent).to.equal('2019');

  });


});