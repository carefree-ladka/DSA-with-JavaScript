// Car pooling using line sweep algorithm
const carPooling = (trips, capacity) => {
  const events = [];
  
  for (const [passengers, from, to] of trips) {
    events.push([from, passengers]);   // pickup
    events.push([to, -passengers]);    // dropoff
  }
  
  events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  
  let currentPassengers = 0;
  
  for (const [location, change] of events) {
    currentPassengers += change;
    if (currentPassengers > capacity) {
      return false;
    }
  }
  
  return true;
};

// Test Cases
console.log(carPooling([[2,1,5],[3,3,7]], 4)); // false
console.log(carPooling([[2,1,5],[3,3,7]], 5)); // true