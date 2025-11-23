// Rotate Image/Matrix 90 degrees
const rotate = (matrix) => {
  const n = matrix.length;
  
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
  
  return matrix;
};

// Rotate Points around Origin
const rotatePoint = (x, y, angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  
  return [
    x * cos - y * sin,
    x * sin + y * cos
  ];
};

// Minimum Area Rectangle
const minAreaRect = (points) => {
  const pointSet = new Set(points.map(([x, y]) => `${x},${y}`));
  let minArea = Infinity;
  
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      
      // Skip if points are on same horizontal or vertical line
      if (x1 === x2 || y1 === y2) continue;
      
      // Check if other two corners exist
      if (pointSet.has(`${x1},${y2}`) && pointSet.has(`${x2},${y1}`)) {
        const area = Math.abs(x2 - x1) * Math.abs(y2 - y1);
        minArea = Math.min(minArea, area);
      }
    }
  }
  
  return minArea === Infinity ? 0 : minArea;
};

// Angle Between Clock Hands
const angleClock = (hour, minutes) => {
  const hourAngle = (hour % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  
  let angle = Math.abs(hourAngle - minuteAngle);
  return Math.min(angle, 360 - angle);
};

// Test Cases
console.log(rotate([[1,2,3],[4,5,6],[7,8,9]])); // [[7,4,1],[8,5,2],[9,6,3]]
console.log(rotatePoint(1, 0, Math.PI / 2)); // [0, 1] (90 degrees)
console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[2,2]])); // 4
console.log(angleClock(12, 30)); // 165