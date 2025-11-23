// Promise Polyfill Implementation
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.handlers.forEach(handler => handler.onFulfilled(value));
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.handlers.forEach(handler => handler.onRejected(reason));
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
      const handle = () => {
        if (this.state === 'fulfilled') {
          if (onFulfilled) {
            try {
              resolve(onFulfilled(this.value));
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(this.value);
          }
        } else if (this.state === 'rejected') {
          if (onRejected) {
            try {
              resolve(onRejected(this.value));
            } catch (error) {
              reject(error);
            }
          } else {
            reject(this.value);
          }
        } else {
          this.handlers.push({
            onFulfilled: (value) => {
              if (onFulfilled) {
                try {
                  resolve(onFulfilled(value));
                } catch (error) {
                  reject(error);
                }
              } else {
                resolve(value);
              }
            },
            onRejected: (reason) => {
              if (onRejected) {
                try {
                  resolve(onRejected(reason));
                } catch (error) {
                  reject(error);
                }
              } else {
                reject(reason);
              }
            }
          });
        }
      };
      handle();
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completed = 0;
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve).catch(reject);
      });
    });
  }
}

// Test Cases
const p1 = new MyPromise(resolve => setTimeout(() => resolve('Hello'), 100));
const p2 = new MyPromise(resolve => setTimeout(() => resolve('World'), 200));

p1.then(value => console.log(value)); // Hello
MyPromise.all([p1, p2]).then(values => console.log(values)); // ['Hello', 'World']