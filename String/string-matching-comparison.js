// String Matching Algorithms Comparison
const naiveSearch = (text, pattern) => {
  const result = [];
  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j = 0;
    while (j < pattern.length && text[i + j] === pattern[j]) j++;
    if (j === pattern.length) result.push(i);
  }
  return result;
};

// Performance comparison function
const compareAlgorithms = (text, pattern) => {
  console.log(`Text: "${text}"`);
  console.log(`Pattern: "${pattern}"`);
  console.log("Naive:", naiveSearch(text, pattern));
  console.log("KMP:", kmpSearch(text, pattern));
  console.log("Rabin-Karp:", rabinKarp(text, pattern));
  console.log("Z Algorithm:", zSearch(text, pattern));
  console.log("---");
};

// Test Cases
const testText = "AABAACAADAABAABA";
const testPattern = "AABA";
compareAlgorithms(testText, testPattern);

// Time Complexities:
// Naive: O(nm) worst case
// KMP: O(n + m) 
// Rabin-Karp: O(n + m) average, O(nm) worst
// Z Algorithm: O(n + m)