// Promise.withTry Polyfill (Proposed)
Promise.myWithTry = function(fn) {
  return new Promise(resolve => {
    resolve(fn());
  });
};

// Alternative implementation with immediate execution
Promise.myTry = function(fn) {
  try {
    const result = fn();
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Test Cases
Promise.myWithTry(() => 'success').then(console.log); // 'success'

Promise.myWithTry(() => {
  throw new Error('failed');
}).catch(console.log); // Error: failed

Promise.myTry(() => 42).then(console.log); // 42

Promise.myTry(() => {
  if (Math.random() > 0.5) throw new Error('random error');
  return 'lucky';
}).then(console.log).catch(console.log);