// Basic Calculator - Evaluate expression with +, -, (, )
const calculate = (s) => {
  const stack = [];
  let result = 0, number = 0, sign = 1;
  
  for (let char of s) {
    if (char >= '0' && char <= '9') {
      number = number * 10 + (char - '0');
    } else if (char === '+') {
      result += sign * number;
      number = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * number;
      number = 0;
      sign = -1;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * number;
      number = 0;
      result *= stack.pop();
      result += stack.pop();
    }
  }
  
  return result + sign * number;
};

// Test Cases
console.log(calculate("1 + 1")); // 2
console.log(calculate(" 2-1 + 2 ")); // 3
console.log(calculate("(1+(4+5+2)-3)+(6+8)")); // 23