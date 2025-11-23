// Maximum Sum Circular Subarray - Max sum in circular array
const maxSubarraySumCircular = (nums) => {
  const kadane = (arr) => {
    let maxSum = arr[0], currentSum = arr[0];
    for (let i = 1; i < arr.length; i++) {
      currentSum = Math.max(arr[i], currentSum + arr[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
  };
  
  const maxKadane = kadane(nums);
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  const maxCircular = totalSum - kadane(nums.map(x => -x));
  
  return maxCircular === 0 ? maxKadane : Math.max(maxKadane, maxCircular);
};

// Test Cases
console.log(maxSubarraySumCircular([1,-2,3,-2])); // 3
console.log(maxSubarraySumCircular([5,-3,5])); // 10
console.log(maxSubarraySumCircular([-3,-2,-3])); // -2