// Valid Parentheses - Check if parentheses are valid
const isValid = (s) => {
  const stack = [];
  const map = {')': '(', '}': '{', ']': '['};
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
};

// Test Cases
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false