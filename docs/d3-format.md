# d3-format

## d3-format

  a lit-element wrapper around [d3-format](https://github.com/d3/d3-format).

### Example
`<d3-format specifier= ".1f" value="12.2135"></d3-format>` will display `12.2``

### Examples from [d3-format](https://github.com/d3/d3-format)
```js
d3.format(".0%")(0.123);  // rounded percentage, "12%"
d3.format("($.2f")(-3.5); // localized fixed-point currency, "(£3.50)"
d3.format("+20")(42);     // space-filled and signed, "                 +42"
d3.format(".^20")(42);    // dot-filled and centered, ".........42........."
d3.format(".2s")(42e6);   // SI-prefix with two significant digits, "42M"
d3.format("#x")(48879);   // prefixed lowercase hexadecimal, "0xbeef"
d3.format(",.2r")(4223);  // grouped thousands with two significant digits, "4,200"
```

**Mixins:** DefaultValueMixin, DoNotSetUndefinedValue, FormatMixin

## Properties

| Property    | Attribute   | Type      | Default | Description                                      |
|-------------|-------------|-----------|---------|--------------------------------------------------|
| `isTime`    | `is-time`   | `boolean` |         | true to indicate the use of d3.timeFormat (instead of d3.format) |
| `specifier` | `specifier` | `string`  | ".1f"   | `specifier` for the format function (as per https://github.com/d3/d3-format#locale_format) |
| `value`     | `value`     | `string`  |         | the value to be formated                         |
