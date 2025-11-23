// Timeout Cancellation - Cancellable delayed function
const cancellable = (fn, args, t) => {
  const timeoutId = setTimeout(() => fn(...args), t);
  return () => clearTimeout(timeoutId);
};

// Test Cases
const result = [];
const fn = (x) => x * 5;
const args = [2], t = 20, cancelTimeMs = 50;

const start = performance.now();
const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({"time": diff, "returned": fn(...argsArr)});
};

const cancel = cancellable(log, args, t);
setTimeout(cancel, cancelTimeMs);

setTimeout(() => console.log(result), 100); // [{"time": 20, "returned": 10}]