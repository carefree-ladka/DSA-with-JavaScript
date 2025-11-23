// Merge Two Sorted Lists - Merge two sorted linked lists
const mergeTwoLists = (list1, list2) => {
  const dummy = new ListNode(0);
  let curr = dummy;
  
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }
  
  curr.next = list1 || list2;
  return dummy.next;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(mergeTwoLists([1,2,4], [1,3,4])); // [1,1,2,3,4,4]