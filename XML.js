'use strict';
var libxmljs = require('libxmljs');

exports.stringify = stringify;
exports.parse = parse;

function parseAttributes (element) {
  var obj = {};
  element.attrs().forEach(function (attr) {
    obj[attr.name()] = attr.value();
  });
  return obj;
}

function stringifyAttributes (obj) {
  var attributes = [];
  for (var key in obj) {
    attributes.push('' + key + '=\"' + obj[key] + '\"');
  }
  return attributes.join(' ');
}

function hasTextNode (child) {
  return child.childNodes().length > 0 && child.childNodes()[0].name() === 'text';
}

function stringify (obj) {
  var xml = '';

  function convert (item) {
    if (typeof item === 'object') {
      if (item["_attributes"]) {
        xml += '<' + key + ' ' + stringifyAttributes(item["_attributes"]) + '>' + (typeof item["_value"] === 'object' ? stringify(item["_value"]) : item["_value"]) + '</' + key + '>';
      } else if (item["_value"]) {
        xml += '<' + key + '>' + stringify(item["_value"]) + '</' + key + '>';
      } else {
        xml += '<' + key + '>' + stringify(item) + '</' + key + '>';
      }
    } else {
      xml += '<' + key + '>' + item + '</' + key + '>';
    }
  }

  for (var key in obj) {
    var value = obj[key];
    if (Array.isArray(value)) {
      value.forEach(convert);
    } else {
      convert(value);
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
        var name = child.name(),
          isTextNode = hasTextNode(child);
        if (Array.isArray(obj[name])) {
          obj[name].push(isTextNode ? child.text() : parse(child));
        } else if (obj[name]) {
          var oldValue = obj[name];
          obj[name] = [oldValue, isTextNode ? child.text() : parse(child)];
        } else if (isTextNode) {
          obj[name] = child.text();
        } else {
          obj[name] = parse(child);
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