/**
 * Custom Promise Implementation with microtask queue
 * Time: O(1), Space: O(n)
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback());
      }
    };
    
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback());
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            if (typeof onFulfilled === 'function') {
              const result = onFulfilled(this.value);
              resolvePromise(result, resolve, reject);
            } else {
              resolve(this.value);
            }
          } catch (error) {
            reject(error);
          }
        });
      };
      
      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            if (typeof onRejected === 'function') {
              const result = onRejected(this.reason);
              resolvePromise(result, resolve, reject);
            } else {
              reject(this.reason);
            }
          } catch (error) {
            reject(error);
          }
        });
      };
      
      if (this.state === FULFILLED) {
        handleFulfilled();
      } else if (this.state === REJECTED) {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(onFinally) {
    return this.then(
      value => MyPromise.resolve(onFinally()).then(() => value),
      reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
    );
  }
  
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }
      
      if (promises.length === 0) {
        return resolve([]);
      }
      
      const results = new Array(promises.length);
      let completedCount = 0;
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise)
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
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }
      
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve).catch(reject);
      });
    });
  }
}

function resolvePromise(result, resolve, reject) {
  if (result instanceof MyPromise) {
    result.then(resolve, reject);
  } else if (result && typeof result.then === 'function') {
    // Thenable
    try {
      result.then(resolve, reject);
    } catch (error) {
      reject(error);
    }
  } else {
    resolve(result);
  }
}

// Test Cases
const promise1 = new MyPromise((resolve) => {
  setTimeout(() => resolve('Hello'), 1000);
});

const promise2 = promise1.then(value => {
  console.log(value); // 'Hello'
  return value + ' World';
});

promise2.then(value => {
  console.log(value); // 'Hello World'
});

// Error handling test
const errorPromise = new MyPromise((_, reject) => {
  setTimeout(() => reject(new Error('Test error')), 500);
});

errorPromise.catch(error => {
  console.log('Caught:', error.message); // 'Caught: Test error'
});

// Static methods test
MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2),
  MyPromise.resolve(3)
]).then(console.log); // [1, 2, 3]