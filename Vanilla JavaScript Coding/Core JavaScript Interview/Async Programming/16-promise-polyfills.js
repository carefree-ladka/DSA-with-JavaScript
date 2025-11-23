/**
 * Promise Utilities - all, allSettled, any, race polyfills
 * Time: O(n), Space: O(n)
 */

// Promise.all polyfill
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    if (promises.length === 0) {
      return resolve([]);
    }
    
    const results = new Array(promises.length);
    let completedCount = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// Promise.allSettled polyfill
Promise.myAllSettled = function(promises) {
  return new Promise(resolve => {
    if (!Array.isArray(promises)) {
      return resolve([]);
    }
    
    if (promises.length === 0) {
      return resolve([]);
    }
    
    const results = new Array(promises.length);
    let completedCount = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

// Promise.any polyfill
Promise.myAny = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    if (promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }
    
    const errors = new Array(promises.length);
    let rejectedCount = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(error => {
          errors[index] = error;
          rejectedCount++;
          
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};

// Promise.race polyfill
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

// Test Cases
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject('error');

Promise.myAll([p1, p2])
  .then(console.log) // [1, 2]
  .catch(console.error);

Promise.myAllSettled([p1, p2, p3])
  .then(console.log); // [{status: 'fulfilled', value: 1}, ...]

Promise.myAny([p3, p1, p2])
  .then(console.log) // 1 (first fulfilled)
  .catch(console.error);

Promise.myRace([p1, p2])
  .then(console.log); // 1 (first resolved)