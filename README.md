# XML

A naive XML parser and builder based on [libxmljs](https://github.com/polotek/libxmljs) implementing the JSON api.
This module was created as a simple way to parse and build xml for web services such as SOAP.
It supports parsing arrays of **elements** or **attributes**, but not both intermingled.

## Usage

    npm install simple-xml --save

### parse(xml string or libxml document)

Parse a string or a libxml document or element into a Plain Old Javascript Object.

```js
var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item><value>Item 1</value></item><item><value>Item 2</value></item><item><value>Item 3</value></item></items>';
var XML = require('simple-xml');
console.log(JSON.stringify( XML.parse(xml) ));

// {"items":{"item":[{"value":"Item 1"},{"value":"Item 2"},{"value":"Item 3"}]}}

var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item>Item 1</item><item>Item 2</item><item>Item 3</item></items>';
console.log(JSON.stringify( XML.parse(xml) ));

// {"items":{"item":["Item 1","Item 2","Item 3"]}}

```



### stringify(object)

Transforms an object into a simple xml string representation.

```js
var obj = {"items":{"item":[{"value":"Item 1"},{"value":"Item 2"},{"value":"Item 3"}]}}
var XML = require('simple-xml');
console.log( XML.stringify(obj) );

// <items><item><value>Item 1</value></item><item><value>Item 2</value></item><item><value>Item 3</value></item></items>

```
