// Word Pattern - Check if pattern matches word sequence
const wordPattern = (pattern, s) => {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  
  const mapP = {}, mapW = {};
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i], w = words[i];
    if ((mapP[p] && mapP[p] !== w) || (mapW[w] && mapW[w] !== p)) {
      return false;
    }
    mapP[p] = w;
    mapW[w] = p;
  }
  return true;
};

// Test Cases
console.log(wordPattern("abba", "dog cat cat dog")); // true
console.log(wordPattern("abba", "dog cat cat fish")); // false
console.log(wordPattern("aaaa", "dog cat cat dog")); // false