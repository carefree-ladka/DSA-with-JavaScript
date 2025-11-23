// Word Search II - Find all words in board using Trie
const findWords = (board, words) => {
  const trie = {};
  for (let word of words) {
    let node = trie;
    for (let char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.word = word;
  }
  
  const result = [];
  const m = board.length, n = board[0].length;
  
  const dfs = (i, j, node) => {
    const char = board[i][j];
    if (!node[char]) return;
    
    node = node[char];
    if (node.word) {
      result.push(node.word);
      delete node.word;
    }
    
    board[i][j] = '#';
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    for (let [di, dj] of dirs) {
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] !== '#') {
        dfs(ni, nj, node);
      }
    }
    board[i][j] = char;
  };
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, trie);
    }
  }
  
  return result;
};

// Test Cases
console.log(findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])); // ["eat","oath"]