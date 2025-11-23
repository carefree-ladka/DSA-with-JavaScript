# Graph Theory Problems

A comprehensive collection of graph algorithms and problems, organized by algorithmic patterns and techniques.

## 📁 Structure

```
Graph/
├── Standard Traversal/    # DFS/BFS basic traversals (8 problems)
├── BFS/                  # Breadth-first search applications (7 problems)
├── Matrix Graphs/        # 2D grid graph problems (5 problems)
├── Graph Theory/         # Graph properties and theory (5 problems)
├── Union Find/           # Disjoint set union problems (4 problems)
└── Topological Sort/     # DAG ordering problems (3 problems)
```

## 🎯 Problem Categories

### Standard Traversal (8 problems)
- **number-of-provinces.js** - Connected components using DFS
- **eventual-safe-states.js** - Cycle detection with coloring
- **keys-and-rooms.js** - Reachability using DFS
- **shortest-path-alternating-colors.js** - BFS with state tracking
- **time-needed-inform-employees.js** - Tree traversal timing
- **reorder-routes.js** - Direction analysis with DFS
- **all-paths-source-target.js** - Path enumeration with backtracking
- **critical-connections.js** - Bridge finding with Tarjan's algorithm

### BFS (7 problems)
- **nearest-exit-maze.js** - Shortest path in maze
- **shortest-bridge.js** - Multi-source BFS between islands
- **minimum-genetic-mutation.js** - Word transformation BFS
- **word-ladder.js** - Shortest transformation sequence
- **jump-game-iii.js** - Reachability with BFS
- **01-matrix.js** - Multi-source BFS for distances
- **shortest-path-binary-matrix.js** - 8-directional BFS in matrix

### Matrix Graphs (5 problems)
- **number-of-islands.js** - Connected components in 2D grid
- **number-of-enclaves.js** - Boundary-connected components
- **number-of-closed-islands.js** - Islands not touching boundary
- **max-area-island.js** - Largest connected component
- **pacific-atlantic-water-flow.js** - Multi-source reachability

### Graph Theory (5 problems)
- **find-town-judge.js** - In-degree/out-degree analysis
- **minimum-vertices-reach-all.js** - Dominating set problem
- **maximal-network-rank.js** - Graph connectivity metrics
- **is-graph-bipartite.js** - 2-coloring with DFS/BFS
- **graph-valid-tree.js** - Tree validation (connected + acyclic)

### Union Find (4 problems)
- **accounts-merge.js** - Component merging with emails
- **satisfiability-equality-equations.js** - Constraint satisfaction
- **lexicographically-smallest-equivalent.js** - String equivalence
- **similar-string-groups.js** - String similarity clustering

### Topological Sort (3 problems)
- **course-schedule.js** - Cycle detection in DAG
- **course-schedule-ii.js** - Topological ordering
- **alien-dictionary.js** - Character ordering from words

## 🚀 Key Algorithms Covered

### Traversal Algorithms
- **DFS (Depth-First Search)** - Connected components, cycle detection
- **BFS (Breadth-First Search)** - Shortest path, level traversal
- **Multi-source BFS** - Distance from multiple starting points
- **State-based BFS** - BFS with additional state tracking

### Graph Properties
- **Connected Components** - Union Find, DFS component counting
- **Cycle Detection** - DFS coloring, topological sort
- **Bipartite Check** - 2-coloring with DFS
- **Bridge Finding** - Tarjan's algorithm for critical connections

### Advanced Techniques
- **Union Find (DSU)** - Path compression, union by rank
- **Topological Sort** - Kahn's algorithm, DFS-based
- **Tarjan's Algorithm** - Bridge detection, SCC
- **Matrix Traversal** - 4/8-directional grid problems

### Problem-Specific Patterns
- **Boundary Analysis** - Pacific Atlantic, closed islands
- **String Transformations** - Word ladder, genetic mutations
- **Constraint Satisfaction** - Equation satisfiability
- **Reachability Analysis** - Keys and rooms, safe states

## 📊 Complexity Analysis

### Time Complexities
- **DFS/BFS**: O(V + E) - visit each vertex and edge once
- **Union Find**: O(α(n)) - inverse Ackermann (nearly O(1))
- **Topological Sort**: O(V + E) - process each node and edge
- **Matrix Traversal**: O(m × n) - visit each cell once
- **Tarjan's Algorithm**: O(V + E) - single DFS pass

### Space Complexities
- **Adjacency List**: O(V + E) - optimal graph representation
- **Visited Set/Array**: O(V) - track processed nodes
- **BFS Queue**: O(V) - worst case all nodes in queue
- **DFS Stack**: O(V) - recursion depth or explicit stack
- **Union Find**: O(V) - parent and rank arrays

## 🎓 Interview Preparation

### Must-Know Problems (Top 10)
1. **Number of Islands** - DFS/BFS connected components
2. **Course Schedule** - Topological sort, cycle detection
3. **Word Ladder** - BFS shortest transformation
4. **Graph Valid Tree** - Tree validation (connected + acyclic)
5. **Accounts Merge** - Union Find with strings
6. **Pacific Atlantic Water Flow** - Multi-source DFS
7. **Number of Provinces** - Connected components counting
8. **Shortest Bridge** - DFS + BFS combination
9. **Is Graph Bipartite** - Graph coloring
10. **Critical Connections** - Tarjan's bridge algorithm

### Problem Patterns by Company
**FAANG Favorites:**
- Connected components (Islands, Provinces)
- Shortest path (Word Ladder, Binary Matrix)
- Topological sort (Course Schedule, Alien Dictionary)
- Union Find (Accounts Merge, Equation Satisfiability)

### Algorithm Selection Guide
- **DFS**: Connected components, cycle detection, path finding
- **BFS**: Shortest path, level-order problems, multi-source
- **Union Find**: Dynamic connectivity, equivalence relations
- **Topological Sort**: Dependency resolution, DAG ordering

### Implementation Tips
- **Grid problems**: Use direction arrays `[[0,1],[1,0],[0,-1],[-1,0]]`
- **BFS**: Use queue for level-by-level processing
- **DFS**: Mark visited to avoid cycles
- **Union Find**: Path compression for O(α(n)) operations
- **State tracking**: Combine position with additional state info

## 📈 Difficulty Progression

**Easy (8 problems)**: Basic traversal, simple connectivity
**Medium (20 problems)**: Multi-step algorithms, state tracking
**Hard (4 problems)**: Advanced algorithms, optimization

## ✅ Complete Implementation

**Total: 32 Graph Problems** covering all essential patterns for technical interviews at top tech companies.

## 🔗 LeetCode Graph Study Plan

Complete implementation of LeetCode's graph theory curriculum:
- **Standard Traversal**: DFS/BFS fundamentals
- **BFS Applications**: Shortest path variations
- **Matrix Graphs**: 2D grid problems
- **Graph Theory**: Properties and validation
- **Union Find**: Disjoint set applications
- **Topological Sort**: DAG ordering problems

All problems include minimal, optimized solutions with test cases for interview preparation.