// Skyline problem using line sweep
const getSkyline = (buildings) => {
  const events = [];
  
  for (const [left, right, height] of buildings) {
    events.push([left, -height]);  // start (negative for max heap)
    events.push([right, height]);  // end
  }
  
  events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  
  const result = [];
  const heights = [0];
  
  for (const [x, h] of events) {
    if (h < 0) {
      heights.push(-h);
    } else {
      heights.splice(heights.indexOf(h), 1);
    }
    
    heights.sort((a, b) => b - a);
    const maxHeight = heights[0];
    
    if (!result.length || result[result.length - 1][1] !== maxHeight) {
      result.push([x, maxHeight]);
    }
  }
  
  return result;
};

// Test Cases
console.log(getSkyline([[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]])); 
// [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]