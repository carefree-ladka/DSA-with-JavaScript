// Moving average from data stream using queue
class MovingAverage {
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
  }
  
  next(val) {
    this.queue.push(val);
    this.sum += val;
    
    if (this.queue.length > this.size) {
      this.sum -= this.queue.shift();
    }
    
    return this.sum / this.queue.length;
  }
}

// Test Cases
const ma = new MovingAverage(3);
console.log(ma.next(1)); // 1.0
console.log(ma.next(10)); // 5.5
console.log(ma.next(3)); // 4.666...
console.log(ma.next(5)); // 6.0