// Pow(x, n) - Implement power function
const myPow = (x, n) => {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  
  if (n % 2 === 0) {
    const half = myPow(x, n / 2);
    return half * half;
  } else {
    return x * myPow(x, n - 1);
  }
};

// Test Cases
console.log(myPow(2.00000, 10)); // 1024.00000
console.log(myPow(2.10000, 3)); // 9.26100
console.log(myPow(2.00000, -2)); // 0.25000