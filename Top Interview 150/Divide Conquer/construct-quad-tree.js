// Construct Quad Tree - Build quad tree from 2D grid
const construct = (grid) => {
  const build = (x, y, size) => {
    if (size === 1) return new Node(grid[x][y] === 1, true);
    
    const half = size / 2;
    const topLeft = build(x, y, half);
    const topRight = build(x, y + half, half);
    const bottomLeft = build(x + half, y, half);
    const bottomRight = build(x + half, y + half, half);
    
    if (topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf &&
        topLeft.val === topRight.val && topRight.val === bottomLeft.val && bottomLeft.val === bottomRight.val) {
      return new Node(topLeft.val, true);
    }
    
    return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
  };
  
  return build(0, 0, grid.length);
};

// Test Cases
// function Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) { ... }
// console.log(construct([[0,1],[1,0]])); // QuadTree representation