// Rolling Hash - Efficient substring hashing
class RollingHash {
  constructor(base = 256, mod = 1e9 + 7) {
    this.base = base;
    this.mod = mod;
  }
  
  hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * this.base + s.charCodeAt(i)) % this.mod;
    }
    return h;
  }
  
  rollingHash(s, windowSize) {
    const hashes = [];
    let h = 0, pow = 1;
    
    for (let i = 0; i < windowSize - 1; i++) {
      pow = (pow * this.base) % this.mod;
    }
    
    for (let i = 0; i < windowSize; i++) {
      h = (h * this.base + s.charCodeAt(i)) % this.mod;
    }
    hashes.push(h);
    
    for (let i = windowSize; i < s.length; i++) {
      h = (this.base * (h - s.charCodeAt(i - windowSize) * pow) + s.charCodeAt(i)) % this.mod;
      if (h < 0) h += this.mod;
      hashes.push(h);
    }
    return hashes;
  }
}

// Test Cases
const rh = new RollingHash();
console.log(rh.hash("abc")); // Hash of "abc"
console.log(rh.rollingHash("abcdef", 3)); // Rolling hashes of size 3