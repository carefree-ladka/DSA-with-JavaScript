// Simplify Path - Simplify Unix-style file path
const simplifyPath = (path) => {
  const stack = [];
  const parts = path.split('/');
  
  for (let part of parts) {
    if (part === '..') {
      stack.pop();
    } else if (part && part !== '.') {
      stack.push(part);
    }
  }
  
  return '/' + stack.join('/');
};

// Test Cases
console.log(simplifyPath("/home/")); // "/home"
console.log(simplifyPath("/../")); // "/"
console.log(simplifyPath("/home//foo/")); // "/home/foo"
console.log(simplifyPath("/a/./b/../../c/")); // "/c"