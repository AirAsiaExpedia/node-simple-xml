describe('XML', function () {

  var XML = require('../XML'),
    libxmljs = require('libxmljs');

  describe('#parse', function () {
    it('parses the xml string into an object', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item><value>Item 1</value></item><item><value>Item 2</value></item><item><value>Item 3</value></item></items>';
      var obj = XML.parse(xml);
      verifyParsedObject(obj);
    });

    it('parses the libxml object into a POJO', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item><value>Item 1</value></item><item><value>Item 2</value></item><item><value>Item 3</value></item></items>';
      var obj = XML.parse(libxmljs.parseXml(xml));
      verifyParsedObject(obj);
    });

    it('parses attributes into properties', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item value="Item 1"/><item value="Item 2"/><item value="Item 3"/></items>';
      var obj = XML.parse(xml);
      verifyParsedObject(obj);
    });

    it('parses arrays of text nodes', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item>Item 1</item><item>Item 2</item><item>Item 3</item></items>';
      var obj = XML.parse(xml);
      obj.items.should.exist;
      obj.items.item.should.be.an.instanceOf(Array);
      obj.items.item.length.should.equal(3);
      obj.items.item[0].should.equal('Item 1');
      obj.items.item[1].should.equal('Item 2');
      obj.items.item[2].should.equal('Item 3');
    });

    function verifyParsedObject(obj) {
      obj.items.should.exist;
      obj.items.item.should.be.an.instanceOf(Array);
      obj.items.item.length.should.equal(3);
      obj.items.item[0].value.should.equal('Item 1');
      obj.items.item[1].value.should.equal('Item 2');
      obj.items.item[2].value.should.equal('Item 3');
    }
  });

  describe('#stringify', function () {
    it('stringifies the object into an xml string', function () {
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
      var xml = '<items><item><value>Item 1</value></item><item><value>Item 2</value></item><item><value>Item 3</value></item></items>';
      XML.stringify(obj).should.equal(xml);
    });

    it('stringifies the object with attributes into an xml string', function () {
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
      var xml = '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><wsse:UsernameToken xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" wsu:Id="SecurityToken-2015-01-05T21:07:28Z"><wsse:Username>username</wsse:Username><wsse:Password>password</wsse:Password><wsu:Created>2015-01-05T21:07:28Z</wsu:Created></wsse:UsernameToken></wsse:Security>';
      XML.stringify(obj).should.equal(xml);
    });

    it('stringifies simple arrays into an xml string', function () {
      var obj = {
        "items": {
          "_value": {
            "item": ["Item 1", "Item 2", "Item 3"]

          }
        }
      };
      var xml = '<items><item>Item 1</item><item>Item 2</item><item>Item 3</item></items>';
      XML.stringify(obj).should.equal(xml);
    });

  });

});