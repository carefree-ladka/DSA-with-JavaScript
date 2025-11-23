// Reverse Linked List II - Reverse nodes from position left to right
const reverseBetween = (head, left, right) => {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  for (let i = 0; i < left - 1; i++) prev = prev.next;
  
  let curr = prev.next;
  for (let i = 0; i < right - left; i++) {
    const next = curr.next;
    curr.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  
  return dummy.next;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(reverseBetween([1,2,3,4,5], 2, 4)); // [1,4,3,2,5]