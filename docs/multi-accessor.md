# multi-accessor

## MultiAccessor

`<multi-accessor>` creates an accessor function from a String path. This element is mostly for internal use.

### Eample
```html
   <multi-accessor path="+count"></multi-accessor>
```

**Mixins:** DoNotSetUndefinedValue

## Properties

| Property   | Attribute  | Type     | Description                                      |
|------------|------------|----------|--------------------------------------------------|
| `accessor` | `accessor` |          | the accessor function<br />example function : `d => {return +d.count}` |
| `path`     | `path`     | `string` | path from which tha accessor function is built<br />For instance `+count` will create `d => {return +d.count}` function. |
| `subPath`  | `sub-path` | `Object` | when set, will generate an accessor function that includes a subpath<br /><br />For example `<multi-accessor path="+count" sub-path="sub"></multi-accessor>`<br />will create `d => {return +d.count.sub}` |

## Events

| Event              | Description                                    |
|--------------------|------------------------------------------------|
| `accessor-changed` | Event fired when the accessor function changes |
