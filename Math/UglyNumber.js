// Ugly number problems
const isUgly = (n) => {
  if (n <= 0) return false;
  
  for (const factor of [2, 3, 5]) {
    while (n % factor === 0) {
      n /= factor;
    }
  }
  
  return n === 1;
};

// Find nth ugly number
const nthUglyNumber = (n) => {
  const ugly = [1];
  let i2 = 0, i3 = 0, i5 = 0;
  
  for (let i = 1; i < n; i++) {
    const next2 = ugly[i2] * 2;
    const next3 = ugly[i3] * 3;
    const next5 = ugly[i5] * 5;
    
    const nextUgly = Math.min(next2, next3, next5);
    ugly.push(nextUgly);
    
    if (nextUgly === next2) i2++;
    if (nextUgly === next3) i3++;
    if (nextUgly === next5) i5++;
  }
  
  return ugly[n - 1];
};

// Super ugly numbers with custom primes
const nthSuperUglyNumber = (n, primes) => {
  const ugly = [1];
  const indices = new Array(primes.length).fill(0);
  
  for (let i = 1; i < n; i++) {
    let nextUgly = Infinity;
    
    for (let j = 0; j < primes.length; j++) {
      nextUgly = Math.min(nextUgly, ugly[indices[j]] * primes[j]);
    }
    
    ugly.push(nextUgly);
    
    for (let j = 0; j < primes.length; j++) {
      if (nextUgly === ugly[indices[j]] * primes[j]) {
        indices[j]++;
      }
    }
  }
  
  return ugly[n - 1];
};

// Test Cases
console.log(isUgly(6)); // true
console.log(nthUglyNumber(10)); // 12
console.log(nthSuperUglyNumber(12, [2, 7, 13, 19])); // 32