// Find intersections of two interval lists
const intervalIntersection = (firstList, secondList) => {
  const result = [];
  let i = 0, j = 0;
  
  while (i < firstList.length && j < secondList.length) {
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);
    
    if (start <= end) {
      result.push([start, end]);
    }
    
    if (firstList[i][1] < secondList[j][1]) {
      i++;
    } else {
      j++;
    }
  }
  
  return result;
};

// Test Cases
console.log(intervalIntersection([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]])); 
// [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]