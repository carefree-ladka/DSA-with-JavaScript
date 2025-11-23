// Group Anagrams - Group strings that are anagrams
const groupAnagrams = (strs) => {
  const map = {};
  for (let str of strs) {
    const key = str.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(str);
  }
  return Object.values(map);
};

// Test Cases
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])); 
// [["bat"],["nat","tan"],["ate","eat","tea"]]
console.log(groupAnagrams([""])); // [[""]]
console.log(groupAnagrams(["a"])); // [["a"]]