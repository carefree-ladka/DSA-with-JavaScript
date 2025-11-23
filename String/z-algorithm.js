// Z Algorithm - Linear time pattern matching
const zAlgorithm = (s) => {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  
  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }
  return z;
};

const zSearch = (text, pattern) => {
  const combined = pattern + "$" + text;
  const z = zAlgorithm(combined);
  const result = [];
  
  for (let i = pattern.length + 1; i < combined.length; i++) {
    if (z[i] === pattern.length) {
      result.push(i - pattern.length - 1);
    }
  }
  return result;
};

// Test Cases
console.log(zSearch("AABAACAADAABAABA", "AABA")); // [0, 9, 12]
console.log(zSearch("GEEKS FOR GEEKS", "GEEK")); // [0, 10]
console.log(zAlgorithm("aaabaaab")); // [0,2,1,0,3,2,1,0]