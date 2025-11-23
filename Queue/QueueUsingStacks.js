// Implement queue using two stacks
class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  
  push(x) {
    this.stack1.push(x);
  }
  
  pop() {
    this.peek();
    return this.stack2.pop();
  }
  
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

// Test Cases
const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek()); // 1
console.log(queue.pop()); // 1
console.log(queue.empty()); // false