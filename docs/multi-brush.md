# multi-brush

## MultiBrush

`<multi-brush>` implements a brush selection as in  [d3-brush](https://github.com/d3/d3-brush)

**Mixins:** DispatchSVG, Registerable, CacheId, RelayTo, LitNotify, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property                | Attribute          | Modifiers | Type                  | Default   | Description                                      |
|-------------------------|--------------------|-----------|-----------------------|-----------|--------------------------------------------------|
| `brush`                 | `brush`            |           |                       |           | `brush` brushing for mouse or touch event implementation [d3-brush](https://github.com/d3/d3-brush) |
| `effectiveScale`        |                    | readonly  | `{ x: any; y: any; }` |           |                                                  |
| `extent`                | `extent`           |           | `array`               |           | extent of the brush  as per https://github.com/d3/d3-brush#brush_extent |
| `group`                 | `group`            |           | `string`              | "default" | `group` against which the drawable object is registered.<br />A chart can have multiple group (e.g. one displayed against right axis,<br />the other against the left axis).<br />Set another group name for objects belonging to alternate chart settings. |
| `hasSelection`          | `hasSelection`     |           | `boolean`             |           | `hasSelection`  is true when a selection exists. The attribute is used for css rules.<br />This property is aimed at being bound to a multi-container-svg |
| `isRange`               | `isRange`          |           | `Object`              |           | true when brush is implemented with a range scale |
| `isSelecting`           | `isSelecting`      |           | `boolean`             | false     | `isSelection` is true when a selection is being done (e.g. by brushing). The attribute is used for css rules.<br />This property is aimed at being bound to a multi-container-svg |
| `log`                   | `log`              |           | `boolean`             |           | `log`  true to show log                          |
| `multiPosition`         | `multi-position`   |           | `number`              | 0         | `multiPosition` position used to re-order items when appended by dispatch-svg<br />nodePosition larger than 0 will render on top. |
| `registerAtConnected`   |                    | readonly  | `boolean`             |           |                                                  |
| `registerEventDispatch` |                    | readonly  | `string`              |           | `registerEventDispatch`  the name of the event to be fired when connected.<br />A container with multi-register-mixin applied<br />will listen to this event to register the component.<br /> |
| `registerOrder`         |                    | readonly  | `number`              |           | `registerOrder` - registerable elements are sorted on the basis of this property. |
| `selectedValues`        | `selectedValues`   |           | `array`               | []        | Returns an array of currently selected items.    |
| `svgHost`               | `svg-host`         |           | `object`              |           | `svgHost` the host to which [slog-svg] nodes must be stamped |
| `targetElement`         |                    | readonly  |                       |           |                                                  |
| `xContinuous`           | `x-continuous`     |           | `boolean`             |           | `xContinuous` indicate true if we have a `continuous` scale on X when the xScale is `ordinal` (e.g. a scaleBand for bar charts). If true a `xContinuousScale` is computed |
| `xContinuousScale`      | `xContinuousScale` |           |                       |           | `xContinuousScale` the continuous scale to use when selecting ranges |
| `xScale`                | `xScale`           |           |                       |           |                                                  |
| `yScale`                | `yScale`           |           |                       |           |                                                  |

## Methods

| Method              | Type                                        | Description                                      |
|---------------------|---------------------------------------------|--------------------------------------------------|
| `afterRegister`     | `(host: any, containerName?: string): void` |                                                  |
| `afterUnregister`   | `(host: any, containerName?: string): void` |                                                  |
| `clearSelection`    | `(): void`                                  |                                                  |
| `dispatch`          | `(name: any): void`                         |                                                  |
| `get`               | `(path: any): any`                          |                                                  |
| `getHostedNode`     | `(target: any): any`                        |                                                  |
| `getRootHost`       | `(host: any): any`                          |                                                  |
| `observeSvgHost`    | `(host: any, old: any): void`               |                                                  |
| `onMultiBrush`      | `(): void`                                  |                                                  |
| `onMultiBrushEnd`   | `(): void`                                  |                                                  |
| `onMultiBrushStart` | `(): void`                                  |                                                  |
| `postRemove`        | `(): void`                                  | `postRemove` is called by `multi-registerable-mixin` on disconnectedCallback.<br />It unregisters this element from svgHost. |
| `reflectToHost`     | `(name: any): void`                         |                                                  |
| `resize`            | `(width: any, height: any): void`           |                                                  |
| `set`               | `(path: any, value: any): any`              |                                                  |
| `setBrush`          | `(brush: any): void`                        |                                                  |
| `setHostStyle`      | `(host: any): void`                         |                                                  |
| `shallRelayTo`      | `(key: any, name: any): any`                | From RelayTo mixin, used to automatically relay properties to child components |

## Events

| Event                     | Description                             |
|---------------------------|-----------------------------------------|
| `has-selection-changed`   | Event fired when selection changes      |
| `is-range-changed`        | Event fired when isRange changes        |
| `multi-select`            |                                         |
| `selected-values-changed` | Event fired when selectedValues changes |
