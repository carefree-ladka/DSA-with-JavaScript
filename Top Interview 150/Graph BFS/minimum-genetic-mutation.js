// Minimum Genetic Mutation - BFS gene transformation
const minMutation = (start, end, bank) => {
  const bankSet = new Set(bank);
  if (!bankSet.has(end)) return -1;
  
  const queue = [[start, 0]];
  const visited = new Set([start]);
  const genes = ['A', 'C', 'G', 'T'];
  
  while (queue.length) {
    const [gene, steps] = queue.shift();
    if (gene === end) return steps;
    
    for (let i = 0; i < 8; i++) {
      for (let char of genes) {
        const newGene = gene.slice(0, i) + char + gene.slice(i + 1);
        if (bankSet.has(newGene) && !visited.has(newGene)) {
          visited.add(newGene);
          queue.push([newGene, steps + 1]);
        }
      }
    }
  }
  return -1;
};

// Test Cases
console.log(minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"])); // 1
console.log(minMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA","AACCGCTA","AAACGGTA"])); // 2