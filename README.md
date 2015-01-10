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
      var obj = {
        "items": {
          "_value": {
            "item": [{
              "value": "Item 1"
            }, {
              "value": "Item 2"
            }, {
              "value": "Item 3"
            }]
          }
        }
      };
var XML = require('simple-xml');
console.log(XML.stringify(obj));

//<items>
//	<item>
//		<value>Item 1</value>
//	</item>
//	<item>
//		<value>Item 2</value>
//	</item>
//	<item>
//		<value>Item 3</value>
//	</item>
//</items>

```
If the XML needs attributes, then the JSON object must be like:

```js
      var obj = {
        "wsse:Security": {
          "_attributes": {
            "xmlns:wsse": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
            "xmlns:wsu": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"
          },
          "_value": {
            "wsse:UsernameToken": {
              "_attributes": {
                "xmlns:wsu": "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
                "wsu:Id": "SecurityToken-2015-01-05T21:07:28Z"
              },
              "_value": {
                "wsse:Username": "username",
                "wsse:Password": "password",
                "wsu:Created": "2015-01-05T21:07:28Z"
              }
            }
          }
        }
      };

//<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
//	<wsse:UsernameToken xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" wsu:Id="SecurityToken-2015-01-05T21:07:28Z">
//		<wsse:Username>username</wsse:Username>
//		<wsse:Password>password</wsse:Password>
//		<wsu:Created>2015-01-05T21:07:28Z</wsu:Created>
//	</wsse:UsernameToken>
//</wsse:Security>
```