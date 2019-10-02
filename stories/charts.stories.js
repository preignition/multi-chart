import readme from '../src/chart/multi-chart-pie-readme.md';
import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import {multipleRnd}  from './story-utils.js';

const keys =  [{key: 'ananas'}, {key: 'banana'}, {key: 'apple'}, {key: 'orange'}];
const d1 = multipleRnd(keys.map(k => k.key), 50);
const d2 = multipleRnd(keys.map(k => k.key), 50);

import { default as Pie } from '../src/chart/multi-chart-pie.js';
import {default as data } from './data.js';
import '../index.js';

const colorScale = scaleOrdinal().range(schemeCategory10);
const innerRadius = 30;
const padAngle = 0.07;


let  selected = '';

storiesOf('Demo | Charts', module)
  .addDecorator(withKnobs)
  .add('Pie', () => withClassPropertiesKnobs(Pie, {
    template: html `
      <multi-chart-pie 
        id="chart" 
        value-path="+value.count" 
        .colorScale="${colorScale}"
        .data="${data}">
        <!-- add a legend -->
        <multi-legend .scale="${colorScale}" position="top-right"></multi-legend>
        <!-- make it selectable -->
        <multi-select @selected-changed="${e => selected = e.detail.value}" track-hover></multi-select>
        <h4 slot="header">This is a pie</h4>
        <code slot="footer">selected: ${selected}</code>
        
      </multi-chart-pie>
      `}),{
    // overrides: el => [
    //   key : 'data', 
    // ],

    
    notes: { markdown: readme }
  })
// .add('d3-shape', () => withClassPropertiesKnobs(Pie), { notes: { markdown: readme } })
// .add('multi-axis', () => withClassPropertiesKnobs(MultiAxis, { notes: { markdown: readme } }))