// Async/Await Polyfill using Generators
function asyncToGenerator(generatorFunction) {
  return function(...args) {
    const generator = generatorFunction.apply(this, args);
    
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        try {
          const info = generator[key](arg);
          const { value, done } = info;
          
          if (done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(
              result => step('next', result),
              error => step('throw', error)
            );
          }
        } catch (error) {
          reject(error);
        }
      }
      
      step('next');
    });
  };
}

// Async function polyfill
function createAsyncFunction(generatorFunction) {
  const asyncFn = asyncToGenerator(generatorFunction);
  asyncFn.constructor = AsyncFunction;
  return asyncFn;
}

// AsyncFunction constructor
function AsyncFunction() {
  return Function.apply(this, arguments);
}

// Helper for await
function awaitHelper(value) {
  return Promise.resolve(value);
}

// Transform async/await syntax (manual transformation needed)
function transformAsync(fn) {
  return asyncToGenerator(function* () {
    return yield* fn.call(this);
  });
}

// Example usage with manual transformation
const asyncExample = asyncToGenerator(function* () {
  try {
    const result1 = yield Promise.resolve('First');
    console.log(result1);
    
    const result2 = yield Promise.resolve('Second');
    console.log(result2);
    
    return 'Done';
  } catch (error) {
    console.error('Error:', error);
  }
});

// Test Cases
asyncExample().then(result => console.log('Final:', result));

// Manual async function creation
const myAsyncFunction = asyncToGenerator(function* (value) {
  const doubled = yield Promise.resolve(value * 2);
  const tripled = yield Promise.resolve(doubled * 1.5);
  return tripled;
});

myAsyncFunction(10).then(console.log); // 30