// Iterator Polyfill
if (!Symbol.iterator) {
  Symbol.iterator = Symbol('Symbol.iterator');
}

// Array Iterator
if (!Array.prototype[Symbol.iterator]) {
  Array.prototype[Symbol.iterator] = function() {
    let index = 0;
    const array = this;
    return {
      next: function() {
        if (index < array.length) {
          return { value: array[index++], done: false };
        }
        return { done: true };
      }
    };
  };
}

// String Iterator
if (!String.prototype[Symbol.iterator]) {
  String.prototype[Symbol.iterator] = function() {
    let index = 0;
    const string = this;
    return {
      next: function() {
        if (index < string.length) {
          return { value: string[index++], done: false };
        }
        return { done: true };
      }
    };
  };
}

// Generator Function Polyfill (simplified)
function createGenerator(generatorFunction) {
  return function(...args) {
    const context = { done: false, value: undefined };
    const iterator = generatorFunction.apply(this, args);
    
    return {
      next: function(value) {
        try {
          const result = iterator.next ? iterator.next(value) : { done: true };
          return result;
        } catch (error) {
          context.done = true;
          throw error;
        }
      },
      [Symbol.iterator]: function() {
        return this;
      }
    };
  };
}

// for...of polyfill
if (!window.forOf) {
  window.forOf = function(iterable, callback) {
    const iterator = iterable[Symbol.iterator]();
    let result = iterator.next();
    
    while (!result.done) {
      callback(result.value);
      result = iterator.next();
    }
  };
}

// Test Cases
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }

forOf([1, 2, 3], value => console.log(value)); // 1, 2, 3