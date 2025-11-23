/**
 * Deep Clone - Handle arrays, nested objects, dates, maps, sets, circular refs, functions
 * Time: O(n), Space: O(n)
 */

function deepClone(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (visited.has(obj)) return visited.get(obj);
  
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    const cloned = new Map();
    visited.set(obj, cloned);
    obj.forEach((val, key) => cloned.set(deepClone(key, visited), deepClone(val, visited)));
    return cloned;
  }
  if (obj instanceof Set) {
    const cloned = new Set();
    visited.set(obj, cloned);
    obj.forEach(val => cloned.add(deepClone(val, visited)));
    return cloned;
  }
  
  const cloned = Array.isArray(obj) ? [] : {};
  visited.set(obj, cloned);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key], visited);
    }
  }
  
  return cloned;
}

// Test Cases
const original = {
  a: 1,
  b: { c: 2, d: [3, 4] },
  e: new Date(),
  f: new Map([['key', 'value']]),
  g: new Set([1, 2, 3])
};
original.circular = original;

const cloned = deepClone(original);
console.log(cloned.b !== original.b); // true
console.log(cloned.circular === cloned); // true