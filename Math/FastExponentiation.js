// Fast exponentiation using binary exponentiation
const fastPower = (base, exp, mod = null) => {
  let result = 1;
  base = base % (mod || Number.MAX_SAFE_INTEGER);
  
  while (exp > 0) {
    if (exp & 1) {
      result = mod ? (result * base) % mod : result * base;
    }
    exp >>= 1;
    base = mod ? (base * base) % mod : base * base;
  }
  
  return result;
};

// Power of x^n (LeetCode 50)
const myPow = (x, n) => {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  
  let result = 1;
  while (n > 0) {
    if (n & 1) result *= x;
    x *= x;
    n >>= 1;
  }
  return result;
};

// Test Cases
console.log(fastPower(2, 10)); // 1024
console.log(fastPower(2, 10, 1000)); // 24
console.log(myPow(2.0, 10)); // 1024.0