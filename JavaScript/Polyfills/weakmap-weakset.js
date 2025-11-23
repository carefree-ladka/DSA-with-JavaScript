// WeakMap Polyfill
function MyWeakMap() {
  this._id = '__weakmap_' + Math.random();
}

MyWeakMap.prototype.set = function(key, value) {
  if (typeof key !== 'object' || key === null) {
    throw new TypeError('Invalid value used as weak map key');
  }
  Object.defineProperty(key, this._id, { value: value, configurable: true });
  return this;
};

MyWeakMap.prototype.get = function(key) {
  if (typeof key !== 'object' || key === null) return undefined;
  return key[this._id];
};

MyWeakMap.prototype.has = function(key) {
  if (typeof key !== 'object' || key === null) return false;
  return this._id in key;
};

MyWeakMap.prototype.delete = function(key) {
  if (typeof key !== 'object' || key === null) return false;
  if (this._id in key) {
    delete key[this._id];
    return true;
  }
  return false;
};

// WeakSet Polyfill
function MyWeakSet() {
  this._id = '__weakset_' + Math.random();
}

MyWeakSet.prototype.add = function(value) {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError('Invalid value used in weak set');
  }
  Object.defineProperty(value, this._id, { value: true, configurable: true });
  return this;
};

MyWeakSet.prototype.has = function(value) {
  if (typeof value !== 'object' || value === null) return false;
  return this._id in value;
};

MyWeakSet.prototype.delete = function(value) {
  if (typeof value !== 'object' || value === null) return false;
  if (this._id in value) {
    delete value[this._id];
    return true;
  }
  return false;
};

// Test Cases
const wm = new MyWeakMap();
const obj = {};
wm.set(obj, 'value');
console.log(wm.get(obj)); // 'value'

const ws = new MyWeakSet();
ws.add(obj);
console.log(ws.has(obj)); // true