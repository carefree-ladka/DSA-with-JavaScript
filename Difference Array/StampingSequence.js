// Stamping the Sequence using Difference Array concept
const movesToStamp = (stamp, target) => {
  const s = stamp.length, t = target.length;
  const targetArr = target.split('');
  const result = [];
  let totalStamped = 0;
  
  const canStamp = (pos) => {
    let changed = false;
    for (let i = 0; i < s; i++) {
      if (targetArr[pos + i] === '?') continue;
      if (targetArr[pos + i] !== stamp[i]) return false;
      changed = true;
    }
    return changed;
  };
  
  const doStamp = (pos) => {
    let count = 0;
    for (let i = 0; i < s; i++) {
      if (targetArr[pos + i] !== '?') {
        targetArr[pos + i] = '?';
        count++;
      }
    }
    return count;
  };
  
  while (totalStamped < t) {
    let stamped = false;
    
    for (let i = 0; i <= t - s; i++) {
      if (canStamp(i)) {
        totalStamped += doStamp(i);
        result.push(i);
        stamped = true;
      }
    }
    
    if (!stamped) return [];
  }
  
  return result.reverse();
};

// Test Cases
console.log(movesToStamp("abc", "ababc")); // [0,2]
console.log(movesToStamp("abca", "aabcaca")); // [3,0,1]