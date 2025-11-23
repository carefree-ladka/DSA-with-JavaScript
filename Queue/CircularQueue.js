// Circular queue implementation
class MyCircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
    this.size = k;
  }
  
  enQueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.head = 0;
    this.tail = (this.tail + 1) % this.size;
    this.queue[this.tail] = value;
    return true;
  }
  
  deQueue() {
    if (this.isEmpty()) return false;
    if (this.head === this.tail) {
      this.head = -1;
      this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.size;
    }
    return true;
  }
  
  Front() {
    return this.isEmpty() ? -1 : this.queue[this.head];
  }
  
  Rear() {
    return this.isEmpty() ? -1 : this.queue[this.tail];
  }
  
  isEmpty() {
    return this.head === -1;
  }
  
  isFull() {
    return !this.isEmpty() && (this.tail + 1) % this.size === this.head;
  }
}

// Test Cases
const cq = new MyCircularQueue(3);
console.log(cq.enQueue(1)); // true
console.log(cq.enQueue(2)); // true
console.log(cq.Front()); // 1