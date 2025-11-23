// Factorial and related problems
const factorial = (n) => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Trailing zeros in factorial
const trailingZeroes = (n) => {
  let count = 0;
  for (let i = 5; n / i >= 1; i *= 5) {
    count += Math.floor(n / i);
  }
  return count;
};

// Factorial with modulo
const factorialMod = (n, mod) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result = (result * i) % mod;
  }
  return result;
};

// Test Cases
console.log(factorial(5)); // 120
console.log(trailingZeroes(100)); // 24
console.log(factorialMod(5, 1000)); // 120