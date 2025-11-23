// Object Methods Polyfills

// Object.assign
Object.myAssign = function(target, ...sources) {
  if (target == null) throw new TypeError('Cannot convert undefined or null to object');
  const to = Object(target);
  sources.forEach(source => {
    if (source != null) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          to[key] = source[key];
        }
      }
    }
  });
  return to;
};

// Object.keys
Object.myKeys = function(obj) {
  const keys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
};

// Object.values
Object.myValues = function(obj) {
  const values = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
};

// Object.entries
Object.myEntries = function(obj) {
  const entries = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      entries.push([key, obj[key]]);
    }
  }
  return entries;
};

// Object.create
Object.myCreate = function(proto, propertiesObject) {
  function F() {}
  F.prototype = proto;
  const obj = new F();
  if (propertiesObject) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
};

// Test Cases
const obj = { a: 1, b: 2 };
console.log(Object.myKeys(obj)); // ['a', 'b']
console.log(Object.myValues(obj)); // [1, 2]
console.log(Object.myEntries(obj)); // [['a', 1], ['b', 2]]