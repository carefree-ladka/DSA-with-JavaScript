// String Methods Polyfills

// String.startsWith
String.prototype.myStartsWith = function(searchString, position = 0) {
  return this.substr(position, searchString.length) === searchString;
};

// String.endsWith
String.prototype.myEndsWith = function(searchString, length = this.length) {
  return this.substr(length - searchString.length, searchString.length) === searchString;
};

// String.includes
String.prototype.myIncludes = function(searchString, position = 0) {
  return this.indexOf(searchString, position) !== -1;
};

// String.repeat
String.prototype.myRepeat = function(count) {
  if (count < 0 || count === Infinity) throw new RangeError('Invalid count value');
  let result = '';
  for (let i = 0; i < count; i++) {
    result += this;
  }
  return result;
};

// String.padStart
String.prototype.myPadStart = function(targetLength, padString = ' ') {
  if (this.length >= targetLength) return String(this);
  const pad = String(padString);
  const padLength = targetLength - this.length;
  const fullPads = Math.floor(padLength / pad.length);
  const remainder = padLength % pad.length;
  return pad.myRepeat(fullPads) + pad.slice(0, remainder) + this;
};

// String.padEnd
String.prototype.myPadEnd = function(targetLength, padString = ' ') {
  if (this.length >= targetLength) return String(this);
  const pad = String(padString);
  const padLength = targetLength - this.length;
  const fullPads = Math.floor(padLength / pad.length);
  const remainder = padLength % pad.length;
  return this + pad.myRepeat(fullPads) + pad.slice(0, remainder);
};

// String.trim
String.prototype.myTrim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};

// Test Cases
console.log('hello'.myStartsWith('he')); // true
console.log('hello'.myEndsWith('lo')); // true
console.log('hello'.myIncludes('ell')); // true
console.log('hi'.myRepeat(3)); // 'hihihi'
console.log('5'.myPadStart(3, '0')); // '005'