import readme from '../README.md';
import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { default as D3Scale } from '../src/d3-wrapper/d3-scale.js';
import { Pie, Bar } from '../src/d3-wrapper/d3-shape.js';
import { default as MultiAxis } from '../src/drawable/multi-axis.js';
import '../index.js';

storiesOf('Demo|scale', module)
  .addDecorator(withKnobs)
  .add('d3-scale', () => withClassPropertiesKnobs(D3Scale), { notes: { markdown: readme } })
  .add('d3-shape', () => withClassPropertiesKnobs(Pie), { notes: { markdown: readme } })
  .add('multi-axis', () => withClassPropertiesKnobs(MultiAxis, { notes: { markdown: readme } }))