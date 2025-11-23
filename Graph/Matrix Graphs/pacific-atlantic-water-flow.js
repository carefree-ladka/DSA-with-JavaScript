// Pacific Atlantic Water Flow - Multi-source reachability
const pacificAtlantic = (heights) => {
  const m = heights.length, n = heights[0].length;
  const pacific = Array.from({length: m}, () => new Array(n).fill(false));
  const atlantic = Array.from({length: m}, () => new Array(n).fill(false));
  
  const dfs = (i, j, ocean, prevHeight) => {
    if (i < 0 || i >= m || j < 0 || j >= n || ocean[i][j] || heights[i][j] < prevHeight) return;
    ocean[i][j] = true;
    dfs(i+1, j, ocean, heights[i][j]);
    dfs(i-1, j, ocean, heights[i][j]);
    dfs(i, j+1, ocean, heights[i][j]);
    dfs(i, j-1, ocean, heights[i][j]);
  };
  
  // Start from Pacific borders
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacific, heights[i][0]);
    dfs(i, n-1, atlantic, heights[i][n-1]);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j, pacific, heights[0][j]);
    dfs(m-1, j, atlantic, heights[m-1][j]);
  }
  
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) result.push([i, j]);
    }
  }
  return result;
};

// Test Cases
console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])); 
// [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]