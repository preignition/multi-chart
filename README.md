# \<multi-chart\>

A set of polymer elements for building reusable, modular and standard-based charts.  
This library is designed to work well with [\<multi-verse\>](https://github.com/PolymerEl/multi-verse), polymer elements for fast multivariate analysis of large dataset.
 
[Demo and API docs](http://polymerel.github.io/multi-chart/components/multi-chart/#multi-chart-geo)


## Simple Examples


### Pie chart

```
 <multi-chart-simple 
            id="chart" 
            title="test pie" 
            width="{{width}}" 
            height="{{height}}" 
            center="{{center}}" 

            color-scale="{{colorScale}}" 
            key-accessor-path="[[keyAccessorPath]]" 
            key-accessor="{{keyAccessor}}" 
            value-accessor-path="[[valueAccessorPath]]" 
            value-accessor="{{valueAccessor}}" 
             >
            <d3-pie  data="{{arcs}}" value="[[valueAccessor]]" __value-path="[[valueAccessorPath]]" pad-angle="[[padAngle]]" sort="[[sort]]" sort-values="[[sortValues]]"></d3-pie>
            <multi-shape-pie 
              width="[[width]]" 
              height="[[height]]" 
              center="[[center]]" 
              arcs="[[arcs]]"
              inner-radius="[[innerRadius]]"
              color-scale="[[colorScale]]"></multi-shape-pie>
             <multi-selector selection-type="select" accessor="[[keyAccessor]]"></multi-selector>  
             <multi-legend legend chart-width="[[width]]" scale="[[colorScale]]" position="top-right" ></multi-legend>

          </multi-chart-simple>

```
<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-chart/master/images/chart-pie.png" width="300"></img>
</div>


### Bar chart

<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-chart/master/images/chart-bar.png" width="300"></img>
</div>


### Stack chart
```
<multi-chart-coordinate id="chart" title="test stack chart" width="{{width}}" height="{{height}}" y-domain="[[yDomain]]" color-scale="{{colorScale}}" x-scale="{{xScale}}" y-scale="{{yScale}}" color-domain="[[keys]]" series="{{series}}" keys="{{keys}}" >
  <d3-stack domain="{{yDomain}}" data="{{stack}}" domain-min="[[domainMin]]" value="[[value]]" value-path="[[valuePath]]" order="[[order]]" offset="[[offset]]" keys="[[keys]]"></d3-stack>
  <multi-shape-stack chart  stack="[[stack]]" x-scale="[[xScale]]"  y-scale="[[yScale]]"    color-scale="[[colorScale]]"></multi-shape-stack>
  <multi-serie serie key="apple" label="apple"></multi-serie>
  <multi-serie serie key="banana" label="banana"></multi-serie>
  <multi-serie serie key="grape" label="grape"></multi-serie>
  <multi-legend legend chart-width="{{width}}" scale="[[colorScale]]" position="top-right" ></multi-legend>
  <multi-selector selection-type="brushX" width="[[width]]"  height="[[height]]" x-scale="[[xScale]]" accessor="[[keyAccessor]]"></multi-selector> 
</multi-chart-coordinate>
```          
<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-chart/master/images/chart-stack.png" width="300"></img>
</div>

### Bubble Chart

<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-chart/master/images/chart-bubble.png" width="300"></img>
</div>


### Choropleth chart

<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-chart/master/images/chart-choropleth.png" width="300"></img>
</div>


## How it works
TODO

## Hacks
TODO 
