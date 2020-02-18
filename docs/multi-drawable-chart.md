# multi-drawable-chart

## MultiDrawablePie

`<multi-drawable-pie>` draws a pie

**Mixins:** Shaper

## Example

```javascript
index.html#multi-pie-demo
```

## Properties

| Property          | Attribute     | Modifiers | Type                                             | Description                                      |
|-------------------|---------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `arc`             | `arc`         |           |                                                  |                                                  |
| `colorScale`      | `color-scale` |           |                                                  | `colorScale` colorScale to use for the chart (example d3.scaleOrdinal().range(d3.schemeCategory10);) |
| `dataProcessType` |               | readonly  | `string`                                         | `dataProcessType` the type of data processing. Stacked data (e.g. for bar chart) will be stacked |
| `height`          | `height`      |           | `number`                                         |                                                  |
| `html`            |               | readonly  | `(strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult` |                                                  |
| `key`             | `key`         |           | `string`                                         | `key`  some drawable need to have a key (for example lines in a line chart, to as to apply a colorScale) |
| `minSize`         |               | readonly  | `number \| null`                                 |                                                  |
| `pieWidth`        | `pie-width`   |           | `string`                                         | `pieWidth` a way to indicate the width of the radius (either in % or absolute value).<br />If set, inner radius will be inferred. |
| `shapeClass`      |               | readonly  | `string`                                         |                                                  |
| `shapeName`       |               | readonly  | `string`                                         |                                                  |
| `shaper`          | `shaper`      |           |                                                  | `shaper`  shaper function for generating path ([for instance, pie](https://github.com/d3/d3-shape#lines) |
| `targetElement`   |               | readonly  |                                                  | `targetElement` getter override lifecycle Behavior and called during attached |
| `valuePath`       | `value-path`  |           | `string`                                         | `valuePath` path for creating value accessor     |
| `width`           | `width`       |           | `number`                                         |                                                  |

## Methods

| Method           | Type                              |
|------------------|-----------------------------------|
| `draw`           | `(): any`                         |
| `getOuterRadius` | `(): number \| undefined`         |
| `getPieWidth`    | `(): number \| undefined`         |
| `onSetShaper`    | `(e: any): void`                  |
| `resize`         | `(width: any, height: any): void` |
