/**
 * Custom Bind - Polyfill Function.prototype.bind
 * Time: O(1), Space: O(1)
 */

Function.prototype.customBind = function(context, ...boundArgs) {
  const fn = this;
  
  return function(...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};

// More complete bind implementation
Function.prototype.myBind = function(context, ...boundArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  
  const fn = this;
  
  function BoundFunction(...args) {
    if (new.target) {
      // Called with 'new'
      const instance = Object.create(fn.prototype);
      const result = fn.apply(instance, [...boundArgs, ...args]);
      return result instanceof Object ? result : instance;
    } else {
      // Regular function call
      return fn.apply(context, [...boundArgs, ...args]);
    }
  }
  
  // Maintain prototype chain
  if (fn.prototype) {
    BoundFunction.prototype = Object.create(fn.prototype);
  }
  
  return BoundFunction;
};

// Bind with partial application
function partialBind(func, context, ...partialArgs) {
  return function(...remainingArgs) {
    const args = [...partialArgs];
    let argIndex = 0;
    
    // Fill in placeholders
    for (let i = 0; i < args.length; i++) {
      if (args[i] === partialBind.placeholder) {
        args[i] = remainingArgs[argIndex++];
      }
    }
    
    // Add remaining args
    args.push(...remainingArgs.slice(argIndex));
    
    return func.apply(context, args);
  };
}

partialBind.placeholder = Symbol('placeholder');

// Test Cases
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

const obj = { prefix: 'Mr.' };

const boundGreet = greet.customBind(obj, 'Hello');
console.log(boundGreet('John', '!')); // 'Hello John!'

const myBoundGreet = greet.myBind(obj, 'Hi');
console.log(myBoundGreet('Jane', '.')); // 'Hi Jane.'

// Constructor test
function Person(name) {
  this.name = name;
}

const BoundPerson = Person.myBind(null, 'Default');
const person = new BoundPerson();
console.log(person.name); // 'Default'

// Partial application test
const _ = partialBind.placeholder;
const partialGreet = partialBind(greet, null, _, 'World', '!');
console.log(partialGreet('Hello')); // 'Hello World!'