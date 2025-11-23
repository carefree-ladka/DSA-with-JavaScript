// To Be Or Not To Be - Expect function with toBe and notToBe
const expect = (val) => {
  return {
    toBe: (expected) => {
      if (val === expected) return true;
      throw new Error("Not Equal");
    },
    notToBe: (expected) => {
      if (val !== expected) return true;
      throw new Error("Equal");
    }
  };
};

// Test Cases
console.log(expect(5).toBe(5)); // true
console.log(expect(5).notToBe(5)); // throws "Equal"