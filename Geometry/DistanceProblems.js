// Minimum Distance to Target Color
const shortestDistanceColor = (colors, queries) => {
  const positions = new Map();
  
  for (let i = 0; i < colors.length; i++) {
    if (!positions.has(colors[i])) {
      positions.set(colors[i], []);
    }
    positions.get(colors[i]).push(i);
  }
  
  const result = [];
  
  for (const [i, c] of queries) {
    if (!positions.has(c)) {
      result.push(-1);
      continue;
    }
    
    const pos = positions.get(c);
    let left = 0, right = pos.length - 1;
    let minDist = Infinity;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      minDist = Math.min(minDist, Math.abs(pos[mid] - i));
      
      if (pos[mid] < i) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    result.push(minDist);
  }
  
  return result;
};

// Manhattan Distance
const manhattanDistance = (p1, p2) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

// Chebyshev Distance (Max distance)
const chebyshevDistance = (p1, p2) => {
  return Math.max(Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1]));
};

// Minimum Manhattan Distance Sum
const minTotalDistance = (grid) => {
  const people = [];
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        people.push([i, j]);
      }
    }
  }
  
  const rows = people.map(([r]) => r).sort((a, b) => a - b);
  const cols = people.map(([, c]) => c).sort((a, b) => a - b);
  
  const medianRow = rows[Math.floor(rows.length / 2)];
  const medianCol = cols[Math.floor(cols.length / 2)];
  
  let totalDistance = 0;
  for (const [r, c] of people) {
    totalDistance += Math.abs(r - medianRow) + Math.abs(c - medianCol);
  }
  
  return totalDistance;
};

// Test Cases
console.log(shortestDistanceColor([1,1,2,1,1], [[0,3],[2,2],[3,3]])); // [3,-1,1]
console.log(manhattanDistance([1, 1], [4, 5])); // 7
console.log(chebyshevDistance([1, 1], [4, 5])); // 4