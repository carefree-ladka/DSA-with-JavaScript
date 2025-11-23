// My Calendar - book meetings without overlap
class MyCalendar {
  constructor() {
    this.bookings = [];
  }
  
  book(start, end) {
    for (const [s, e] of this.bookings) {
      if (start < e && end > s) {
        return false;
      }
    }
    this.bookings.push([start, end]);
    return true;
  }
}

// Test Cases
const calendar = new MyCalendar();
console.log(calendar.book(10, 20)); // true
console.log(calendar.book(15, 25)); // false
console.log(calendar.book(20, 30)); // true