// Merge k Sorted Lists - Merge k sorted linked lists
const mergeKLists = (lists) => {
  if (!lists.length) return null;
  
  const merge = (l1, l2) => {
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (l1 && l2) {
      if (l1.val <= l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }
    
    curr.next = l1 || l2;
    return dummy.next;
  };
  
  while (lists.length > 1) {
    const mergedLists = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(merge(l1, l2));
    }
    lists = mergedLists;
  }
  
  return lists[0];
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(mergeKLists([[1,4,5],[1,3,4],[2,6]])); // [1,1,2,3,4,4,5,6]