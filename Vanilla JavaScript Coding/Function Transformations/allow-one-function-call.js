// Allow One Function Call - Function that can only be called once
const once = (fn) => {
  let called = false;
  return (...args) => {
    if (!called) {
      called = true;
      return fn(...args);
    }
    return undefined;
  };
};

// Test Cases
const fn = once((a, b, c) => a + b + c);
console.log(fn(1, 2, 3)); // 6
console.log(fn(2, 3, 6)); // undefined