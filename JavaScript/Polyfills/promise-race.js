// Promise.race Polyfill
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
const p1 = new Promise(resolve => setTimeout(() => resolve('slow'), 200));
const p2 = new Promise(resolve => setTimeout(() => resolve('fast'), 100));

Promise.myRace([p1, p2]).then(console.log); // 'fast'