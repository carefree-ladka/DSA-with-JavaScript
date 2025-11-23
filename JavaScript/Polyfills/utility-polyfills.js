// Utility Function Polyfills

// requestAnimationFrame polyfill
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

// JSON polyfill (simplified)
if (!window.JSON) {
  window.JSON = {
    parse: function(text) {
      return eval('(' + text + ')');
    },
    stringify: function(obj) {
      if (obj === null) return 'null';
      if (typeof obj === 'string') return '"' + obj.replace(/"/g, '\\"') + '"';
      if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
      if (Array.isArray(obj)) {
        return '[' + obj.map(item => JSON.stringify(item)).join(',') + ']';
      }
      if (typeof obj === 'object') {
        const pairs = [];
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            pairs.push(JSON.stringify(key) + ':' + JSON.stringify(obj[key]));
          }
        }
        return '{' + pairs.join(',') + '}';
      }
      return 'undefined';
    }
  };
}

// Array.isArray polyfill
if (!Array.isArray) {
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

// Array.from polyfill
if (!Array.from) {
  Array.from = function(arrayLike, mapFn, thisArg) {
    const result = [];
    const len = arrayLike.length;
    for (let i = 0; i < len; i++) {
      const value = mapFn ? mapFn.call(thisArg, arrayLike[i], i) : arrayLike[i];
      result.push(value);
    }
    return result;
  };
}

// Number.isNaN polyfill
if (!Number.isNaN) {
  Number.isNaN = function(value) {
    return typeof value === 'number' && value !== value;
  };
}

// Number.isInteger polyfill
if (!Number.isInteger) {
  Number.isInteger = function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
}

// Test Cases
console.log(Array.isArray([1, 2, 3])); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isInteger(42)); // true
console.log(JSON.stringify({ a: 1, b: 'hello' })); // '{"a":1,"b":"hello"}'