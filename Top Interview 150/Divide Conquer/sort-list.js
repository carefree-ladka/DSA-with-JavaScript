// Sort List - Sort linked list using merge sort
const sortList = (head) => {
  if (!head || !head.next) return head;
  
  let slow = head, fast = head, prev = null;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = null;
  
  const left = sortList(head);
  const right = sortList(slow);
  
  return merge(left, right);
};

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

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(sortList([4,2,1,3])); // [1,2,3,4]