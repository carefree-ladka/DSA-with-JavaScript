// Rotate List - Rotate list to the right by k places
const rotateRight = (head, k) => {
  if (!head || !head.next || k === 0) return head;
  
  let length = 1, tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  
  k %= length;
  if (k === 0) return head;
  
  let newTail = head;
  for (let i = 0; i < length - k - 1; i++) {
    newTail = newTail.next;
  }
  
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;
  
  return newHead;
};

// Test Cases
// function ListNode(val, next) { this.val = val; this.next = next; }
// console.log(rotateRight([1,2,3,4,5], 2)); // [4,5,1,2,3]