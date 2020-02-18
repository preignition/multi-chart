# multi-legend

## MultiLegend

`<multi-legend>` a element for displaying chart legends
Relying on [d3-legend](https://d3-legend.susielu.com/), A library to make legends in svg-land easy as pie.

**Mixins:** DispatchSVG, TrackHover, RelayTo, CacheId, Registerable, LitNotify, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property                | Attribute        | Modifiers | Type                        | Default     | Description                                      |
|-------------------------|------------------|-----------|-----------------------------|-------------|--------------------------------------------------|
| `group`                 | `group`          |           | `string`                    | "default"   | `group` against which the drawable object is registered.<br />A chart can have multiple group (e.g. one displayed against right axis,<br />the other against the left axis).<br />Set another group name for objects belonging to alternate chart settings. |
| `height`                | `height`         |           | `number`                    |             | legend height                                    |
| `hovered`               | `hovered`        |           | `string`                    |             | `hovered` the hovered item, tracked when `trackHover` is set to true.<br />This is usefull for instance when we want to highlight the legend being hovered |
| `log`                   | `log`            |           | `boolean`                   |             | `log`  true to show log                          |
| `multiPosition`         | `multi-position` |           | `number`                    | 0           | `multiPosition` position used to re-order items when appended by dispatch-svg<br />nodePosition larger than 0 will render on top. |
| `padding`               | `padding`        |           | `number`                    | 10          | `padding` the padding to be applied when calculation the position |
| `position`              | `position`       |           | `string`                    | "top-right" | `position` this position within the chart. e.g. top-right, bottom-left<br />position is recalculated on resize. |
| `rectOffset`            | `rect-offset`    |           | `number`                    | 5           | `retOffset` the offset for legend rect           |
| `registerEventDispatch` |                  | readonly  | `string`                    |             | `registerEventDispatch`  the name of the event to be fired when connected.<br />A container with multi-register-mixin applied<br />will listen to this event to register the component.<br /> |
| `registerOrder`         |                  | readonly  | `number`                    |             | `registerOrder` - registerable elements are sorted on the basis of this property. |
| `scaleFactor`           | `scale-factor`   |           | `number`                    | 0.7         | factor between 0 to 1 to help make legend smaller |
| `svgHost`               | `svg-host`       |           | `object`                    |             | `svgHost` the host to which [slog-svg] nodes must be stamped |
| `trackHover`            | `track-hover`    |           | `boolean`                   | false       | `trackHover` set true if selector listen to mouseenter/mouseleave events and set hoveredItem accordingly.<br />When true, this element also and fires `multi-mouseenter` and multi-mouseleave. |
| `type`                  | `type`           |           | `'color'\|'size'\|'symbol'` | "color"     | legend `type` the type of legend                 |
| `width`                 | `width`          |           | `number`                    |             | legend width                                     |
| `x`                     | `x`              |           | `number`                    | 0           | x position                                       |
| `y`                     | `y`              |           | `number`                    | 0           | y position                                       |

## Methods

| Method             | Type                                        | Description                                      |
|--------------------|---------------------------------------------|--------------------------------------------------|
| `afterRegister`    | `(host: any, containerName?: string): void` |                                                  |
| `afterUnregister`  | `(host: any, containerName?: string): void` |                                                  |
| `attachListeners`  | `(sel: any): void`                          | `attachListeners` listen to click, mouseenter and mouseleave and<br />fires their respective `multi` events (`multi-tap`, `multi-mouse-enter` and `multi-mouse-leave`) |
| `dataChanged`      | `(): void`                                  |                                                  |
| `debounceDraw`     | `(): void`                                  |                                                  |
| `detatchListeners` | `(sel: any): void`                          |                                                  |
| `dispatch`         | `(name: any): void`                         |                                                  |
| `draw`             | `(): void`                                  |                                                  |
| `get`              | `(path: any): any`                          |                                                  |
| `getHostedNode`    | `(target: any): any`                        |                                                  |
| `getKey`           | `(d: any): any`                             |                                                  |
| `getRootHost`      | `(host: any): any`                          |                                                  |
| `observeSvgHost`   | `(host: any, old: any): void`               |                                                  |
| `onMouseenter`     | `(d: any, i: any, el: any): void`           |                                                  |
| `onMouseleave`     | `(d: any, i: any, el: any): void`           |                                                  |
| `postRemove`       | `(): void`                                  | `postRemove` is called by `multi-registerable-mixin` on disconnectedCallback.<br />It unregisters this element from svgHost. |
| `resize`           | `(): void`                                  |                                                  |
| `set`              | `(path: any, value: any): any`              |                                                  |
| `setHostStyle`     | `(host: any): void`                         |                                                  |
| `setLegend`        | `(legend: any): void`                       |                                                  |
| `setPosition`      | `(): void`                                  |                                                  |
| `shallRelayTo`     | `(key: any, name: any): any`                | From RelayTo mixin, used to automatically relay properties to child components |

## Events

| Event              | Description                     |
|--------------------|---------------------------------|
| `height-changed`   | Event fired when height changes |
| `multi-cell-click` |                                 |
| `multi-mouseenter` |                                 |
| `multi-mouseleave` |                                 |
| `width-changed`    | Event fired when width changes  |

## CSS Custom Properties

| Property                    | Description                                 |
|-----------------------------|---------------------------------------------|
| `--multi-legend-background` | background color for legenx box (`#efefef`) |
| `--multi-legend-color`      | text color for legends (#292929)            |
| `--multi-legend-opacity`    | opacity for legend box  (`0.6`)             |
| `--multi-legend-stroke`     | stroke color for legend box                 |
