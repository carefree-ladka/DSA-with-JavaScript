// Satisfiability of Equality Equations - Check if equations are satisfiable
const equationsPossible = (equations) => {
  const parent = Array.from({length: 26}, (_, i) => i);
  
  const find = (x) => parent[x] === x ? x : parent[x] = find(parent[x]);
  const union = (x, y) => parent[find(x)] = find(y);
  
  // Process equality equations first
  for (let eq of equations) {
    if (eq[1] === '=') {
      union(eq.charCodeAt(0) - 97, eq.charCodeAt(3) - 97);
    }
  }
  
  // Check inequality equations
  for (let eq of equations) {
    if (eq[1] === '!' && find(eq.charCodeAt(0) - 97) === find(eq.charCodeAt(3) - 97)) {
      return false;
    }
  }
  return true;
};

// Test Cases
console.log(equationsPossible(["a==b","b!=a"])); // false
console.log(equationsPossible(["b==a","a==b"])); // true