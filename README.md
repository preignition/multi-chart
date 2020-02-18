[![Netlify Status](https://api.netlify.com/api/v1/badges/efc3aa92-e27a-4e95-8331-a1c1332bdffc/deploy-status)](https://app.netlify.com/sites/multi-chart/deploys)

# \<multi-chart\>
Build composable, markup-based, extensible visualizations for the web. 

\<multi-chart\> is a [lit-element](https://github.com/polymer/lit-element)-based library to compose markup-driven and data-driven vizualization layers.

## Motivation
While building vizualisation for the web, it is difficult to find the right balance between low-level vizualization kernel (like d3) that requires a lot of development work, and high-level black box library that are difficult to configure beyond a certain point. 

\<multi-chart\> is a attempt to provide the best of two the worlds: low level extensible webcomponents (often wrapper around d3.js modules like d3-axis) composed together to build complex charts. The library proposes ready-to-use configurable charts, but also the building blocks for accomodating more complex use case. 

This library plays well with [\<multi-geo\>](https://github.com/preignition/multi-geo) (similar library for geo charts like choropleth) and [\<multi-verse\>](https://github.com/preignition/multi-verse), a graphical interactive multi-dimensional analysis tool. Together, they offer a markup-based alternative to tools like [dc.js](https://dc-js.github.io/dc.js/).

## Demo and API
Demo and API are now available on [netlify](https://multi-chart.netlify.com/).

## Examples

### Pie 
<div>
  <img src="https://raw.githubusercontent.com/preignition/multi-chart/master/images/pie.png" width="300"></img>
</div>

### Bar
<div>
  <img src="https://raw.githubusercontent.com/preignition/multi-chart/master/images/bar.png" width="300"></img>
</div>

### Stack
<div>
  <img src="https://raw.githubusercontent.com/preignition/multi-chart/master/images/stack.png" width="300"></img>
</div>

### Radar
<div>
  <img src="https://raw.githubusercontent.com/preignition/multi-chart/master/images/radar.png" width="300"></img>
</div>


### Bubble
<div>
  <img src="https://raw.githubusercontent.com/preignition/multi-chart/master/images/bubble.png" width="300"></img>
</div>





