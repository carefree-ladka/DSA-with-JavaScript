// Remove Duplicates from Sorted List II - Remove all nodes with duplicates
const deleteDuplicates = (head) => {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  while (head) {
    if (head.next && head.val === head.next.val) {
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      prev.next = head.next;
    } else {
      prev = prev.next;
    }
    head = head.next;
  }
  
  return dummy.next;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(deleteDuplicates([1,2,3,3,4,4,5])); // [1,2,5]