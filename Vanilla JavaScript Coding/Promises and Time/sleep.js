// Sleep - Async function that resolves after given milliseconds
const sleep = (millis) => {
  return new Promise(resolve => setTimeout(resolve, millis));
};

// Test Cases
let t = Date.now();
sleep(100).then(() => console.log(Date.now() - t)); // ~100