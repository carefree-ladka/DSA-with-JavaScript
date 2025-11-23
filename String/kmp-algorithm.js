// KMP Algorithm - Pattern matching with failure function
const kmpSearch = (text, pattern) => {
  const buildLPS = (pattern) => {
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
  
  const lps = buildLPS(pattern);
  const result = [];
  let i = 0, j = 0;
  
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++; j++;
    }
    if (j === pattern.length) {
      result.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      j ? j = lps[j - 1] : i++;
    }
  }
  return result;
};

// Test Cases
console.log(kmpSearch("ABABDABACDABABCABCABCABCABC", "ABABCABCABCABC")); // [15]
console.log(kmpSearch("AABAACAADAABAABA", "AABA")); // [0, 9, 12]
console.log(kmpSearch("hello", "ll")); // [2]