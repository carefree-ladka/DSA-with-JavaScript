// Template Literals Polyfill
function templateLiteral(strings, ...values) {
  let result = '';
  
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }
  
  return result;
}

// Tagged template literals helper
function taggedTemplate(tag, strings, ...values) {
  return tag(strings, ...values);
}

// String.raw polyfill
if (!String.raw) {
  String.raw = function(template, ...substitutions) {
    let result = '';
    const strings = template.raw || template;
    
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < substitutions.length) {
        result += String(substitutions[i]);
      }
    }
    
    return result;
  };
}

// Helper for manual template literal creation
function createTemplate(strings, ...values) {
  return templateLiteral(strings, ...values);
}

// Example usage (manual transformation needed)
function exampleUsage() {
  const name = 'World';
  const age = 25;
  
  // Instead of: `Hello ${name}! You are ${age} years old.`
  const message = templateLiteral(['Hello ', '! You are ', ' years old.'], name, age);
  console.log(message); // Hello World! You are 25 years old.
  
  // Tagged template example
  function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] ? `<mark>${values[i]}</mark>` : '';
      return result + string + value;
    }, '');
  }
  
  // Instead of: highlight`Name: ${name}, Age: ${age}`
  const highlighted = taggedTemplate(highlight, ['Name: ', ', Age: ', ''], name, age);
  console.log(highlighted); // Name: <mark>World</mark>, Age: <mark>25</mark>
}

// Multiline string helper
function multiline(...lines) {
  return lines.join('\n');
}

// Test Cases
exampleUsage();

// Multiline example
const multilineText = multiline(
  'Line 1',
  'Line 2',
  'Line 3'
);
console.log(multilineText);

// String.raw example
const rawString = String.raw(['Hello\n', '\tWorld'], 'there');
console.log(rawString); // Hello\nthere\tWorld