// Find all anagrams of p in s (Fixed Window)
const findAnagrams = (s, p) => {
  if (p.length > s.length) return [];
  
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const result = [];
  
  for (let char of p) pCount[char.charCodeAt(0) - 97]++;
  
  for (let i = 0; i < s.length; i++) {
    sCount[s[i].charCodeAt(0) - 97]++;
    
    if (i >= p.length) {
      sCount[s[i - p.length].charCodeAt(0) - 97]--;
    }
    
    if (i >= p.length - 1 && pCount.join('') === sCount.join('')) {
      result.push(i - p.length + 1);
    }
  }
  
  return result;
};

// Test Cases
console.log(findAnagrams("abab", "ab")); // [0,2]
console.log(findAnagrams("abcab", "ab")); // [1,3]