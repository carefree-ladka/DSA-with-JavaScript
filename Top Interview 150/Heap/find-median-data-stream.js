// Find Median from Data Stream - Median finder using heaps
class MedianFinder {
  constructor() {
    this.small = []; // max heap
    this.large = []; // min heap
  }
  
  addNum(num) {
    this.small.push(num);
    this.small.sort((a, b) => b - a);
    
    this.large.push(this.small.shift());
    this.large.sort((a, b) => a - b);
    
    if (this.large.length > this.small.length) {
      this.small.push(this.large.shift());
      this.small.sort((a, b) => b - a);
    }
  }
  
  findMedian() {
    return this.small.length > this.large.length ? 
           this.small[0] : 
           (this.small[0] + this.large[0]) / 2;
  }
}

// Test Cases
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // 1.5