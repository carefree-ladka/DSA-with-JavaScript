// Meeting Rooms - Check if person can attend all meetings
const canAttendMeetings = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
};

// Test Cases
console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7,10],[2,4]])); // true
console.log(canAttendMeetings([[1,5],[8,9]])); // true