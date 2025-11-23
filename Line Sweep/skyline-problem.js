// The Skyline Problem - Find skyline silhouette
const getSkyline = (buildings) => {
  const events = [];
  for (const [left, right, height] of buildings) {
    events.push([left, -height], [right, height]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  
  const result = [], heights = [0];
  for (const [x, h] of events) {
    if (h < 0) heights.push(-h);
    else heights.splice(heights.indexOf(h), 1);
    
    const maxH = Math.max(...heights);
    if (result.length === 0 || result[result.length - 1][1] !== maxH) {
      result.push([x, maxH]);
    }
  }
  return result;
};

// Test Cases
console.log(getSkyline([[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]])); 
// [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]