/**
 * Once - Create a function that runs only once
 * Time: O(1), Space: O(1)
 */

function once(func) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

// Advanced once with reset capability
function onceWithReset(func) {
  let called = false;
  let result;
  
  function onceFunc(...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  }
  
  onceFunc.reset = function() {
    called = false;
    result = undefined;
  };
  
  return onceFunc;
}

// Before function (opposite of once)
function before(n, func) {
  let count = 0;
  let result;
  
  return function(...args) {
    if (count < n) {
      count++;
      result = func.apply(this, args);
    }
    return result;
  };
}

// After function
function after(n, func) {
  let count = 0;
  
  return function(...args) {
    count++;
    if (count >= n) {
      return func.apply(this, args);
    }
  };
}

// Test Cases
const initialize = once(() => {
  console.log('Initialized!');
  return 'setup complete';
});

console.log(initialize()); // 'Initialized!' -> 'setup complete'
console.log(initialize()); // 'setup complete' (no log)

const resetOnce = onceWithReset(() => console.log('Reset test'));
resetOnce(); // 'Reset test'
resetOnce(); // (nothing)
resetOnce.reset();
resetOnce(); // 'Reset test'

const afterThree = after(3, () => console.log('After 3 calls'));
afterThree(); // (nothing)
afterThree(); // (nothing)  
afterThree(); // 'After 3 calls'