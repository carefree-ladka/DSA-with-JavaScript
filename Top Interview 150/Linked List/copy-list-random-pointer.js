// Copy List with Random Pointer - Deep copy linked list with random pointers
const copyRandomList = (head) => {
  if (!head) return null;
  const map = new Map();
  
  let curr = head;
  while (curr) {
    map.set(curr, new Node(curr.val));
    curr = curr.next;
  }
  
  curr = head;
  while (curr) {
    map.get(curr).next = map.get(curr.next) || null;
    map.get(curr).random = map.get(curr.random) || null;
    curr = curr.next;
  }
  
  return map.get(head);
};

// Test Cases
// function Node(val, next, random) { this.val = val; this.next = next; this.random = random; }