/**
 * Deep Equal - Compare nested objects/arrays, dates, NaN, functions, Map/Set
 * Time: O(n), Space: O(n)
 */

function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString();
  
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (let [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key))) return false;
    }
    return true;
  }
  
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (let val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }
  
  if (typeof a !== 'object') return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  
  return true;
}

// Test Cases
console.log(deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})); // true
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual(new Date('2023-01-01'), new Date('2023-01-01'))); // true
console.log(deepEqual(new Map([['a', 1]]), new Map([['a', 1]]))); // true