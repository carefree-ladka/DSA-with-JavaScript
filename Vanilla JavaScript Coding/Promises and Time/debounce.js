// Debounce - Delay function execution until after delay
const debounce = (fn, t) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), t);
  };
};

// Test Cases
const log = debounce(console.log, 100);
log('Hello'); // cancelled
log('Hello'); // cancelled  
log('Hello'); // Logged at t=100ms