// Promise Time Limit - Add timeout to async function
const timeLimit = (fn, t) => {
  return async (...args) => {
    return Promise.race([
      fn(...args),
      new Promise((_, reject) => 
        setTimeout(() => reject("Time Limit Exceeded"), t)
      )
    ]);
  };
};

// Test Cases
const limited = timeLimit((n) => new Promise(res => setTimeout(res, 100)), 50);
limited().catch(console.log); // "Time Limit Exceeded"

const limited2 = timeLimit((n) => new Promise(res => setTimeout(() => res(n), 10)), 50);
limited2(5).then(console.log); // 5