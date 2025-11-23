// Rectangle Area Overlap
const computeArea = (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) => {
  const area1 = (ax2 - ax1) * (ay2 - ay1);
  const area2 = (bx2 - bx1) * (by2 - by1);
  
  const left = Math.max(ax1, bx1);
  const right = Math.min(ax2, bx2);
  const bottom = Math.max(ay1, by1);
  const top = Math.min(ay2, by2);
  
  const overlap = Math.max(0, right - left) * Math.max(0, top - bottom);
  return area1 + area2 - overlap;
};

// Rectangle Overlap Check
const isRectangleOverlap = (rec1, rec2) => {
  const [x1, y1, x2, y2] = rec1;
  const [x3, y3, x4, y4] = rec2;
  
  return !(x2 <= x3 || x4 <= x1 || y2 <= y3 || y4 <= y1);
};

// Perfect Rectangle
const isRectangleCover = (rectangles) => {
  const corners = new Set();
  let area = 0;
  
  for (const [x1, y1, x2, y2] of rectangles) {
    area += (x2 - x1) * (y2 - y1);
    
    const points = [`${x1},${y1}`, `${x1},${y2}`, `${x2},${y1}`, `${x2},${y2}`];
    for (const point of points) {
      if (corners.has(point)) {
        corners.delete(point);
      } else {
        corners.add(point);
      }
    }
  }
  
  if (corners.size !== 4) return false;
  
  const coords = [...corners].map(p => p.split(',').map(Number));
  const xs = coords.map(([x]) => x).sort((a, b) => a - b);
  const ys = coords.map(([, y]) => y).sort((a, b) => a - b);
  
  const expectedArea = (xs[3] - xs[0]) * (ys[3] - ys[0]);
  return area === expectedArea;
};

// Test Cases
console.log(computeArea(-3, 0, 3, 4, 0, -1, 9, 2)); // 45
console.log(isRectangleOverlap([0,0,2,2], [1,1,3,3])); // true