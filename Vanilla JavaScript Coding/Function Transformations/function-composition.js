// Function Composition - Compose functions right to left
const compose = (functions) => {
  return (x) => {
    for (let i = functions.length - 1; i >= 0; i--) {
      x = functions[i](x);
    }
    return x;
  };
};

// Test Cases
const fn = compose([x => x + 1, x => 2 * x]);
console.log(fn(4)); // 9 (2 * 4 + 1)

const fn2 = compose([x => 10 * x, x => 10 * x, x => 10 * x]);
console.log(fn2(1)); // 1000

const fn3 = compose([]);
console.log(fn3(42)); // 42