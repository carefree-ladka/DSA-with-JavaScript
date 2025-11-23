// Valid Palindrome - Check if string is palindrome ignoring non-alphanumeric
const isPalindrome = (s) => {
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
    while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
    if (s[l++].toLowerCase() !== s[r--].toLowerCase()) return false;
  }
  return true;
};

// Test Cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false