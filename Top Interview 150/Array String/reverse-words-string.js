// Reverse Words in a String - Reverse word order
const reverseWords = (s) => {
  return s.trim().split(/\s+/).reverse().join(' ');
};

// Test Cases
console.log(reverseWords("the sky is blue")); // "blue is sky the"
console.log(reverseWords("  hello world  ")); // "world hello"
console.log(reverseWords("a good   example")); // "example good a"