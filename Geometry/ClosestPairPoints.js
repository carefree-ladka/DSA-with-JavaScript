// Closest Pair of Points using Divide & Conquer
const closestPointsToOrigin = (points, k) => {
  return points
    .map(([x, y]) => [x * x + y * y, [x, y]])
    .sort((a, b) => a[0] - b[0])
    .slice(0, k)
    .map(([, point]) => point);
};

// Minimum distance between points
const minDistanceBetweenPoints = (points) => {
  const distance = (p1, p2) => Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
  
  let minDist = Infinity;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      minDist = Math.min(minDist, distance(points[i], points[j]));
    }
  }
  return minDist;
};

// Check if points form a straight line
const checkStraightLine = (coordinates) => {
  if (coordinates.length <= 2) return true;
  
  const [x0, y0] = coordinates[0];
  const [x1, y1] = coordinates[1];
  
  for (let i = 2; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    // Cross product should be 0 for collinear points
    if ((y1 - y0) * (x - x0) !== (y - y0) * (x1 - x0)) {
      return false;
    }
  }
  return true;
};

// Test Cases
console.log(closestPointsToOrigin([[1,3],[3,4],[2,-1]], 2)); // [[2,-1],[1,3]]
console.log(checkStraightLine([[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]])); // true