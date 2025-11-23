// Car Pooling using Difference Array
const carPooling = (trips, capacity) => {
  const diff = new Array(1001).fill(0);
  
  for (const [passengers, from, to] of trips) {
    diff[from] += passengers;
    diff[to] -= passengers;
  }
  
  let current = 0;
  for (let i = 0; i < 1001; i++) {
    current += diff[i];
    if (current > capacity) return false;
  }
  
  return true;
};

// Meeting Rooms II using Difference Array
const minMeetingRooms = (intervals) => {
  const diff = new Array(1000001).fill(0);
  
  for (const [start, end] of intervals) {
    diff[start]++;
    diff[end]--;
  }
  
  let rooms = 0, maxRooms = 0;
  for (let i = 0; i < 1000001; i++) {
    rooms += diff[i];
    maxRooms = Math.max(maxRooms, rooms);
  }
  
  return maxRooms;
};

// Corporate Flight Bookings
const corpFlightBookings = (bookings, n) => {
  const diff = new Array(n + 1).fill(0);
  
  for (const [first, last, seats] of bookings) {
    diff[first - 1] += seats;
    diff[last] -= seats;
  }
  
  const result = new Array(n);
  result[0] = diff[0];
  
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] + diff[i];
  }
  
  return result;
};

// Test Cases
console.log(carPooling([[2,1,5],[3,3,7]], 4)); // false
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(corpFlightBookings([[1,2,10],[2,3,20],[2,5,25]], 5)); // [10,55,45,25,25]