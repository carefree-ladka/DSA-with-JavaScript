// Task scheduler using queue and cooling period
const leastInterval = (tasks, n) => {
  const freq = new Map();
  for (const task of tasks) {
    freq.set(task, (freq.get(task) || 0) + 1);
  }
  
  const maxHeap = [...freq.values()].sort((a, b) => b - a);
  const queue = [];
  let time = 0;
  
  while (maxHeap.length || queue.length) {
    time++;
    
    if (maxHeap.length) {
      const count = maxHeap.shift() - 1;
      if (count > 0) {
        queue.push([count, time + n]);
      }
    }
    
    if (queue.length && queue[0][1] === time) {
      maxHeap.push(queue.shift()[0]);
      maxHeap.sort((a, b) => b - a);
    }
  }
  
  return time;
};

// Test Cases
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6