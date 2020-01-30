[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/preignition/multi-chart)

# \<multi-chart\>
Build composable, markup-based, extensible visualizations for the web. 

\<multi-chart\> is a Polymer/Webcomponent library to compose markup-driven and data-driven vizualization layers.

## Motivation
While building vizualisation for the web, it is difficult to find the right balance between low-level vizualization kernel (like d3) that requires a lot of development work, and high-level black box library that are difficult to configure beyond a certain point. 

\<multi-chart\> is a attempt to provide the best of two the worlds: low level extensible webcomponents (often wrapper around d3.js modules like d3-axis) composed together to build complex charts. The library proposes ready-to-use configurable charts, but also the building blocks for accomodating more complex use case. 

\<multi-chart\>, plays well with [\<multi-geo\>](https://github.com/preignition/multi-geo) (similar library for geo charts like choropleth) and [\<multi-verse\>](https://github.com/preignition/multi-verse), a graphical interactive multi-dimensional analysis tool. Together, they offer a markup based alternative to tools like [dc.js](https://dc-js.github.io/dc.js/)

## Examples

[Demo](https://webcomponents.org/element/preignition/multi-chart/demo/index.html) are [and API documentation available here](https://webcomponents.org/element/preignition/multi-chart).

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

## Dependencies
For using \<multi-chart\>, please make sure that the following packages are available on the client: 
- [d3.js v5](https://d3js.org/) 
- [d3-svg-legend](http://d3-legend.susielu.com/)
- [d3-tip](https://github.com/Caged/d3-tip)

The easiest is to import [d3-bundle-element/d3-bundle-element-multi.html](https://github.com/preignition/d3-bundle), which already includes all required rependencies. 




