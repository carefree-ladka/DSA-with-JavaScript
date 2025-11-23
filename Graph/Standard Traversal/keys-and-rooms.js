// Keys and Rooms - Check if all rooms can be visited
const canVisitAllRooms = (rooms) => {
  const visited = new Set();
  const dfs = (room) => {
    visited.add(room);
    for (let key of rooms[room]) {
      if (!visited.has(key)) dfs(key);
    }
  };
  
  dfs(0);
  return visited.size === rooms.length;
};

// Test Cases
console.log(canVisitAllRooms([[1],[2],[3],[]])); // true
console.log(canVisitAllRooms([[1,3],[3,0,1],[2],[0]])); // false