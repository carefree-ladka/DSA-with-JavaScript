/**
 * Promisify - Convert callback functions to promises
 * Time: O(1), Space: O(1)
 */

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Promisify with custom callback pattern
function promisifyCustom(fn, callbackPattern = 'error-first') {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const callback = callbackPattern === 'error-first'
        ? (error, result) => error ? reject(error) : resolve(result)
        : (result, error) => error ? reject(error) : resolve(result);
      
      fn.call(this, ...args, callback);
    });
  };
}

// Promisify all methods of an object
function promisifyAll(obj, suffix = 'Async') {
  const promisified = {};
  
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      promisified[key + suffix] = promisify(obj[key].bind(obj));
      promisified[key] = obj[key].bind(obj); // Keep original
    } else {
      promisified[key] = obj[key];
    }
  }
  
  return promisified;
}

// Callbackify (reverse of promisify)
function callbackify(fn) {
  return function(...args) {
    const callback = args.pop();
    
    if (typeof callback !== 'function') {
      throw new TypeError('Last argument must be a callback function');
    }
    
    Promise.resolve()
      .then(() => fn.apply(this, args))
      .then(result => callback(null, result))
      .catch(error => callback(error));
  };
}

// Promisify with timeout
function promisifyWithTimeout(fn, timeout = 5000) {
  const promisified = promisify(fn);
  
  return function(...args) {
    return Promise.race([
      promisified.apply(this, args),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timeout')), timeout)
      )
    ]);
  };
}

// Test Cases
// Simulate Node.js fs.readFile
function readFile(filename, callback) {
  setTimeout(() => {
    if (filename === 'error.txt') {
      callback(new Error('File not found'));
    } else {
      callback(null, `Contents of ${filename}`);
    }
  }, 100);
}

const readFileAsync = promisify(readFile);

readFileAsync('test.txt')
  .then(console.log) // 'Contents of test.txt'
  .catch(console.error);

readFileAsync('error.txt')
  .then(console.log)
  .catch(console.error); // Error: File not found

// Promisify object methods
const fileSystem = {
  readFile,
  writeFile(filename, data, callback) {
    setTimeout(() => callback(null, `Written to ${filename}`), 50);
  }
};

const fsAsync = promisifyAll(fileSystem);

fsAsync.readFileAsync('test.txt')
  .then(console.log);

fsAsync.writeFileAsync('output.txt', 'data')
  .then(console.log);

// Callbackify test
const asyncFunction = async (x, y) => x + y;
const callbackVersion = callbackify(asyncFunction);

callbackVersion(2, 3, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result); // 5
  }
});