// Meeting Rooms Scheduler - Google, Microsoft favorite
// Advanced scheduling with room allocation and optimization

// Meeting Rooms I - Can attend all meetings
const canAttendMeetings = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i-1][1]) return false;
  }
  return true;
};

// Meeting Rooms II - Minimum rooms needed
const minMeetingRooms = (intervals) => {
  const events = [];
  for (let [start, end] of intervals) {
    events.push([start, 1], [end, -1]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  
  let rooms = 0, maxRooms = 0;
  for (let [time, type] of events) {
    rooms += type;
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
};

// Meeting Scheduler with Room Assignment
class MeetingScheduler {
  constructor() {
    this.rooms = new Map(); // roomId -> endTime
    this.schedule = []; // [{meeting, room, start, end}]
  }
  
  scheduleMeeting(start, end, meetingId) {
    // Find available room
    let assignedRoom = null;
    let earliestEnd = Infinity;
    
    for (let [roomId, endTime] of this.rooms) {
      if (endTime <= start && endTime < earliestEnd) {
        assignedRoom = roomId;
        earliestEnd = endTime;
      }
    }
    
    // Create new room if needed
    if (assignedRoom === null) {
      assignedRoom = this.rooms.size;
    }
    
    this.rooms.set(assignedRoom, end);
    this.schedule.push({
      meeting: meetingId,
      room: assignedRoom,
      start,
      end
    });
    
    return assignedRoom;
  }
  
  getSchedule() {
    return this.schedule.sort((a, b) => a.start - b.start);
  }
  
  getRoomCount() {
    return this.rooms.size;
  }
}

// Optimal Meeting Selection (Activity Selection Problem)
const maxMeetings = (starts, ends) => {
  const meetings = starts.map((start, i) => ({ start, end: ends[i], index: i }));
  meetings.sort((a, b) => a.end - b.end);
  
  const selected = [meetings[0]];
  let lastEnd = meetings[0].end;
  
  for (let i = 1; i < meetings.length; i++) {
    if (meetings[i].start >= lastEnd) {
      selected.push(meetings[i]);
      lastEnd = meetings[i].end;
    }
  }
  
  return selected;
};

// Meeting Rooms with Priorities
const scheduleMeetingsWithPriority = (meetings) => {
  // meetings: [{start, end, priority, id}]
  meetings.sort((a, b) => b.priority - a.priority || a.start - b.start);
  
  const scheduled = [];
  const rooms = []; // Array of room end times
  
  for (let meeting of meetings) {
    // Find available room
    let roomIndex = -1;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i] <= meeting.start) {
        roomIndex = i;
        break;
      }
    }
    
    // Assign room
    if (roomIndex === -1) {
      rooms.push(meeting.end);
      roomIndex = rooms.length - 1;
    } else {
      rooms[roomIndex] = meeting.end;
    }
    
    scheduled.push({ ...meeting, room: roomIndex });
  }
  
  return { scheduled, roomsNeeded: rooms.length };
};

// Calendar Scheduling - Find free time slots
const findFreeTime = (schedules, workingHours) => {
  const [workStart, workEnd] = workingHours;
  const allBusy = [];
  
  // Merge all schedules
  for (let schedule of schedules) {
    allBusy.push(...schedule);
  }
  
  // Sort and merge overlapping intervals
  allBusy.sort((a, b) => a[0] - b[0]);
  const merged = [];
  
  for (let interval of allBusy) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }
  
  // Find free slots
  const freeSlots = [];
  let currentTime = workStart;
  
  for (let [start, end] of merged) {
    if (currentTime < start) {
      freeSlots.push([currentTime, start]);
    }
    currentTime = Math.max(currentTime, end);
  }
  
  if (currentTime < workEnd) {
    freeSlots.push([currentTime, workEnd]);
  }
  
  return freeSlots;
};

// Test Cases
console.log("Can attend all:", canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log("Min rooms needed:", minMeetingRooms([[0,30],[5,10],[15,20]])); // 2

const scheduler = new MeetingScheduler();
scheduler.scheduleMeeting(0, 30, "M1");
scheduler.scheduleMeeting(5, 10, "M2");
scheduler.scheduleMeeting(15, 20, "M3");
console.log("Room assignments:", scheduler.getSchedule());

const meetings = [
  {start: 1, end: 3, priority: 5, id: "High1"},
  {start: 2, end: 4, priority: 3, id: "Med1"},
  {start: 3, end: 5, priority: 5, id: "High2"}
];
console.log("Priority scheduling:", scheduleMeetingsWithPriority(meetings));

const schedules = [[[9, 10], [12, 13]], [[10, 11], [14, 15]]];
console.log("Free time:", findFreeTime(schedules, [9, 16]));