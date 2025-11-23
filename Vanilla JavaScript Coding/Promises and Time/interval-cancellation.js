// Interval Cancellation - Cancellable repeated function
const cancellable = (fn, args, t) => {
  fn(...args);
  const intervalId = setInterval(() => fn(...args), t);
  return () => clearInterval(intervalId);
};

// Test Cases
const result = [];
const fn = (x) => x * 2;
const args = [4], t = 35, cancelTimeMs = 190;

const start = performance.now();
const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({"time": diff, "returned": fn(...argsArr)});
};

const cancel = cancellable(log, args, t);
setTimeout(cancel, cancelTimeMs);

setTimeout(() => console.log(result), 300);
// [{"time": 0, "returned": 8}, {"time": 35, "returned": 8}, ...]