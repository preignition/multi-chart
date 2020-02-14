# 

# MultiContainer

`<multi-chart-base>` is a base element for buiding charts


### Events
Fired when `multi-container` is attached .

**Mixins:** MultiData, ObserveResize, MultiRegister, CacheId, Zoomable, LitNotify, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property                | Attribute                 | Modifiers | Type                                             | Default   | Description                                      |
|-------------------------|---------------------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `bottomMargin`          | `bottom-margin`           |           | `number`                                         |           |                                                  |
| `colorScale`            | `color-scale`             |           |                                                  |           | colorScale for the chart                         |
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
| `topMargin`             | `top-margin`              |           | `number`                                         |           |                                                  |
| `transition`            | `transition`              |           |                                                  |           | `transition` to apply while drawing              |
| `width`                 | `width`                   |           | `number`                                         |           | `width`  of the chart area. Equals actual width of component - margins |
| `zoomedEl`              |                           | readonly  |                                                  |           |                                                  |

## Methods

| Method             | Type                                             | Description                                      |
|--------------------|--------------------------------------------------|--------------------------------------------------|
| `assignSlottedSVG` | `(): void`                                       |                                                  |
| `callRegistered`   | `(methodName: any, ...args: any[]): void`        |                                                  |
| `dataChanged`      | `(): void`                                       | `dataChanged` might be called by parents to reset the entied chart.<br />For instance, this is called by multi-verse, once a new filter is applies<br />and data to display have changed. |
| `dispatch`         | `(name: any): void`                              |                                                  |
| `get`              | `(path: any): any`                               |                                                  |
| `getAccessor`      | `(scale: d3Scale, accessor: Function): Function` | return a scaled accessor function<br /><br />**scale**: scale as<br />**accessor**: function (exampe: `(d,i) => d.value.x``) |
| `getContentRender` | `(): TemplateResult`                             | used when subclassing `multi-container` and add content to the chart |
| `getSize`          | `(): { width: any; height: any; }`               |                                                  |
| `onDrawn`          | `(): void`                                       |                                                  |
| `onRegister`       | `(item: any): void`                              |                                                  |
| `onResize`         | `(rect: any, entry: any): void`                  |                                                  |
| `refresh`          | `(): void`                                       |                                                  |
| `set`              | `(path: any, value: any): any`                   |                                                  |
| `unregister`       | `(registered: any): void`                        |                                                  |

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


# 

# MultiContainerLayer

`<multi-container-layer>` is a proxy for svg g element. 
It will be inserted within `multi-container-svg#slot-chart` and can contain other svg content like geo layer. 


### Events
Fired when `multi-container-layer` is attached .

**Mixins:** DispatchSVG, CacheId, MultiHighlight, MultiRegister, Registerable, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property                | Attribute                 | Modifiers | Type      | Default       | Description                                      |
|-------------------------|---------------------------|-----------|-----------|---------------|--------------------------------------------------|
| `group`                 | `group`                   |           | `string`  | "default"     | `group` the name of the group (used when to registering this element under a multi-verse) |
| `highlightAccessor`     | `highlight-accessor`      |           |           |               | `highlightAccessor` accessor function to fetch keys to be highlighted<br />default value supposes that we have elements like `<path data-key="tyhKey"></path>` |
| `highlightedCls`        | `highlighted-cls`         |           | `string`  | "highlighted" |                                                  |
| `highlightedKeys`       | `highlighted-keys`        |           | `array`   |               |                                                  |
| `highlightedLayer`      |                           | readonly  |           |               |                                                  |
| `layer`                 | `layer`                   |           | `string`  |               | `layer` the name of the layer - is set to g#svg-slot |
| `layerId`               | `layer-id`                |           | `string`  | "slot-layer"  | `layerId` id of the layer containing elements to be highlighted. |
| `log`                   | `log`                     |           | `boolean` |               | `log`  true to show log                          |
| `multiPosition`         | `multi-position`          |           | `number`  | 0             | `multiPosition` position used to re-order items when appended by dispatch-svg<br />nodePosition larger than 0 will render on top. |
| `registerContainerName` | `register-container-name` |           | `string`  | "svgHost"     | `registerContainerName` the name of the container set to registered items. This is needed because<br />some items can be registered agains mutiple domain. For instance, multi-g : as an resizable svg item<br />and against multi-verse. |
| `registerEventDispatch` |                           | readonly  | `string`  |               | `registerEventDispatch`  the name of the event to be fired when connected.<br />A container with multi-register-mixin applied<br />will listen to this event to register the component.<br /> |
| `registerEventListen`   |                           | readonly  | `string`  |               | `registerEventListen` the name of the event that will trigger<br />a registration. This event is fired by an element applying<br />Resiterable Mixin<br /> |
| `registerOrder`         |                           | readonly  | `number`  |               | `registerOrder` - registerable elements are sorted on the basis of this property. |
| `registeredItems`       |                           | readonly  |           |               |                                                  |
| `svgHost`               | `svg-host`                |           | `object`  |               | `svgHost` the host to which [slog-svg] nodes must be stamped |

## Methods

| Method            | Type                                        | Description                                      |
|-------------------|---------------------------------------------|--------------------------------------------------|
| `afterRegister`   | `(host: any, containerName?: string): void` |                                                  |
| `afterUnregister` | `(host: any, containerName?: string): void` |                                                  |
| `callRegistered`  | `(methodName: any, ...args: any[]): void`   |                                                  |
| `dataChanged`     | `(...args: any[]): void`                    | `dataChanges` relay dataChanged to registeredItems |
| `debounceDraw`    | `(...args: any[]): void`                    |                                                  |
| `dispatch`        | `(name: any): void`                         |                                                  |
| `get`             | `(path: any): any`                          |                                                  |
| `getHostedNode`   | `(target: any): any`                        |                                                  |
| `getRootHost`     | `(host: any): any`                          |                                                  |
| `observeSvgHost`  | `(host: any, old: any): void`               |                                                  |
| `postRemove`      | `(): void`                                  | `postRemove` is called by `multi-registerable-mixin` on disconnectedCallback.<br />It unregisters this element from svgHost. |
| `resize`          | `(width: any, height: any): void`           |                                                  |
| `set`             | `(path: any, value: any): any`              |                                                  |
| `setHostStyle`    | `(host: any): void`                         |                                                  |
| `unregister`      | `(registered: any): void`                   |                                                  |

## Events

| Event                 |
|-----------------------|
| `multi-verse-added`   |
| `multi-verse-removed` |

## Slots

| Name |
|------|
|      |
