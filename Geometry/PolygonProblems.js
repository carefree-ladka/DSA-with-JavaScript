// Largest Triangle Area
const largestTriangleArea = (points) => {
  let maxArea = 0;
  
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        const [x3, y3] = points[k];
        
        // Area using cross product formula
        const area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
        maxArea = Math.max(maxArea, area);
      }
    }
  }
  
  return maxArea;
};

// Valid Boomerang (Non-collinear points)
const isBoomerang = (points) => {
  const [[x1, y1], [x2, y2], [x3, y3]] = points;
  
  // Check if cross product is non-zero (non-collinear)
  return (y1 - y2) * (x1 - x3) !== (y1 - y3) * (x1 - x2);
};

// Convex Polygon Check
const isConvex = (points) => {
  const n = points.length;
  if (n < 3) return false;
  
  let sign = 0;
  
  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % n];
    const [x3, y3] = points[(i + 2) % n];
    
    const crossProduct = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2);
    
    if (crossProduct !== 0) {
      if (sign === 0) {
        sign = crossProduct > 0 ? 1 : -1;
      } else if ((crossProduct > 0 ? 1 : -1) !== sign) {
        return false;
      }
    }
  }
  
  return true;
};

// Point in Polygon (Ray Casting)
const pointInPolygon = (point, polygon) => {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
};

// Test Cases
console.log(largestTriangleArea([[0,0],[0,1],[1,0],[0,2],[2,0]])); // 2.0
console.log(isBoomerang([[1,1],[2,3],[3,2]])); // true
console.log(isConvex([[0,0],[0,1],[1,1],[1,0]])); // true