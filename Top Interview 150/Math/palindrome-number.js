// Palindrome Number - Check if number is palindrome
const isPalindrome = (x) => {
  if (x < 0) return false;
  let original = x, reversed = 0;
  while (x > 0) {
    reversed = reversed * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  return original === reversed;
};

// Test Cases
console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false