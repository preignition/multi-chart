# d3-axis

A litElement wrapper around [d3.axis](https://github.com/d3/d3-axis).

## Properties

| Property | Attribute | Type                               | Description  |
|----------|-----------|------------------------------------|--------------|
| `domain` | `domain`  | `array`                            |              |
| `range`  | `range`   | `array`                            |              |
| `type`   | `type`    | `'top'\|'bottom'\|'left'\|'right'` | type of axis |

## Methods

| Method          | Type                 |
|-----------------|----------------------|
| `updateWrapper` | `(props: any): void` |

## Events

| Event          | Description                                      |
|----------------|--------------------------------------------------|
| `axis-changed` | fires when axis value changes (and need to be re-rendered) |
