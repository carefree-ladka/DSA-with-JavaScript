// Text Justification - Justify text to given width
const fullJustify = (words, maxWidth) => {
  const result = [];
  let i = 0;
  
  while (i < words.length) {
    let line = [words[i]];
    let length = words[i].length;
    i++;
    
    while (i < words.length && length + 1 + words[i].length <= maxWidth) {
      line.push(words[i]);
      length += 1 + words[i].length;
      i++;
    }
    
    if (i === words.length || line.length === 1) {
      result.push(line.join(' ').padEnd(maxWidth));
    } else {
      const totalSpaces = maxWidth - line.reduce((sum, word) => sum + word.length, 0);
      const gaps = line.length - 1;
      const spacePerGap = Math.floor(totalSpaces / gaps);
      const extraSpaces = totalSpaces % gaps;
      
      let justified = "";
      for (let j = 0; j < line.length - 1; j++) {
        justified += line[j] + ' '.repeat(spacePerGap + (j < extraSpaces ? 1 : 0));
      }
      justified += line[line.length - 1];
      result.push(justified);
    }
  }
  
  return result;
};

// Test Cases
console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16));
// ["This    is    an","example  of text","justification.  "]