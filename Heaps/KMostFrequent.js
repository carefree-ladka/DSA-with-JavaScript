// Top K Most Frequent Elements (Bucket Sort)
const topKFrequentBucket = (nums, k) => {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  
  const buckets = Array(nums.length + 1).fill().map(() => []);
  
  for (const [num, freq] of count) {
    buckets[freq].push(num);
  }
  
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  
  return result.slice(0, k);
};

// K Most Frequent Words (Trie + Heap simulation)
const topKFrequentWordsTrie = (words, k) => {
  const count = new Map();
  for (const word of words) {
    count.set(word, (count.get(word) || 0) + 1);
  }
  
  const candidates = [...count.entries()];
  
  // Custom comparator: higher frequency first, then lexicographically smaller
  candidates.sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
  
  return candidates.slice(0, k).map(([word]) => word);
};

// Test Cases
console.log(topKFrequentBucket([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequentWordsTrie(["i", "love", "leetcode", "i", "love", "coding"], 2)); // ["i", "love"]