// Rectangle area using line sweep algorithm
const computeArea = (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) => {
  const area1 = (ax2 - ax1) * (ay2 - ay1);
  const area2 = (bx2 - bx1) * (by2 - by1);
  
  // Find overlap
  const left = Math.max(ax1, bx1);
  const right = Math.min(ax2, bx2);
  const bottom = Math.max(ay1, by1);
  const top = Math.min(ay2, by2);
  
  let overlap = 0;
  if (left < right && bottom < top) {
    overlap = (right - left) * (top - bottom);
  }
  
  return area1 + area2 - overlap;
};

// Test Cases
console.log(computeArea(-3, 0, 3, 4, 0, -1, 9, 2)); // 45
console.log(computeArea(-2, -2, 2, 2, -2, -2, 2, 2)); // 16