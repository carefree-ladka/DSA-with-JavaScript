/**
 * Pipe & Compose - Functional composition utilities
 * Time: O(n), Space: O(1)
 */

// Pipe - left to right composition
function pipe(...functions) {
  if (functions.length === 0) {
    return (value) => value;
  }
  
  if (functions.length === 1) {
    return functions[0];
  }
  
  return function(value) {
    return functions.reduce((acc, fn) => fn(acc), value);
  };
}

// Compose - right to left composition
function compose(...functions) {
  if (functions.length === 0) {
    return (value) => value;
  }
  
  if (functions.length === 1) {
    return functions[0];
  }
  
  return function(value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

// Async pipe
function pipeAsync(...functions) {
  return async function(value) {
    let result = value;
    for (const fn of functions) {
      result = await fn(result);
    }
    return result;
  };
}

// Async compose
function composeAsync(...functions) {
  return async function(value) {
    let result = value;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = await functions[i](result);
    }
    return result;
  };
}

// Pipe with error handling
function pipeSafe(...functions) {
  return function(value) {
    try {
      return functions.reduce((acc, fn) => {
        if (acc instanceof Error) return acc;
        try {
          return fn(acc);
        } catch (error) {
          return error;
        }
      }, value);
    } catch (error) {
      return error;
    }
  };
}

// Conditional pipe
function pipeIf(condition, ...functions) {
  return function(value) {
    if (condition(value)) {
      return pipe(...functions)(value);
    }
    return value;
  };
}

// Test Cases
const add = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

// Pipe: add -> double -> square
const pipeResult = pipe(add, double, square);
console.log(pipeResult(3)); // ((3 + 1) * 2)² = 64

// Compose: square -> double -> add
const composeResult = compose(square, double, add);
console.log(composeResult(3)); // (3 + 1) * 2)² = 64

// Async example
const asyncAdd = async (x) => x + 1;
const asyncDouble = async (x) => x * 2;

pipeAsync(asyncAdd, asyncDouble)(5)
  .then(console.log); // 12

// Safe pipe with error handling
const throwError = (x) => {
  if (x > 10) throw new Error('Too big!');
  return x;
};

const safeResult = pipeSafe(add, double, throwError, square);
console.log(safeResult(6)); // Error: Too big!

// Conditional pipe
const isEven = (x) => x % 2 === 0;
const conditionalPipe = pipeIf(isEven, double, add);
console.log(conditionalPipe(4)); // 9 (4 * 2 + 1)
console.log(conditionalPipe(3)); // 3 (unchanged)