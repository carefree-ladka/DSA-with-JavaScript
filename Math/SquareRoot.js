// Square root algorithms
const mySqrt = (x) => {
  if (x < 2) return x;
  
  let left = 1, right = Math.floor(x / 2);
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;
    
    if (square === x) return mid;
    if (square < x) left = mid + 1;
    else right = mid - 1;
  }
  
  return right;
};

// Newton's method for square root
const sqrtNewton = (x) => {
  if (x < 2) return x;
  
  let guess = x;
  while (guess * guess > x) {
    guess = Math.floor((guess + x / guess) / 2);
  }
  
  return guess;
};

// Perfect square check
const isPerfectSquare = (num) => {
  if (num < 2) return true;
  
  let left = 2, right = Math.floor(num / 2);
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;
    
    if (square === num) return true;
    if (square < num) left = mid + 1;
    else right = mid - 1;
  }
  
  return false;
};

// Test Cases
console.log(mySqrt(8)); // 2
console.log(sqrtNewton(8)); // 2
console.log(isPerfectSquare(16)); // true