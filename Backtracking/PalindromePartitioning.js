// Partition string into palindromic substrings
const partition = (s) => {
  const result = [];
  
  const isPalindrome = (str) => str === str.split('').reverse().join('');
  
  const backtrack = (start, current) => {
    if (start === s.length) {
      result.push([...current]);
      return;
    }
    
    for (let end = start; end < s.length; end++) {
      const substring = s.slice(start, end + 1);
      if (isPalindrome(substring)) {
        current.push(substring);
        backtrack(end + 1, current);
        current.pop();
      }
    }
  };
  
  backtrack(0, []);
  return result;
};

// Test Cases
console.log(partition("aab")); // [["a","a","b"],["aa","b"]]
console.log(partition("raceacar")); // [["r","a","c","e","a","c","a","r"],["r","a","c","e","aca","r"],["r","a","cec","a","r"],["r","aca","c","a","r"],["raceacar"]]