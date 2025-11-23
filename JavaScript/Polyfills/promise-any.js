// Promise.any Polyfill
Promise.myAny = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    if (promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }
    
    const errors = [];
    let rejected = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reason => {
          errors[index] = reason;
          rejected++;
          if (rejected === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};

// Test Cases
const p1 = Promise.reject('error1');
const p2 = Promise.resolve(2);
const p3 = Promise.reject('error3');

Promise.myAny([p1, p2, p3]).then(console.log); // 2