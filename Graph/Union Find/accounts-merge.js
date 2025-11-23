// Accounts Merge - Merge accounts with common emails
const accountsMerge = (accounts) => {
  const parent = {};
  const emailToName = {};
  
  const find = (x) => parent[x] === x ? x : parent[x] = find(parent[x]);
  const union = (x, y) => parent[find(x)] = find(y);
  
  for (let [name, ...emails] of accounts) {
    for (let email of emails) {
      if (!(email in parent)) parent[email] = email;
      emailToName[email] = name;
      union(emails[0], email);
    }
  }
  
  const groups = {};
  for (let email in parent) {
    const root = find(email);
    if (!groups[root]) groups[root] = [];
    groups[root].push(email);
  }
  
  return Object.values(groups).map(emails => [emailToName[emails[0]], ...emails.sort()]);
};

// Test Cases
console.log(accountsMerge([["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]));
// [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]