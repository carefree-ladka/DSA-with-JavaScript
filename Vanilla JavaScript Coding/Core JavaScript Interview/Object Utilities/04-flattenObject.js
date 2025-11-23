/**
 * Flatten Object - Convert nested objects to dot notation
 * Time: O(n), Space: O(n)
 */

function flattenObject(obj, prefix = '', result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            flattenObject(item, `${newKey}.${index}`, result);
          } else {
            result[`${newKey}.${index}`] = item;
          }
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

// Unflatten (reverse operation)
function unflattenObject(obj) {
  const result = {};
  
  for (let key in obj) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      const nextKey = keys[i + 1];
      
      if (!(k in current)) {
        current[k] = /^\d+$/.test(nextKey) ? [] : {};
      }
      current = current[k];
    }
    
    current[keys[keys.length - 1]] = obj[key];
  }
  
  return result;
}

// Test Cases
const nested = {
  a: { b: 1, c: { d: 2 } },
  e: [3, { f: 4 }, 5],
  arr: [[1, 2], [{ x: 3 }, 4]],
  mixed: { items: [{ id: 1, tags: ['a', 'b'] }, { id: 2 }] }
};

const flattened = flattenObject(nested);
console.log(flattened);
// {
//   "a.b": 1, "a.c.d": 2, "e.0": 3, "e.1.f": 4, "e.2": 5,
//   "arr.0.0": 1, "arr.0.1": 2, "arr.1.0.x": 3, "arr.1.1": 4,
//   "mixed.items.0.id": 1, "mixed.items.0.tags.0": 'a', "mixed.items.0.tags.1": 'b', "mixed.items.1.id": 2
// }

const unflattened = unflattenObject(flattened);
console.log(JSON.stringify(unflattened, null, 2)); // Original structure restored