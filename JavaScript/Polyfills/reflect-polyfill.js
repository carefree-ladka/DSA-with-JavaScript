// Reflect API Polyfill
if (!window.Reflect) {
  window.Reflect = {};
}

// Reflect.apply
if (!Reflect.apply) {
  Reflect.apply = function(target, thisArgument, argumentsList) {
    return Function.prototype.apply.call(target, thisArgument, argumentsList);
  };
}

// Reflect.construct
if (!Reflect.construct) {
  Reflect.construct = function(target, argumentsList, newTarget) {
    newTarget = newTarget || target;
    const instance = Object.create(newTarget.prototype);
    const result = target.apply(instance, argumentsList);
    return (typeof result === 'object' && result !== null) ? result : instance;
  };
}

// Reflect.get
if (!Reflect.get) {
  Reflect.get = function(target, propertyKey, receiver) {
    return target[propertyKey];
  };
}

// Reflect.set
if (!Reflect.set) {
  Reflect.set = function(target, propertyKey, value, receiver) {
    target[propertyKey] = value;
    return true;
  };
}

// Reflect.has
if (!Reflect.has) {
  Reflect.has = function(target, propertyKey) {
    return propertyKey in target;
  };
}

// Reflect.deleteProperty
if (!Reflect.deleteProperty) {
  Reflect.deleteProperty = function(target, propertyKey) {
    delete target[propertyKey];
    return true;
  };
}

// Reflect.ownKeys
if (!Reflect.ownKeys) {
  Reflect.ownKeys = function(target) {
    const keys = Object.getOwnPropertyNames(target);
    if (Object.getOwnPropertySymbols) {
      keys.push(...Object.getOwnPropertySymbols(target));
    }
    return keys;
  };
}

// Reflect.getPrototypeOf
if (!Reflect.getPrototypeOf) {
  Reflect.getPrototypeOf = function(target) {
    return Object.getPrototypeOf(target);
  };
}

// Reflect.setPrototypeOf
if (!Reflect.setPrototypeOf) {
  Reflect.setPrototypeOf = function(target, prototype) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(target, prototype);
      return true;
    }
    return false;
  };
}

// Test Cases
const obj = { a: 1 };
console.log(Reflect.get(obj, 'a')); // 1
console.log(Reflect.has(obj, 'a')); // true
Reflect.set(obj, 'b', 2);
console.log(obj.b); // 2