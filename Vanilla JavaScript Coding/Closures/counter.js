// Counter - Create counter function using closure
const createCounter = (n) => {
  return () => n++;
};

// Test Cases
const counter = createCounter(10);
console.log(counter()); // 10
console.log(counter()); // 11
console.log(counter()); // 12