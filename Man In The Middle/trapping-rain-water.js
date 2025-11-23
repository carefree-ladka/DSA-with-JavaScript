// Trapping Rain Water - Calculate trapped water after rain
const trap = (height) => {
  let l = 0, r = height.length - 1, water = 0;
  let maxL = 0, maxR = 0;
  
  while (l < r) {
    if (height[l] < height[r]) {
      height[l] >= maxL ? maxL = height[l] : water += maxL - height[l];
      l++;
    } else {
      height[r] >= maxR ? maxR = height[r] : water += maxR - height[r];
      r--;
    }
  }
  return water;
};

// Test Cases
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
console.log(trap([3, 0, 2, 0, 4])); // 7