// Rabin-Karp Algorithm - Rolling hash pattern matching
const rabinKarp = (text, pattern) => {
  const base = 256, mod = 101;
  const m = pattern.length, n = text.length;
  let patternHash = 0, textHash = 0, h = 1;
  const result = [];
  
  for (let i = 0; i < m - 1; i++) h = (h * base) % mod;
  
  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % mod;
    textHash = (base * textHash + text.charCodeAt(i)) % mod;
  }
  
  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) j++;
      if (j === m) result.push(i);
    }
    
    if (i < n - m) {
      textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % mod;
      if (textHash < 0) textHash += mod;
    }
  }
  return result;
};

// Test Cases
console.log(rabinKarp("GEEKS FOR GEEKS", "GEEK")); // [0, 10]
console.log(rabinKarp("AABAACAADAABAABA", "AABA")); // [0, 9, 12]
console.log(rabinKarp("hello world", "wor")); // [6]