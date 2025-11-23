// Grasshopper Jump using Difference Array
const canReach = (arr, start) => {
  const n = arr.length;
  const visited = new Array(n).fill(false);
  const queue = [start];
  visited[start] = true;
  
  while (queue.length) {
    const pos = queue.shift();
    
    if (arr[pos] === 0) return true;
    
    // Jump left
    if (pos - arr[pos] >= 0 && !visited[pos - arr[pos]]) {
      visited[pos - arr[pos]] = true;
      queue.push(pos - arr[pos]);
    }
    
    // Jump right
    if (pos + arr[pos] < n && !visited[pos + arr[pos]]) {
      visited[pos + arr[pos]] = true;
      queue.push(pos + arr[pos]);
    }
  }
  
  return false;
};

// Minimum Jumps using Difference Array concept
const minJumps = (arr) => {
  const n = arr.length;
  if (n <= 1) return 0;
  
  let jumps = 0, currentEnd = 0, farthest = 0;
  
  for (let i = 0; i < n - 1; i++) {
    farthest = Math.max(farthest, i + arr[i]);
    
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
      
      if (currentEnd >= n - 1) break;
    }
  }
  
  return jumps;
};

// Video Stitching using Difference Array approach
const videoStitching = (clips, time) => {
  clips.sort((a, b) => a[0] - b[0]);
  
  let res = 0, i = 0, start = 0, end = 0;
  
  while (start < time) {
    while (i < clips.length && clips[i][0] <= start) {
      end = Math.max(end, clips[i][1]);
      i++;
    }
    
    if (start === end) return -1;
    
    start = end;
    res++;
  }
  
  return res;
};

// Test Cases
console.log(canReach([4,2,3,0,3,1,2], 5)); // true
console.log(minJumps([2,3,1,1,4])); // 2
console.log(videoStitching([[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10)); // 3