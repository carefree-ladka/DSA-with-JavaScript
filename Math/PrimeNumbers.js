// Prime number algorithms
const isPrime = (n) => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

// Sieve of Eratosthenes
const sieveOfEratosthenes = (n) => {
  const primes = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  
  return primes.map((isPrime, num) => isPrime ? num : null).filter(x => x !== null);
};

// Count primes up to n
const countPrimes = (n) => {
  if (n < 2) return 0;
  const primes = new Array(n).fill(true);
  primes[0] = primes[1] = false;
  
  for (let i = 2; i * i < n; i++) {
    if (primes[i]) {
      for (let j = i * i; j < n; j += i) {
        primes[j] = false;
      }
    }
  }
  
  return primes.filter(Boolean).length;
};

// Test Cases
console.log(isPrime(17)); // true
console.log(sieveOfEratosthenes(20)); // [2,3,5,7,11,13,17,19]
console.log(countPrimes(10)); // 4