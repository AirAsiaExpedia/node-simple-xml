describe('XML', function () {

  var XML = require('../XML'), libxmljs = require("libxmljs");

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

    // TODO: handles array of text nodes
    it.skip('parses arrays of text nodes', function () {
      var xml = '<?xml version="1.0" encoding="UTF-8"?><items><item>Item 1</item><item>Item 2</item><item>Item 3</item></items>';
      var obj = XML.parse(xml);
      obj.items.should.exist;
      obj.items.item.should.be.an.instanceOf(Array);
      obj.items.item.length.should.equal(3);
      obj.items.item[0].should.equal('Item 1');
    });

    function verifyParsedObject (obj) {
      obj.items.should.exist;
      obj.items.item.should.be.an.instanceOf(Array);
      obj.items.item.length.should.equal(3);
      obj.items.item[0].value.should.equal('Item 1');
    }
  });

  describe('#stringify', function () {
    it('stringifies the object into an xml string', function () {
      var obj = {"items":{"item":[{"value":"Item 1"},{"value":"Item 2"},{"value":"Item 3"}]}};
      var xml = '<items><item><value>Item 1</value></item><item><value>Item 2</value></item><item><value>Item 3</value></item></items>';
      XML.stringify(obj).should.equal(xml);
    });

    it('stringifies simple arrays into an xml string', function () {
      var obj = {"items":{"item":["Item 1","Item 2","Item 3"]}};
      var xml = '<items><item>Item 1</item><item>Item 2</item><item>Item 3</item></items>';
      XML.stringify(obj).should.equal(xml);
    });

  });

});
