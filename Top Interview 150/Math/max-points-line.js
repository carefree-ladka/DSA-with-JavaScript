// Max Points on a Line - Find max points on same line
const maxPointsOnALine = (points) => {
  if (points.length <= 2) return points.length;
  
  let maxPoints = 0;
  for (let i = 0; i < points.length; i++) {
    const slopes = new Map();
    let duplicate = 1;
    
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      
      if (x1 === x2 && y1 === y2) {
        duplicate++;
        continue;
      }
      
      const slope = x1 === x2 ? 'vertical' : (y2 - y1) / (x2 - x1);
      slopes.set(slope, (slopes.get(slope) || 0) + 1);
    }
    
    const maxOnLine = Math.max(0, ...slopes.values()) + duplicate;
    maxPoints = Math.max(maxPoints, maxOnLine);
  }
  
  return maxPoints;
};

// Test Cases
console.log(maxPointsOnALine([[1,1],[2,2],[3,3]])); // 3
console.log(maxPointsOnALine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]])); // 4