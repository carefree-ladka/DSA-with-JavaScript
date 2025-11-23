/**
 * Curry - Function currying with unknown arguments
 * Time: O(1), Space: O(n)
 */

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}

// Advanced curry with placeholder support
function curryAdvanced(func, arity = func.length) {
  const placeholder = curryAdvanced.placeholder;
  
  return function curried(...args) {
    // Replace placeholders with actual arguments
    const resolvedArgs = [];
    let argIndex = 0;
    
    for (let i = 0; i < args.length; i++) {
      if (args[i] === placeholder) {
        resolvedArgs.push(placeholder);
      } else {
        resolvedArgs.push(args[i]);
      }
    }
    
    // Count non-placeholder arguments
    const filledArgs = resolvedArgs.filter(arg => arg !== placeholder);
    
    if (filledArgs.length >= arity) {
      // Remove placeholders and call function
      const finalArgs = resolvedArgs
        .filter(arg => arg !== placeholder)
        .slice(0, arity);
      return func.apply(this, finalArgs);
    }
    
    return function(...nextArgs) {
      const newArgs = [...resolvedArgs];
      let nextIndex = 0;
      
      // Fill placeholders first
      for (let i = 0; i < newArgs.length && nextIndex < nextArgs.length; i++) {
        if (newArgs[i] === placeholder) {
          newArgs[i] = nextArgs[nextIndex++];
        }
      }
      
      // Add remaining arguments
      newArgs.push(...nextArgs.slice(nextIndex));
      
      return curried.apply(this, newArgs);
    };
  };
}

curryAdvanced.placeholder = Symbol('placeholder');

// Partial application (similar to curry but different behavior)
function partial(func, ...partialArgs) {
  return function(...remainingArgs) {
    return func.apply(this, [...partialArgs, ...remainingArgs]);
  };
}

// Curry with context binding
function curryBind(func, context) {
  const curried = curry(func);
  
  return function(...args) {
    const result = curried.apply(context, args);
    return typeof result === 'function' 
      ? curryBind(result, context)
      : result;
  };
}

// Auto-curry (automatically curry all functions)
function autoCurry(func) {
  if (func.length <= 1) return func;
  
  return curry(func);
}

// Test Cases
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Advanced curry with placeholders
const _ = curryAdvanced.placeholder;
const advancedAdd = curryAdvanced(add);

console.log(advancedAdd(_, 2, _)(1, 3)); // 6
console.log(advancedAdd(1, _, 3)(2)); // 6

// Partial application
const partialAdd = partial(add, 1, 2);
console.log(partialAdd(3)); // 6

// Real-world example: API request builder
function makeRequest(method, url, headers, body) {
  return { method, url, headers, body };
}

const curriedRequest = curry(makeRequest);
const get = curriedRequest('GET');
const getFromAPI = get('https://api.example.com');
const getUsers = getFromAPI({ 'Authorization': 'Bearer token' });

console.log(getUsers(null)); // GET request object