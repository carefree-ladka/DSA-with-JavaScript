// Course Schedule II - Return course order
const findOrder = (numCourses, prerequisites) => {
  const graph = Array.from({length: numCourses}, () => []);
  const indegree = new Array(numCourses).fill(0);
  
  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    indegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }
  
  const result = [];
  while (queue.length) {
    const course = queue.shift();
    result.push(course);
    for (let next of graph[course]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  
  return result.length === numCourses ? result : [];
};

// Test Cases
console.log(findOrder(2, [[1,0]])); // [0,1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,2,1,3]