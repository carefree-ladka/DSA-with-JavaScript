// Snakes and Ladders - Minimum moves to reach end
const snakesAndLadders = (board) => {
  const n = board.length;
  const getPos = (num) => {
    const row = Math.floor((num - 1) / n);
    const col = (num - 1) % n;
    const r = n - 1 - row;
    const c = row % 2 === 0 ? col : n - 1 - col;
    return [r, c];
  };
  
  const queue = [1];
  const visited = new Set([1]);
  let moves = 0;
  
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();
      if (curr === n * n) return moves;
      
      for (let next = curr + 1; next <= Math.min(curr + 6, n * n); next++) {
        const [r, c] = getPos(next);
        const dest = board[r][c] === -1 ? next : board[r][c];
        if (!visited.has(dest)) {
          visited.add(dest);
          queue.push(dest);
        }
      }
    }
    moves++;
  }
  
  return -1;
};

// Test Cases
console.log(snakesAndLadders([[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]])); // 4