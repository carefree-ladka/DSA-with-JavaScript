// Array Methods Polyfills: map, filter, reduce, forEach

// map polyfill
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};

// filter polyfill
Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// reduce polyfill
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

// forEach polyfill
Array.prototype.myForEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};

// Test Cases
const arr = [1, 2, 3, 4, 5];

console.log(arr.myMap((x) => x * 2)); // [2, 4, 6, 8, 10]
console.log(arr.myFilter((x) => x > 3)); // [4, 5]
console.log(arr.myReduce((acc, x) => acc + x, 0)); // 15

arr.myForEach((x) => console.log(x)); // 1 2 3 4 5
