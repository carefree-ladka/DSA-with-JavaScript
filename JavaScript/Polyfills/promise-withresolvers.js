// Promise.withResolvers Polyfill
Promise.myWithResolvers = function() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  
  return { promise, resolve, reject };
};

// Test Cases
const { promise, resolve, reject } = Promise.myWithResolvers();

setTimeout(() => resolve('resolved after 1s'), 1000);
promise.then(console.log); // 'resolved after 1s'

// Usage example
function createDeferredPromise() {
  const { promise, resolve, reject } = Promise.myWithResolvers();
  
  // Can resolve/reject from outside
  setTimeout(() => resolve('deferred result'), 500);
  
  return promise;
}

createDeferredPromise().then(console.log); // 'deferred result'