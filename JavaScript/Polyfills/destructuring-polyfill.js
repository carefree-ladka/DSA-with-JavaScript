// Destructuring Polyfill Helpers

// Array destructuring helper
function destructureArray(array, pattern) {
  const result = {};
  
  pattern.forEach((item, index) => {
    if (typeof item === 'string') {
      result[item] = array[index];
    } else if (item && item.name) {
      result[item.name] = array[index] !== undefined ? array[index] : item.default;
    }
  });
  
  return result;
}

// Object destructuring helper
function destructureObject(obj, pattern) {
  const result = {};
  
  Object.keys(pattern).forEach(key => {
    const mapping = pattern[key];
    
    if (typeof mapping === 'string') {
      result[mapping] = obj[key];
    } else if (mapping && mapping.name) {
      result[mapping.name] = obj[key] !== undefined ? obj[key] : mapping.default;
    } else {
      result[key] = obj[key];
    }
  });
  
  return result;
}

// Rest parameters helper
function restParameters(args, fixedCount) {
  return Array.prototype.slice.call(args, fixedCount);
}

// Spread operator helper for arrays
function spreadArray(...arrays) {
  const result = [];
  arrays.forEach(arr => {
    if (Array.isArray(arr)) {
      result.push(...arr);
    } else {
      result.push(arr);
    }
  });
  return result;
}

// Spread operator helper for objects
function spreadObject(...objects) {
  const result = {};
  objects.forEach(obj => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        result[key] = obj[key];
      });
    }
  });
  return result;
}

// Default parameters helper
function defaultParam(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

// Example transformations
function exampleUsage() {
  // Array destructuring: const [a, b, c = 3] = [1, 2];
  const arr = [1, 2];
  const { a, b, c } = destructureArray(arr, [
    'a', 
    'b', 
    { name: 'c', default: 3 }
  ]);
  console.log(a, b, c); // 1, 2, 3
  
  // Object destructuring: const { name, age = 25 } = person;
  const person = { name: 'John' };
  const { name, age } = destructureObject(person, {
    name: 'name',
    age: { name: 'age', default: 25 }
  });
  console.log(name, age); // John, 25
  
  // Rest parameters: function fn(a, b, ...rest)
  function exampleFunction() {
    const a = arguments[0];
    const b = arguments[1];
    const rest = restParameters(arguments, 2);
    console.log(a, b, rest); // 1, 2, [3, 4, 5]
  }
  exampleFunction(1, 2, 3, 4, 5);
  
  // Spread arrays: [...arr1, ...arr2]
  const arr1 = [1, 2];
  const arr2 = [3, 4];
  const combined = spreadArray(arr1, arr2);
  console.log(combined); // [1, 2, 3, 4]
  
  // Spread objects: {...obj1, ...obj2}
  const obj1 = { a: 1, b: 2 };
  const obj2 = { c: 3, d: 4 };
  const merged = spreadObject(obj1, obj2);
  console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }
}

// Nested destructuring helper
function nestedDestructure(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key];
  }, obj);
}

// Test Cases
exampleUsage();

// Nested example
const nested = { user: { profile: { name: 'Alice' } } };
const userName = nestedDestructure(nested, 'user.profile.name');
console.log(userName); // Alice