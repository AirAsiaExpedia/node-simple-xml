var libxmljs = require("libxmljs");

exports.stringify = stringify;
exports.parse = parse;

function stringify (obj) {
  var xml = '';
  for (var key in obj) {
    var value = obj[key];
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        if (typeof item === 'object')
          xml += '<' + key + '>' + stringify(item) + '</' + key + '>';
        else
          xml += '<' + key + '>' + item + '</' + key + '>';
      });
    } else if (typeof value === 'object') {
      xml += '<' + key + '>' + stringify(value) + '</' + key + '>';
    } else {
      xml += '<' + key + '>' + value + '</' + key + '>';
    }
  }
  return xml;
}

function parse (data) {
  var element = data instanceof libxmljs.Document || data instanceof libxmljs.Element ? data : libxmljs.parseXml(data);
  var obj = {};
  if (element instanceof libxmljs.Document) {
    element = element.root();
    obj[element.name()] = parse(element);
  } else {
    var children = element.childNodes();
    if (children.length) {
      children.forEach(function (child) {
        var name = child.name();
        if (hasTextNode(child)) {
          obj[name] = child.text();
        } else {
          if (Array.isArray(obj[name])) {
            obj[name].push(parse(child));
          } else if (obj[name]) {
            var oldValue = obj[name];
            obj[name] = [oldValue, parse(child)];
          } else {
            obj[name] = parse(child);
          }
        }
      });
    } else {
      if (hasTextNode(element))
        obj[element.name()] = element.text();
      else
        obj = parseAttributes(element);
    }
  }

  return obj;
}

function parseAttributes (element) {
  var obj = {};
  element.attrs().forEach(function (attr) {
    obj[attr.name()] = attr.value();
  });
  return obj;
}

function hasTextNode (child) {
  return child.childNodes().length > 0 && child.childNodes()[0].name() === 'text';
}
