// Set Polyfill
function MySet(iterable) {
  this._values = [];
  
  if (iterable) {
    for (const value of iterable) {
      this.add(value);
    }
  }
}

MySet.prototype.add = function(value) {
  if (!this.has(value)) {
    this._values.push(value);
  }
  return this;
};

MySet.prototype.has = function(value) {
  return this._values.indexOf(value) !== -1;
};

MySet.prototype.delete = function(value) {
  const index = this._values.indexOf(value);
  if (index !== -1) {
    this._values.splice(index, 1);
    return true;
  }
  return false;
};

MySet.prototype.clear = function() {
  this._values = [];
};

Object.defineProperty(MySet.prototype, 'size', {
  get: function() { return this._values.length; }
});

// Map Polyfill
function MyMap(iterable) {
  this._keys = [];
  this._values = [];
  
  if (iterable) {
    for (const [key, value] of iterable) {
      this.set(key, value);
    }
  }
}

MyMap.prototype.set = function(key, value) {
  const index = this._keys.indexOf(key);
  if (index !== -1) {
    this._values[index] = value;
  } else {
    this._keys.push(key);
    this._values.push(value);
  }
  return this;
};

MyMap.prototype.get = function(key) {
  const index = this._keys.indexOf(key);
  return index !== -1 ? this._values[index] : undefined;
};

MyMap.prototype.has = function(key) {
  return this._keys.indexOf(key) !== -1;
};

MyMap.prototype.delete = function(key) {
  const index = this._keys.indexOf(key);
  if (index !== -1) {
    this._keys.splice(index, 1);
    this._values.splice(index, 1);
    return true;
  }
  return false;
};

MyMap.prototype.clear = function() {
  this._keys = [];
  this._values = [];
};

Object.defineProperty(MyMap.prototype, 'size', {
  get: function() { return this._keys.length; }
});

// Test Cases
const set = new MySet([1, 2, 3]);
console.log(set.has(2)); // true
console.log(set.size); // 3

const map = new MyMap([['a', 1], ['b', 2]]);
console.log(map.get('a')); // 1
console.log(map.size); // 2