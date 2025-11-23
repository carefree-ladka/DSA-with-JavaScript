// Greatest Common Divisor and Least Common Multiple
const gcd = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcm = (a, b) => (a * b) / gcd(a, b);

// GCD of array
const gcdArray = (arr) => arr.reduce(gcd);

// Test Cases
console.log(gcd(48, 18)); // 6
console.log(lcm(4, 6)); // 12
console.log(gcdArray([12, 18, 24])); // 6