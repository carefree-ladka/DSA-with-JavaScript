// Promise.allSettled Polyfill
Promise.myAllSettled = function(promises) {
  return new Promise(resolve => {
    if (!Array.isArray(promises)) {
      return resolve([]);
    }
    
    if (promises.length === 0) {
      return resolve([]);
    }
    
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

// Test Cases
const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = Promise.resolve(3);

Promise.myAllSettled([p1, p2, p3]).then(console.log);
// [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'error' }, { status: 'fulfilled', value: 3 }]