// Car Pooling - Check if trips possible with capacity
const carPooling = (trips, capacity) => {
  const events = [];
  for (const [passengers, from, to] of trips) {
    events.push([from, passengers], [to, -passengers]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  
  let current = 0;
  for (const [location, change] of events) {
    current += change;
    if (current > capacity) return false;
  }
  return true;
};

// Test Cases
console.log(carPooling([[2,1,5],[3,3,7]], 4)); // false
console.log(carPooling([[2,1,5],[3,3,7]], 5)); // true
console.log(carPooling([[2,1,5],[3,5,7]], 3)); // true