// Palindrome Partitioning - Partition string into palindromes
const partition = (s) => {
  const isPalindrome = (str, l, r) => {
    while (l < r) if (str[l++] !== str[r--]) return false;
    return true;
  };
  
  const result = [];
  const backtrack = (start, path) => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        path.push(s.substring(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };
  backtrack(0, []);
  return result;
};

// Test Cases
console.log(partition("aab")); // [["a","a","b"],["aa","b"]]
console.log(partition("raceacar")); // [["r","a","c","e","a","c","a","r"],["r","a","c","e","aca","r"],["r","a","cec","a","r"],["r","acecar"],["raceacar"]]