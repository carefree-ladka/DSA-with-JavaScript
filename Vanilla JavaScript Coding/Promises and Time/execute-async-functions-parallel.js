// Execute Asynchronous Functions in Parallel - Custom Promise.all
const promiseAll = (functions) => {
  return new Promise((resolve, reject) => {
    if (functions.length === 0) {
      resolve([]);
      return;
    }
    
    const results = new Array(functions.length);
    let completedCount = 0;
    
    functions.forEach((fn, index) => {
      fn()
        .then(value => {
          results[index] = value;
          completedCount++;
          if (completedCount === functions.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// Test Cases
const promise1 = () => new Promise(resolve => setTimeout(() => resolve(4), 50));
const promise2 = () => new Promise(resolve => setTimeout(() => resolve(10), 150)); 
const promise3 = () => new Promise(resolve => setTimeout(() => resolve(16), 100));

promiseAll([promise1, promise2, promise3]).then(console.log); // [4, 10, 16]