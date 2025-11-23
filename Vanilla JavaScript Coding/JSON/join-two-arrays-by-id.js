// Join Two Arrays by ID - Join arrays on id field
const join = (arr1, arr2) => {
  const map = {};
  
  for (let obj of arr1) {
    map[obj.id] = obj;
  }
  
  for (let obj of arr2) {
    if (map[obj.id]) {
      Object.assign(map[obj.id], obj);
    } else {
      map[obj.id] = obj;
    }
  }
  
  return Object.values(map).sort((a, b) => a.id - b.id);
};

// Test Cases
const arr1 = [{"id": 1, "x": 1}, {"id": 2, "x": 9}];
const arr2 = [{"id": 3, "x": 5}];
console.log(join(arr1, arr2)); // [{"id": 1, "x": 1}, {"id": 2, "x": 9}, {"id": 3, "x": 5}]