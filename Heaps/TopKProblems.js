// Top K Frequent Elements
const topKFrequent = (nums, k) => {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
};

// Top K Frequent Words
const topKFrequentWords = (words, k) => {
  const count = new Map();
  for (const word of words) {
    count.set(word, (count.get(word) || 0) + 1);
  }
  
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, k)
    .map(([word]) => word);
};

// Test Cases
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequentWords(["i", "love", "leetcode", "i", "love", "coding"], 2)); // ["i", "love"]