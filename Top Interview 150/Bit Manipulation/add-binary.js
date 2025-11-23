// Add Binary - Add two binary strings
const addBinary = (a, b) => {
  let result = '', carry = 0;
  let i = a.length - 1, j = b.length - 1;
  
  while (i >= 0 || j >= 0 || carry) {
    const sum = (i >= 0 ? +a[i--] : 0) + (j >= 0 ? +b[j--] : 0) + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }
  
  return result;
};

// Test Cases
console.log(addBinary("11", "1")); // "100"
console.log(addBinary("1010", "1011")); // "10101"