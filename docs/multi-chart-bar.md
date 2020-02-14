# multi-chart-bar

## MultiChartBar

`<multi-chart-line>` an element for displaying data as a line chart. 

### Example

```html
    <multi-chart-bar 
        id="chart"  
        color-scale="[[colorScale]]"
        data="[[data]]"
        left-tick-format="[[leftTickFormat]]">
      <dom-repeat items="{{keys}}">
        <template>
         <!-- set the series inthe markup. We can also pass a series object directly to the chart. -->
         <multi-serie key="[[item.key]]" label="[[item.label]]" accessor="{{item.accessor}}"></multi-serie>
         <!-- we need a accessor for y-scale -->
         <multi-accessor accessor="{{item.accessor}}" path="+value.[[item.key]]"></multi-accessor>
        </template>
      </dom-repeat>
    </multi-chart-bar>   
```

**Mixins:** ScaleRender, MultiData, ObserveResize, MultiRegister, CacheId, Zoomable, LitNotify, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property                | Attribute                 | Modifiers | Type                                             | Default   | Description                                      |
|-------------------------|---------------------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `bottomMargin`          | `bottom-margin`           |           | `number`                                         |           |                                                  |
| `bottomScaleType`       | `bottom-scale-type`       |           | `string`                                         | "band"    |                                                  |
| `colorScale`            | `colorScale`              |           |                                                  |           | colorScale for the chart                         |
| `data`                  | `data`                    |           | `array`                                          |           | `data` to display the chart                      |
| `enableZoom`            | `enable-zoom`             |           | `boolean`                                        |           | `enableZoom` set true to enable zoom behaviors   |
| `group`                 | `group`                   |           | `string`                                         |           | `group` the name of the group (used when to registering this element under a multi-verse) |
| `height`                | `height`                  |           | `number`                                         |           | `height`  of the chart area. Equals actual height of component - margins |
| `html`                  |                           | readonly  | `(strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult` |           |                                                  |
| `leftMargin`            | `left-margin`             |           | `number`                                         |           |                                                  |
| `log`                   | `log`                     |           | `boolean`                                        |           | `log`  true to show log                          |
| `multiVerseGroup`       | `multi-verse-group`       |           | `string`                                         | "default" | `multiVerseGroup` group name send along with `multi-verse-added` |
| `pattern`               | `pattern`                 |           | `boolean`                                        |           | `pattern` set true for charts using patterns (e.g. geo charts) |
| `processType`           | `process-type`            |           | `string`                                         |           | `processType`  the type of process type, e.g. stack for bar Chart |
| `registerContainerName` | `register-container-name` |           | `string`                                         | "svgHost" | `registerContainerName` the name of the container set to registered items. This is needed because<br />some items can be registered agains mutiple domain. For instance, multi-g : as an resizable svg item<br />and against multi-verse. |
| `registerEventListen`   |                           | readonly  | `string`                                         |           | `registerEventListen` the name of the event that will trigger<br />a registration. This event is fired by an element applying<br />Resiterable Mixin<br /> |
| `registeredItems`       |                           | readonly  | `array`                                          |           |                                                  |
| `rightMargin`           | `right-margin`            |           | `number`                                         |           |                                                  |
| `stacked`               | `stacked`                 |           | `boolean`                                        |           | `stacked` if true, draw a stack chart, otherwise, default bar chart |
| `topMargin`             | `top-margin`              |           | `number`                                         |           |                                                  |
| `transition`            | `transition`              |           |                                                  |           | `transition` to apply while drawing              |
| `valuePath`             | `value-path`              |           | `string`                                         |           | `valuePath` we can pass a value path to calculate value accessor |
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
| `getAxisRender`       | `(type: any): TemplateResult`                    |                                                  |
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
