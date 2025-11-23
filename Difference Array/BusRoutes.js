// Bus Routes using Difference Array concept for stops
const numBusesToDestination = (routes, source, destination) => {
  if (source === destination) return 0;
  
  const stopToBuses = new Map();
  
  for (let i = 0; i < routes.length; i++) {
    for (const stop of routes[i]) {
      if (!stopToBuses.has(stop)) {
        stopToBuses.set(stop, []);
      }
      stopToBuses.get(stop).push(i);
    }
  }
  
  const visitedBuses = new Set();
  const queue = [source];
  let buses = 0;
  
  while (queue.length) {
    const size = queue.length;
    buses++;
    
    for (let i = 0; i < size; i++) {
      const stop = queue.shift();
      
      for (const bus of stopToBuses.get(stop) || []) {
        if (visitedBuses.has(bus)) continue;
        visitedBuses.add(bus);
        
        for (const nextStop of routes[bus]) {
          if (nextStop === destination) return buses;
          queue.push(nextStop);
        }
      }
    }
  }
  
  return -1;
};

// Minimum Number of Taps using Difference Array
const minTaps = (n, ranges) => {
  const intervals = [];
  
  for (let i = 0; i < ranges.length; i++) {
    const left = Math.max(0, i - ranges[i]);
    const right = Math.min(n, i + ranges[i]);
    intervals.push([left, right]);
  }
  
  intervals.sort((a, b) => a[0] - b[0]);
  
  let taps = 0, i = 0, start = 0, end = 0;
  
  while (start < n) {
    while (i < intervals.length && intervals[i][0] <= start) {
      end = Math.max(end, intervals[i][1]);
      i++;
    }
    
    if (start === end) return -1;
    
    start = end;
    taps++;
  }
  
  return taps;
};

// Test Cases
console.log(numBusesToDestination([[1,2,7],[3,6,7]], 1, 6)); // 2
console.log(minTaps(5, [3,4,1,1,0,0])); // 1