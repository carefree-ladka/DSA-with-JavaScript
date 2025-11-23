// Meeting Rooms II - Minimum meeting rooms needed
const minMeetingRooms = (intervals) => {
  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1], [end, -1]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  
  let rooms = 0, max = 0;
  for (const [time, type] of events) {
    rooms += type;
    max = Math.max(max, rooms);
  }
  return max;
};

// Test Cases
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]])); // 1
console.log(minMeetingRooms([[9,10],[4,9],[4,17]])); // 2