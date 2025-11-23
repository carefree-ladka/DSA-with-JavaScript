// Time Needed to Inform All Employees - Tree traversal with timing
const numOfMinutes = (n, headID, manager, informTime) => {
  const children = Array.from({length: n}, () => []);
  for (let i = 0; i < n; i++) {
    if (manager[i] !== -1) children[manager[i]].push(i);
  }
  
  const dfs = (id) => {
    let maxTime = 0;
    for (let child of children[id]) {
      maxTime = Math.max(maxTime, dfs(child));
    }
    return maxTime + informTime[id];
  };
  
  return dfs(headID);
};

// Test Cases
console.log(numOfMinutes(1, 0, [-1], [0])); // 0
console.log(numOfMinutes(6, 2, [2,2,-1,2,2,2], [0,0,1,0,0,0])); // 1