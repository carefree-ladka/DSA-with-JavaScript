// Longest Prefix Suffix (LPS) Array - Core of KMP
const computeLPS = (pattern) => {
  const lps = [0];
  let len = 0, i = 1;
  
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
};

// Find longest proper prefix which is also suffix
const longestPrefixSuffix = (s) => {
  const lps = computeLPS(s);
  return lps[s.length - 1];
};

// Test Cases
console.log(computeLPS("ABABCABAB")); // [0,0,1,2,0,1,2,3,4]
console.log(longestPrefixSuffix("ABABCABAB")); // 4
console.log(computeLPS("AAAA")); // [0,1,2,3]
console.log(longestPrefixSuffix("abcab")); // 2