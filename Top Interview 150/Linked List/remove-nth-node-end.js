// Remove Nth Node From End of List - Remove nth node from end
const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy, slow = dummy;
  
  for (let i = 0; i <= n; i++) fast = fast.next;
  
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  slow.next = slow.next.next;
  return dummy.next;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(removeNthFromEnd([1,2,3,4,5], 2)); // [1,2,3,5]