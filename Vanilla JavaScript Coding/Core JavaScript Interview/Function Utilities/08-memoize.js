/**
 * Memoize - Cache function results with LRU support
 * Time: O(1) lookup, Space: O(n)
 */

function memoize(func, resolver) {
  const cache = new Map();
  
  function memoized(...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }
  
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  
  return memoized;
}

// LRU Memoization
function memoizeLRU(func, maxSize = 100) {
  const cache = new Map();
  
  function memoized(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }
  
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  
  return memoized;
}

// Weak memoization (for object keys)
function memoizeWeak(func) {
  const cache = new WeakMap();
  
  return function(obj, ...args) {
    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }
    
    const objCache = cache.get(obj);
    const key = JSON.stringify(args);
    
    if (objCache.has(key)) {
      return objCache.get(key);
    }
    
    const result = func.call(this, obj, ...args);
    objCache.set(key, result);
    return result;
  };
}

// Test Cases
const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast due to memoization

const expensiveOperation = memoizeLRU(function(x, y) {
  console.log('Computing...', x, y);
  return x * y + Math.random();
}, 3);

console.log(expensiveOperation(2, 3)); // Computing... 2 3
console.log(expensiveOperation(2, 3)); // Cached result