// Generate Parentheses - Generate all valid parentheses combinations
const generateParenthesis = (n) => {
  const result = [];
  const backtrack = (path, open, close) => {
    if (path.length === 2 * n) {
      result.push(path);
      return;
    }
    if (open < n) backtrack(path + '(', open + 1, close);
    if (close < open) backtrack(path + ')', open, close + 1);
  };
  backtrack('', 0, 0);
  return result;
};

// Test Cases
console.log(generateParenthesis(3)); // ["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(1)); // ["()"]