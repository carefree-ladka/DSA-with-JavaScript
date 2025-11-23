// Longest repeating character replacement (Variable Window)
const characterReplacement = (s, k) => {
  const count = new Map();
  let left = 0, maxCount = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    count.set(s[right], (count.get(s[right]) || 0) + 1);
    maxCount = Math.max(maxCount, count.get(s[right]));
    
    while (right - left + 1 - maxCount > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
};

// Test Cases
console.log(characterReplacement("ABAB", 2)); // 4
console.log(characterReplacement("AABABBA", 1)); // 4