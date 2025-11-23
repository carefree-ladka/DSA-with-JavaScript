// Minimum meeting rooms required (Line Sweep)
const minMeetingRooms = (intervals) => {
  const events = [];
  
  for (const [start, end] of intervals) {
    events.push([start, 1]);   // meeting starts
    events.push([end, -1]);    // meeting ends
  }
  
  events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  
  let rooms = 0, maxRooms = 0;
  
  for (const [time, delta] of events) {
    rooms += delta;
    maxRooms = Math.max(maxRooms, rooms);
  }
  
  return maxRooms;
};

// Test Cases
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]])); // 1