# 4.0.0 Changelog
Full rewrite to [lit-element](https://github.com/polymer/lit-element). Demo are now a sub modules from `[multi-chart-demo](@preignition/multi-chart-demo)`


# 3.0.0 Changelog
Version 3 makes the switch from Polymer 2.0 to [lit-element](https://github.com/polymer/lit-element), with dependecies managed through [pika-web](https://github.com/pikapkg/web).


# 2.0.0 Changelog

Version 2.0.0 is now Polymer 2.0 only. 

## Naming convention
Web components acting as a d3-class wrapper start with the `d3-` prefix. Each wrapper class is saved in its own directory (e.g. `d3-axis` for [d3-axis](https://github.com/d3/d3-axis), `d3-shape` for (d3-shape)[https://github.com/d3/d3-shape], ...)

Geographic elements (geo-chart, choropleth) are now included in a new separate package ([multi-geo](github.com/polymerEl/multi-geo)).

## API breaking changes

### drawable
This directory was previously `shape`.

- A new class mixin (`multi-drawable`) takes care of drawing/rendering chart components. This role was previously fulfilled by `multi-lifecyle-behavior`.
- Dispatching SVG elements to the main chart conatiner are now handled by `dispatch-svg-mixin`. This mixin will look for elemets with `[slot-svg]`and stamp them within the svg group of `[id=slot-svg]`.
- Previous `multi-shape-pie` is renamed `multi-drawable-pie`.
- Previous `multi-shape-line` is renamed `multi-drawable-line`.

### d3-scale
- Scale multation (e.g. new domain or range) fires a `multi-scale-refresh` event. This allow components using the scale to react to the change. 

### d3-axis
- Previous `multi-axis` component is now renamed as `d3-axis`. Instead of specifying axis type (top, bottom, left, right), we now have components for each axis type: `d3-axis-top`, `d3-axis-bottom`, `d3-axis-left`, `d3-axis-right`.
- 


### Documentation
This version users iron-component-page 3.0.1. Ping use `polymer analysis > analysis.json` to generate documentation.


## TODO : 
- [x] transition
- [x] new library for multi-geo 
- [x] use template-for for modular style management 
- [ ] better explanation/documentation
- [x] migrate multi-verse charts to multi-chart
- [ ] geo hexbin for geo draft
- [x] multi-zoom
- [x] line -> check with better bottom-domain
- [x] two-way binding for projection properties
- [ ] compose example
