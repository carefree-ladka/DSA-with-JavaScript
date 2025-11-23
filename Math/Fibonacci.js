// Fibonacci sequence algorithms
const fibonacci = (n) => {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};

// Matrix exponentiation for Fibonacci
const fibonacciMatrix = (n) => {
  if (n <= 1) return n;
  
  const multiply = (A, B) => [
    [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
    [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
  ];
  
  const matrixPower = (mat, exp) => {
    let result = [[1, 0], [0, 1]]; // Identity matrix
    while (exp > 0) {
      if (exp & 1) result = multiply(result, mat);
      mat = multiply(mat, mat);
      exp >>= 1;
    }
    return result;
  };
  
  const fibMatrix = [[1, 1], [1, 0]];
  const result = matrixPower(fibMatrix, n);
  return result[0][1];
};

// Check if number is Fibonacci
const isFibonacci = (n) => {
  const isPerfectSquare = (x) => {
    const sqrt = Math.sqrt(x);
    return sqrt === Math.floor(sqrt);
  };
  
  return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
};

// Test Cases
console.log(fibonacci(10)); // 55
console.log(fibonacciMatrix(10)); // 55
console.log(isFibonacci(21)); // true