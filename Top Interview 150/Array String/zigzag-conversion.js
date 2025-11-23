// Zigzag Conversion - Convert string to zigzag pattern
const convert = (s, numRows) => {
  if (numRows === 1) return s;
  const rows = Array.from({length: numRows}, () => "");
  let row = 0, direction = 1;
  
  for (let char of s) {
    rows[row] += char;
    row += direction;
    if (row === numRows - 1 || row === 0) direction = -direction;
  }
  
  return rows.join("");
};

// Test Cases
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"