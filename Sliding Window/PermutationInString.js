// Check if s2 contains permutation of s1 (Fixed Window)
const checkInclusion = (s1, s2) => {
  if (s1.length > s2.length) return false;
  
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  
  for (let char of s1) need[char.charCodeAt(0) - 97]++;
  
  let left = 0, right = 0, valid = 0;
  
  while (right < s2.length) {
    const c = s2[right].charCodeAt(0) - 97;
    right++;
    
    if (need[c] > 0) {
      window[c]++;
      if (window[c] === need[c]) valid++;
    }
    
    while (right - left >= s1.length) {
      if (valid === s1.split('').filter((c, i, arr) => arr.indexOf(c) === i).length) return true;
      
      const d = s2[left].charCodeAt(0) - 97;
      left++;
      
      if (need[d] > 0) {
        if (window[d] === need[d]) valid--;
        window[d]--;
      }
    }
  }
  
  return false;
};

// Test Cases
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false