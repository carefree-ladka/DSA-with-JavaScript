// Ransom Note - Check if ransom note can be constructed from magazine
const canConstruct = (ransomNote, magazine) => {
  const count = {};
  for (let char of magazine) count[char] = (count[char] || 0) + 1;
  for (let char of ransomNote) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
};

// Test Cases
console.log(canConstruct("a", "b")); // false
console.log(canConstruct("aa", "aab")); // true
console.log(canConstruct("aa", "ab")); // false