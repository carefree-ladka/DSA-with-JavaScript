// Line Intersection and Reflection
const mirrorReflection = (p, q) => {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const g = gcd(p, q);
  
  p /= g;
  q /= g;
  
  if (p % 2 === 1 && q % 2 === 1) return 1;
  if (p % 2 === 1 && q % 2 === 0) return 0;
  return 2;
};

// Line Segment Intersection
const doLinesIntersect = (p1, q1, p2, q2) => {
  const orientation = (p, q, r) => {
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val === 0) return 0; // collinear
    return val > 0 ? 1 : 2; // clockwise or counterclockwise
  };
  
  const onSegment = (p, q, r) => {
    return q[0] <= Math.max(p[0], r[0]) && q[0] >= Math.min(p[0], r[0]) &&
           q[1] <= Math.max(p[1], r[1]) && q[1] >= Math.min(p[1], r[1]);
  };
  
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  
  // General case
  if (o1 !== o2 && o3 !== o4) return true;
  
  // Special cases
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;
  
  return false;
};

// Minimum Lines to Cover Points
const minLinesToCoverPoints = (points) => {
  const n = points.length;
  if (n <= 2) return 1;
  
  let maxOnLine = 1;
  
  for (let i = 0; i < n; i++) {
    const slopes = new Map();
    let duplicate = 0;
    
    for (let j = i + 1; j < n; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      
      if (x1 === x2 && y1 === y2) {
        duplicate++;
        continue;
      }
      
      const slope = x1 === x2 ? 'inf' : (y2 - y1) / (x2 - x1);
      slopes.set(slope, (slopes.get(slope) || 0) + 1);
    }
    
    const localMax = Math.max(...slopes.values(), 0) + 1 + duplicate;
    maxOnLine = Math.max(maxOnLine, localMax);
  }
  
  return Math.ceil(n / maxOnLine);
};

// Test Cases
console.log(mirrorReflection(2, 1)); // 2
console.log(doLinesIntersect([1,1], [10,1], [1,2], [10,2])); // false