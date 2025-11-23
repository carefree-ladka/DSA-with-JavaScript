// IPO - Maximize capital with k projects
const findMaximizedCapital = (k, w, profits, capital) => {
  const projects = profits.map((p, i) => [capital[i], p]).sort((a, b) => a[0] - b[0]);
  const maxHeap = [];
  let i = 0;
  
  for (let j = 0; j < k; j++) {
    while (i < projects.length && projects[i][0] <= w) {
      maxHeap.push(projects[i++][1]);
      maxHeap.sort((a, b) => b - a);
    }
    if (!maxHeap.length) break;
    w += maxHeap.shift();
  }
  
  return w;
};

// Test Cases
console.log(findMaximizedCapital(2, 0, [1,2,3], [0,1,1])); // 4
console.log(findMaximizedCapital(3, 0, [1,2,3], [0,1,2])); // 6