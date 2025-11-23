// Linked List Cycle - Detect cycle in linked list
const hasCycle = (head) => {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

// Test Cases
// ListNode definition: function ListNode(val) { this.val = val; this.next = null; }
// console.log(hasCycle(head)); // depends on input