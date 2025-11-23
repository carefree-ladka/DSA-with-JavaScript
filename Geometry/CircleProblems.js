// Minimum Enclosing Circle
const numPointsInCircle = (darts, r, x_center, y_center) => {
  let count = 0;
  for (const [x, y] of darts) {
    if ((x - x_center) ** 2 + (y - y_center) ** 2 <= r ** 2 + 1e-7) {
      count++;
    }
  }
  return count;
};

// Circle and Rectangle Overlap
const checkOverlap = (radius, xCenter, yCenter, x1, y1, x2, y2) => {
  const xClosest = Math.max(x1, Math.min(xCenter, x2));
  const yClosest = Math.max(y1, Math.min(yCenter, y2));
  
  const distance = (xCenter - xClosest) ** 2 + (yCenter - yClosest) ** 2;
  return distance <= radius ** 2;
};

// Points on Circle Circumference
const numPointsOnCircumference = (points) => {
  const n = points.length;
  if (n <= 1) return n;
  
  let maxPoints = 1;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      
      // Circle with diameter as line segment
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;
      const r = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / 2;
      
      let count = 0;
      for (const [x, y] of points) {
        if (Math.abs((x - cx) ** 2 + (y - cy) ** 2 - r ** 2) < 1e-7) {
          count++;
        }
      }
      maxPoints = Math.max(maxPoints, count);
    }
  }
  
  return maxPoints;
};

// Test Cases
console.log(checkOverlap(1, 0, 0, 1, -1, 3, 1)); // true
console.log(numPointsOnCircumference([[1,0],[2,0],[3,0]])); // 3