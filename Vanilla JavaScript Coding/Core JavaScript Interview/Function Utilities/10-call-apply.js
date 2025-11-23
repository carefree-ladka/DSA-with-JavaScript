/**
 * Custom Call & Apply - Manual implementation
 * Time: O(1), Space: O(1)
 */

Function.prototype.customCall = function(context, ...args) {
  context = context || globalThis;
  
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  
  return result;
};

Function.prototype.customApply = function(context, argsArray) {
  context = context || globalThis;
  argsArray = argsArray || [];
  
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  const result = context[fnSymbol](...argsArray);
  delete context[fnSymbol];
  
  return result;
};

// More robust implementations
Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall must be called on a function');
  }
  
  context = context == null ? globalThis : Object(context);
  
  const fnSymbol = Symbol('tempFunction');
  const descriptor = {
    value: this,
    enumerable: false,
    writable: true,
    configurable: true
  };
  
  Object.defineProperty(context, fnSymbol, descriptor);
  
  try {
    const result = context[fnSymbol](...args);
    return result;
  } finally {
    delete context[fnSymbol];
  }
};

Function.prototype.myApply = function(context, argsArray) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function');
  }
  
  context = context == null ? globalThis : Object(context);
  
  if (argsArray != null && typeof argsArray !== 'object') {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }
  
  const args = argsArray ? Array.from(argsArray) : [];
  
  return this.myCall(context, ...args);
};

// Test Cases
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

console.log(introduce.customCall(person, 'Hello', '!')); // "Hello, I'm Alice!"
console.log(introduce.customApply(person, ['Hi', '.'])); // "Hi, I'm Alice."

console.log(introduce.myCall(person, 'Hey', '?')); // "Hey, I'm Alice?"
console.log(introduce.myApply(person, ['Greetings', '...'])); // "Greetings, I'm Alice..."

// Edge case tests
console.log(introduce.myCall(null, 'Hello', '!')); // Uses globalThis
console.log(introduce.myApply(undefined, ['Hi', '.'])); // Uses globalThis