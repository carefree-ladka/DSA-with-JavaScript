// Partition List - Partition list around value x
const partition = (head, x) => {
  const beforeHead = new ListNode(0);
  const afterHead = new ListNode(0);
  let before = beforeHead, after = afterHead;
  
  while (head) {
    if (head.val < x) {
      before.next = head;
      before = before.next;
    } else {
      after.next = head;
      after = after.next;
    }
    head = head.next;
  }
  
  after.next = null;
  before.next = afterHead.next;
  
  return beforeHead.next;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(partition([1,4,3,2,5,2], 3)); // [1,2,2,4,3,5]