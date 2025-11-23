// Function Methods Polyfills: call, apply, bind

// call polyfill
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// apply polyfill
Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// bind polyfill
Function.prototype.myBind = function (context, ...args1) {
  const fn = this;
  return function (...args2) {
    return fn.myApply(context, [...args1, ...args2]);
  };
};

// Test Cases
const obj = { name: "John", age: 30 };

function greet(greeting, punctuation) {
  return `${greeting} ${this.name}${punctuation}`;
}

console.log(greet.myCall(obj, "Hello", "!")); // Hello John!
console.log(greet.myApply(obj, ["Hi", "."])); // Hi John.

const boundGreet = greet.myBind(obj, "Hey");
console.log(boundGreet("?")); // Hey John?
