// Add Two Numbers - Add two numbers represented as linked lists
const addTwoNumbers = (l1, l2) => {
  const dummy = new ListNode(0);
  let curr = dummy, carry = 0;
  
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }
  
  return dummy.next;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(addTwoNumbers([2,4,3], [5,6,4])); // [7,0,8]