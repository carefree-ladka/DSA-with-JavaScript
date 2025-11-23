// Happy Number - Check if number is happy
const isHappy = (n) => {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = n.toString().split('').reduce((sum, digit) => sum + digit * digit, 0);
  }
  return n === 1;
};

// Test Cases
console.log(isHappy(19)); // true
console.log(isHappy(2)); // false