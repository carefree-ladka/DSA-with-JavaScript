// Compact Object - Remove falsy values from object/array
const compactObject = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  
  if (Array.isArray(obj)) {
    const result = [];
    for (let item of obj) {
      const compacted = compactObject(item);
      if (compacted) result.push(compacted);
    }
    return result;
  }
  
  const result = {};
  for (let key in obj) {
    const compacted = compactObject(obj[key]);
    if (compacted) result[key] = compacted;
  }
  return result;
};

// Test Cases
console.log(compactObject([null, 0, false, 1])); // [1]
console.log(compactObject({"a": null, "b": [false, 1]})); // {"b": [1]}
console.log(compactObject([null, 0, 5, [0], [false, 16]])); // [5, [], [16]]