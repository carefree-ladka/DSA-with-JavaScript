// My Calendar using Difference Array concept
class MyCalendar {
  constructor() {
    this.events = new Map();
  }
  
  book(start, end) {
    this.events.set(start, (this.events.get(start) || 0) + 1);
    this.events.set(end, (this.events.get(end) || 0) - 1);
    
    let active = 0;
    const times = [...this.events.keys()].sort((a, b) => a - b);
    
    for (const time of times) {
      active += this.events.get(time);
      if (active > 1) {
        // Rollback
        this.events.set(start, this.events.get(start) - 1);
        this.events.set(end, this.events.get(end) + 1);
        if (this.events.get(start) === 0) this.events.delete(start);
        if (this.events.get(end) === 0) this.events.delete(end);
        return false;
      }
    }
    
    return true;
  }
}

// My Calendar II (Allow double booking)
class MyCalendarTwo {
  constructor() {
    this.events = new Map();
  }
  
  book(start, end) {
    this.events.set(start, (this.events.get(start) || 0) + 1);
    this.events.set(end, (this.events.get(end) || 0) - 1);
    
    let active = 0;
    const times = [...this.events.keys()].sort((a, b) => a - b);
    
    for (const time of times) {
      active += this.events.get(time);
      if (active > 2) {
        // Rollback
        this.events.set(start, this.events.get(start) - 1);
        this.events.set(end, this.events.get(end) + 1);
        if (this.events.get(start) === 0) this.events.delete(start);
        if (this.events.get(end) === 0) this.events.delete(end);
        return false;
      }
    }
    
    return true;
  }
}

// Exam Room using Difference Array concept
class ExamRoom {
  constructor(n) {
    this.n = n;
    this.students = new Set();
  }
  
  seat() {
    if (this.students.size === 0) {
      this.students.add(0);
      return 0;
    }
    
    const sorted = [...this.students].sort((a, b) => a - b);
    let maxDist = sorted[0]; // Distance to seat 0
    let seat = 0;
    
    // Check distances between consecutive students
    for (let i = 0; i < sorted.length - 1; i++) {
      const dist = Math.floor((sorted[i + 1] - sorted[i]) / 2);
      if (dist > maxDist) {
        maxDist = dist;
        seat = sorted[i] + dist;
      }
    }
    
    // Check distance to last seat
    if (this.n - 1 - sorted[sorted.length - 1] > maxDist) {
      seat = this.n - 1;
    }
    
    this.students.add(seat);
    return seat;
  }
  
  leave(p) {
    this.students.delete(p);
  }
}

// Test Cases
const calendar = new MyCalendar();
console.log(calendar.book(10, 20)); // true
console.log(calendar.book(15, 25)); // false