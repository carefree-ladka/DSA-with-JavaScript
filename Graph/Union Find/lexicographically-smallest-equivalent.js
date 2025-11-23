// Lexicographically Smallest Equivalent String
const smallestEquivalentString = (s1, s2, baseStr) => {
  const parent = Array.from({length: 26}, (_, i) => i);
  
  const find = (x) => parent[x] === x ? x : parent[x] = find(parent[x]);
  const union = (x, y) => {
    const px = find(x), py = find(y);
    if (px < py) parent[py] = px;
    else parent[px] = py;
  };
  
  for (let i = 0; i < s1.length; i++) {
    union(s1.charCodeAt(i) - 97, s2.charCodeAt(i) - 97);
  }
  
  return baseStr.split('').map(c => 
    String.fromCharCode(find(c.charCodeAt(0) - 97) + 97)
  ).join('');
};

// Test Cases
console.log(smallestEquivalentString("parker", "morris", "parser")); // "makkek"
console.log(smallestEquivalentString("hello", "world", "hold")); // "hdld"