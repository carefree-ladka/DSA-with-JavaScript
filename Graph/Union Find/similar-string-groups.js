// Similar String Groups - Count connected components of similar strings
const numSimilarGroups = (strs) => {
  const n = strs.length;
  const parent = Array.from({length: n}, (_, i) => i);
  
  const find = (x) => parent[x] === x ? x : parent[x] = find(parent[x]);
  const union = (x, y) => parent[find(x)] = find(y);
  
  const similar = (s1, s2) => {
    let diff = 0;
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] !== s2[i] && ++diff > 2) return false;
    }
    return true;
  };
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (similar(strs[i], strs[j])) union(i, j);
    }
  }
  
  const groups = new Set();
  for (let i = 0; i < n; i++) {
    groups.add(find(i));
  }
  return groups.size;
};

// Test Cases
console.log(numSimilarGroups(["tars","rats","arts","star"])); // 2