// Isomorphic Strings - Check if two strings are isomorphic
const isIsomorphic = (s, t) => {
  const mapS = {}, mapT = {};
  for (let i = 0; i < s.length; i++) {
    const charS = s[i], charT = t[i];
    if ((mapS[charS] && mapS[charS] !== charT) || (mapT[charT] && mapT[charT] !== charS)) {
      return false;
    }
    mapS[charS] = charT;
    mapT[charT] = charS;
  }
  return true;
};

// Test Cases
console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false
console.log(isIsomorphic("paper", "title")); // true