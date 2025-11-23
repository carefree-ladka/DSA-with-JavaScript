// Course Schedule - Check if all courses can be finished
const canFinish = (numCourses, prerequisites) => {
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
  
  let count = 0;
  while (queue.length) {
    const course = queue.shift();
    count++;
    for (let next of graph[course]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  
  return count === numCourses;
};

// Test Cases
console.log(canFinish(2, [[1,0]])); // true
console.log(canFinish(2, [[1,0],[0,1]])); // false