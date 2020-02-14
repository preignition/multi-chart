# multi-chart-radar

## Radar Chart
A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point. The relative position and angle of the axes is typically uninformative, but various heuristics, such as algorithms that plot data as the maximal total area, can be applied to sort the variables (axes) into relative positions that reveal distinct correlations, trade-offs, and a multitude of other comparative measures.

**Mixins:** RelayTo, ScaleRender, MultiData, ObserveResize, MultiRegister, CacheId, Zoomable, LitNotify, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property                | Attribute                 | Modifiers | Type                                             | Default   | Description                                      |
|-------------------------|---------------------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `bottomMargin`          | `bottom-margin`           |           | `number`                                         |           |                                                  |
| `colorScale`            | `colorScale`              |           |                                                  |           | colorScale for the chart                         |
| `data`                  | `data`                    |           | `array`                                          |           | `data` to display the chart                      |
| `enableZoom`            | `enable-zoom`             |           | `boolean`                                        |           | `enableZoom` set true to enable zoom behaviors   |
| `group`                 | `group`                   |           | `string`                                         |           | `group` the name of the group (used when to registering this element under a multi-verse) |
| `height`                | `height`                  |           | `number`                                         |           | `height`  of the chart area. Equals actual height of component - margins |
| `html`                  |                           | readonly  | `(strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult` |           |                                                  |
| `keyPosition`           | `key-position`            |           | `string`                                         | "angle"   | `keyPosition` position type for keys.<br />this is used to calculate scale vor values in `multi-data-group` |
| `leftMargin`            | `left-margin`             |           | `number`                                         |           |                                                  |
| `log`                   | `log`                     |           | `boolean`                                        |           | `log`  true to show log                          |
| `min`                   | `min`                     |           | `number`                                         | 0         | `min` minumum value<br />we need to set it, otherwise will be inferred  frmo data |
| `multiVerseGroup`       | `multi-verse-group`       |           | `string`                                         | "default" | `multiVerseGroup` group name send along with `multi-verse-added` |
| `pattern`               | `pattern`                 |           | `boolean`                                        |           | `pattern` set true for charts using patterns (e.g. geo charts) |
| `processType`           | `process-type`            |           | `string`                                         |           | `processType`  the type of process type, e.g. stack for bar Chart |
| `registerContainerName` | `register-container-name` |           | `string`                                         | "svgHost" | `registerContainerName` the name of the container set to registered items. This is needed because<br />some items can be registered agains mutiple domain. For instance, multi-g : as an resizable svg item<br />and against multi-verse. |
| `registerEventListen`   |                           | readonly  | `string`                                         |           | `registerEventListen` the name of the event that will trigger<br />a registration. This event is fired by an element applying<br />Resiterable Mixin<br /> |
| `registeredItems`       |                           | readonly  | `array`                                          |           |                                                  |
| `rightMargin`           | `right-margin`            |           | `number`                                         |           |                                                  |
| `tension`               | `tension`                 |           | `number`                                         | 0.6       | `tension` tension for [curveCardinalClosed](https://github.com/d3/d3-shape#curveCardinalClosed)<br />value between 0 an 1. |
| `topMargin`             | `top-margin`              |           | `number`                                         |           |                                                  |
| `transition`            | `transition`              |           |                                                  |           | `transition` to apply while drawing              |
| `valuePosition`         | `value-position`          |           | `string`                                         | "radial"  | `valuePosition` position type for values.<br />this is used to calculate scale vor values in `multi-data-group` |
| `width`                 | `width`                   |           | `number`                                         |           | `width`  of the chart area. Equals actual width of component - margins |
| `zoomedEl`              |                           | readonly  |                                                  |           |                                                  |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `assignSlottedSVG`    | `(): void`                                       |                                                  |
| `callRegistered`      | `(methodName: any, ...args: any[]): void`        |                                                  |
| `dataChanged`         | `(): void`                                       | `dataChanged` might be called by parents to reset the entied chart.<br />For instance, this is called by multi-verse, once a new filter is applies<br />and data to display have changed. |
| `dispatch`            | `(name: any): void`                              |                                                  |
| `get`                 | `(path: any): any`                               |                                                  |
| `getAccessor`         | `(scale: d3Scale, accessor: Function): Function` | return a scaled accessor function<br /><br />**scale**: scale as<br />**accessor**: function (exampe: `(d,i) => d.value.x``) |
| `getAxisRender`       | `(): TemplateResult`                             |                                                  |
| `getContentRender`    | `(): TemplateResult`                             | used when subclassing `multi-container` and add content to the chart |
| `getRange`            | `(type: any): any[]`                             |                                                  |
| `getScaleRender`      | `(type: any, axis: any): TemplateResult`         |                                                  |
| `getSize`             | `(): { width: any; height: any; }`               |                                                  |
| `onDataGroupRescaled` | `(e: any): void`                                 |                                                  |
| `onDrawn`             | `(): void`                                       |                                                  |
| `onRegister`          | `(item: any): void`                              |                                                  |
| `onResize`            | `(rect: any, entry: any): void`                  |                                                  |
| `refresh`             | `(): void`                                       |                                                  |
| `set`                 | `(path: any, value: any): any`                   |                                                  |
| `shallRelayTo`        | `(key: any, name: any): boolean`                 |                                                  |
| `unregister`          | `(registered: any): void`                        |                                                  |

## Events

| Event                     |
|---------------------------|
| `multi-container-removed` |
| `multi-verse-added`       |
| `multi-verse-removed`     |

## Slots

| Name |
|------|
|      |
