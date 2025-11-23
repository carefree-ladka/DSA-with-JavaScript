// Extended Array Methods Polyfills

// Array.find
Array.prototype.myFind = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

// Array.findIndex
Array.prototype.myFindIndex = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      return i;
    }
  }
  return -1;
};

// Array.includes
Array.prototype.myIncludes = function(searchElement, fromIndex = 0) {
  const len = this.length;
  const start = fromIndex < 0 ? Math.max(0, len + fromIndex) : fromIndex;
  
  for (let i = start; i < len; i++) {
    if (this[i] === searchElement || (Number.isNaN(this[i]) && Number.isNaN(searchElement))) {
      return true;
    }
  }
  return false;
};

// Array.some
Array.prototype.mySome = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      return true;
    }
  }
  return false;
};

// Array.every
Array.prototype.myEvery = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && !callback.call(thisArg, this[i], i, this)) {
      return false;
    }
  }
  return true;
};

// Array.flat
Array.prototype.myFlat = function(depth = 1) {
  const flatten = (arr, d) => {
    return d > 0 ? arr.reduce((acc, val) => 
      acc.concat(Array.isArray(val) ? flatten(val, d - 1) : val), []) : arr.slice();
  };
  return flatten(this, depth);
};

// Test Cases
const arr = [1, 2, 3, 4, 5];
console.log(arr.myFind(x => x > 3)); // 4
console.log(arr.myIncludes(3)); // true
console.log(arr.mySome(x => x > 4)); // true
console.log(arr.myEvery(x => x > 0)); // true