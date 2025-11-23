// Maximum XOR of two numbers in array
const findMaximumXOR = (nums) => {
  let maxXor = 0;
  let mask = 0;
  
  for (let i = 30; i >= 0; i--) {
    mask |= (1 << i);
    const prefixes = new Set();
    
    for (const num of nums) {
      prefixes.add(num & mask);
    }
    
    const candidate = maxXor | (1 << i);
    
    for (const prefix of prefixes) {
      if (prefixes.has(candidate ^ prefix)) {
        maxXor = candidate;
        break;
      }
    }
  }
  
  return maxXor;
};

// Test Cases
console.log(findMaximumXOR([3, 10, 5, 25, 2, 8])); // 28
console.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])); // 127