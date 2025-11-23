/**
 * GroupBy - Group array elements by key function
 * Time: O(n), Space: O(n)
 */

function groupBy(array, keyFn) {
  if (typeof keyFn === 'string') {
    const key = keyFn;
    keyFn = item => item[key];
  }
  
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

// GroupBy with Map (preserves key types)
function groupByMap(array, keyFn) {
  if (typeof keyFn === 'string') {
    const key = keyFn;
    keyFn = item => item[key];
  }
  
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
    return groups;
  }, new Map());
}

// Multi-level groupBy
function groupByMultiple(array, ...keyFns) {
  if (keyFns.length === 0) return array;
  
  const [firstKey, ...restKeys] = keyFns;
  const groups = groupBy(array, firstKey);
  
  if (restKeys.length === 0) return groups;
  
  const result = {};
  for (const [key, items] of Object.entries(groups)) {
    result[key] = groupByMultiple(items, ...restKeys);
  }
  
  return result;
}

// GroupBy with aggregation
function groupByAggregate(array, keyFn, aggregateFn) {
  const groups = groupBy(array, keyFn);
  const result = {};
  
  for (const [key, items] of Object.entries(groups)) {
    result[key] = aggregateFn(items);
  }
  
  return result;
}

// Test Cases
const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Engineering' },
  { name: 'Charlie', age: 25, department: 'Marketing' },
  { name: 'David', age: 30, department: 'Marketing' }
];

console.log(groupBy(users, 'department'));
// { Engineering: [...], Marketing: [...] }

console.log(groupBy(users, user => user.age));
// { 25: [...], 30: [...] }

console.log(groupByMultiple(users, 'department', 'age'));
// { Engineering: { 25: [...], 30: [...] }, Marketing: { 25: [...], 30: [...] } }

console.log(groupByAggregate(users, 'department', items => items.length));
// { Engineering: 2, Marketing: 2 }