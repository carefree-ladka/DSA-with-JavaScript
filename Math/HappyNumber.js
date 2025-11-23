// Happy number detection using cycle detection
const isHappy = (n) => {
  const getSumOfSquares = (num) => {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  };
  
  const seen = new Set();
  
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getSumOfSquares(n);
  }
  
  return n === 1;
};

// Using Floyd's cycle detection
const isHappyFloyd = (n) => {
  const getSumOfSquares = (num) => {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  };
  
  let slow = n, fast = n;
  
  do {
    slow = getSumOfSquares(slow);
    fast = getSumOfSquares(getSumOfSquares(fast));
  } while (slow !== fast);
  
  return slow === 1;
};

// Test Cases
console.log(isHappy(19)); // true
console.log(isHappy(2)); // false
console.log(isHappyFloyd(19)); // true