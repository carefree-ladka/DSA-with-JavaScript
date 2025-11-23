// Alien Dictionary - Find character order from sorted words
const alienOrder = (words) => {
  const graph = new Map();
  const indegree = new Map();
  
  // Initialize all characters
  for (let word of words) {
    for (let char of word) {
      graph.set(char, []);
      indegree.set(char, 0);
    }
  }
  
  // Build graph from adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i], word2 = words[i + 1];
    const minLen = Math.min(word1.length, word2.length);
    
    if (word1.length > word2.length && word1.startsWith(word2)) return "";
    
    for (let j = 0; j < minLen; j++) {
      if (word1[j] !== word2[j]) {
        graph.get(word1[j]).push(word2[j]);
        indegree.set(word2[j], indegree.get(word2[j]) + 1);
        break;
      }
    }
  }
  
  // Topological sort
  const queue = [];
  for (let [char, deg] of indegree) {
    if (deg === 0) queue.push(char);
  }
  
  let result = "";
  while (queue.length) {
    const char = queue.shift();
    result += char;
    for (let next of graph.get(char)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  
  return result.length === indegree.size ? result : "";
};

// Test Cases
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])); // "wertf"