// Find the Index of the First Occurrence in a String - Find needle in haystack
const strStr = (haystack, needle) => {
  if (!needle) return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) return i;
  }
  return -1;
};

// Test Cases
console.log(strStr("sadbutsad", "sad")); // 0
console.log(strStr("leetcode", "leeto")); // -1