// Fractional Knapsack Problem - Items can be broken into fractions

// Brute Force - Try all possible fractions (impractical for continuous)
const fractionalKnapsackBruteForce = (weights, values, capacity) => {
  // For demonstration, we'll use greedy which is optimal for fractional
  const items = weights.map((w, i) => ({ weight: w, value: values[i], ratio: values[i] / w, index: i }));
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  
  for (let item of items) {
    if (remainingCapacity >= item.weight) {
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      totalValue += item.value * (remainingCapacity / item.weight);
      break;
    }
  }
  
  return totalValue;
};

// Optimized Greedy - Sort by value-to-weight ratio
const fractionalKnapsackGreedy = (weights, values, capacity) => {
  const items = weights.map((w, i) => ({ weight: w, value: values[i], ratio: values[i] / w }));
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  
  for (let item of items) {
    if (remainingCapacity === 0) break;
    
    const takeWeight = Math.min(item.weight, remainingCapacity);
    totalValue += (takeWeight / item.weight) * item.value;
    remainingCapacity -= takeWeight;
  }
  
  return totalValue;
};

// With item tracking
const fractionalKnapsackWithItems = (weights, values, capacity) => {
  const items = weights.map((w, i) => ({ weight: w, value: values[i], ratio: values[i] / w, index: i }));
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  const solution = [];
  
  for (let item of items) {
    if (remainingCapacity === 0) break;
    
    const takeWeight = Math.min(item.weight, remainingCapacity);
    const fraction = takeWeight / item.weight;
    
    totalValue += fraction * item.value;
    remainingCapacity -= takeWeight;
    
    solution.push({ index: item.index, fraction, value: fraction * item.value });
  }
  
  return { totalValue, solution };
};

// Test Cases
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;

console.log("Brute Force (Greedy):", fractionalKnapsackBruteForce(weights, values, capacity)); // 240
console.log("Optimized Greedy:", fractionalKnapsackGreedy(weights, values, capacity)); // 240
console.log("With Items:", fractionalKnapsackWithItems(weights, values, capacity));