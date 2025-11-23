// Create Hello World Function - Return function that returns "Hello World"
const createHelloWorld = () => {
  return () => "Hello World";
};

// Test Cases
const f = createHelloWorld();
console.log(f()); // "Hello World"