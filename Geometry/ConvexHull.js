// Convex Hull using Graham Scan
const outerTrees = (trees) => {
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  
  trees.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  
  // Build lower hull
  const lower = [];
  for (const p of trees) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) < 0) {
      lower.pop();
    }
    lower.push(p);
  }
  
  // Build upper hull
  const upper = [];
  for (let i = trees.length - 1; i >= 0; i--) {
    const p = trees[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) < 0) {
      upper.pop();
    }
    upper.push(p);
  }
  
  // Remove duplicate points
  const result = new Set();
  [...lower, ...upper].forEach(p => result.add(JSON.stringify(p)));
  return [...result].map(p => JSON.parse(p));
};

// Test Cases
console.log(outerTrees([[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]])); // Convex hull points