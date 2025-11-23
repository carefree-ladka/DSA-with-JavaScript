/**
 * Flatten Array - Multi-level array flattening with depth control
 * Time: O(n), Space: O(n)
 */

// Infinite depth flattening
function flatten(arr) {
  const result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Depth-based flattening
function flattenDepth(arr, depth = 1) {
  if (depth === 0) return arr.slice();
  
  const result = [];
  for (let item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenDepth(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Iterative approach (stack-based)
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }
  
  return result.reverse();
}

// Test Cases
console.log(flatten([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]
console.log(flattenDepth([1, [2, [3, 4]], 5], 1)); // [1, 2, [3, 4], 5]
console.log(flattenDepth([1, [2, [3, 4]], 5], 2)); // [1, 2, 3, 4, 5]
console.log(flattenIterative([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]