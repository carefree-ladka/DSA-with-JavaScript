// Letter Combinations of a Phone Number - Generate all combinations
const letterCombinations = (digits) => {
  if (!digits) return [];
  const map = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  
  const result = [];
  const backtrack = (i, path) => {
    if (i === digits.length) {
      result.push(path);
      return;
    }
    for (let char of map[digits[i]]) {
      backtrack(i + 1, path + char);
    }
  };
  
  backtrack(0, '');
  return result;
};

// Test Cases
console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations("")); // []