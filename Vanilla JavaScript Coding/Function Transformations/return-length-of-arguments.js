// Return Length of Arguments Passed - Count function arguments
const argumentsLength = (...args) => args.length;

// Test Cases
console.log(argumentsLength(1, 2, 3)); // 3
console.log(argumentsLength({})); // 1
console.log(argumentsLength()); // 0