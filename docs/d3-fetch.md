# d3-fetch

## d3-fetch

A wrapper aroud [d3-fetch](https://github.com/d3/d3-fetch), a module providing convenient parsing on top of [Fetch](https://fetch.spec.whatwg.org/).

**Mixins:** LitNotify, DefaultValueMixin, SelectMixin, DoNotSetUndefinedValue

## Properties

| Property  | Attribute | Type                                             | Default | Description                 |
|-----------|-----------|--------------------------------------------------|---------|-----------------------------|
| `data`    |           | `array`                                          |         | `data` fetched data         |
| `error`   | `error`   | `object`                                         |         | `error`                     |
| `loading` | `loading` | `boolean`                                        | false   | `loading` true when loading |
| `log`     | `log`     | `boolean`                                        |         | `log`  true to show log     |
| `type`    | `type`    | `'blob'\|'buffer'\|'csv'\|'dsv'\|'html'\|'image'\|'json'\|'svg'\|'text'\|'tsv'\|'xml'` |         | expected data type          |
| `url`     | `url`     | `string`                                         |         | the url to fetch data from  |

## Methods

| Method     | Type                           |
|------------|--------------------------------|
| `dispatch` | `(name: any): void`            |
| `get`      | `(path: any): any`             |
| `set`      | `(path: any, value: any): any` |

## Events

| Event             | Description                               |
|-------------------|-------------------------------------------|
| `data-changed`    | Event fired when data is set              |
| `error-changed`   | Event fired when there is an error        |
| `loading-changed` | Event fired when loading property changes |
