// Task Scheduler - LeetCode 621 (Facebook, Google favorite)
// Given tasks and cooldown time, find minimum time to complete all tasks

// Greedy approach with max heap
const leastInterval = (tasks, n) => {
  const freq = {};
  for (let task of tasks) {
    freq[task] = (freq[task] || 0) + 1;
  }
  
  const maxFreq = Math.max(...Object.values(freq));
  const maxCount = Object.values(freq).filter(f => f === maxFreq).length;
  
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
};

// Simulation approach
const leastIntervalSimulation = (tasks, n) => {
  const freq = {};
  for (let task of tasks) {
    freq[task] = (freq[task] || 0) + 1;
  }
  
  const heap = Object.values(freq).sort((a, b) => b - a);
  let time = 0;
  
  while (heap.length > 0) {
    const temp = [];
    
    for (let i = 0; i <= n; i++) {
      if (heap.length > 0) {
        const count = heap.shift();
        if (count > 1) temp.push(count - 1);
      }
      time++;
      if (heap.length === 0 && temp.length === 0) break;
    }
    
    heap.push(...temp);
    heap.sort((a, b) => b - a);
  }
  
  return time;
};

// Test Cases
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6
console.log(leastIntervalSimulation(["A","A","A","A","A","A","B","C","D","E","F","G"], 2)); // 16