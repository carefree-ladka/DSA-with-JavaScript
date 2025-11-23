// Symbol Polyfill
(function() {
  if (typeof Symbol !== 'undefined') return;
  
  let symbolCounter = 0;
  
  function Symbol(description) {
    if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
    const symbol = Object.create(Symbol.prototype);
    symbol._description = description;
    symbol._id = '__symbol_' + (symbolCounter++);
    return symbol;
  }
  
  Symbol.prototype.toString = function() {
    return 'Symbol(' + (this._description || '') + ')';
  };
  
  Symbol.prototype.valueOf = function() {
    return this._id;
  };
  
  Symbol.for = function(key) {
    if (!Symbol._registry) Symbol._registry = {};
    if (!Symbol._registry[key]) {
      Symbol._registry[key] = Symbol(key);
    }
    return Symbol._registry[key];
  };
  
  Symbol.keyFor = function(symbol) {
    if (!Symbol._registry) return undefined;
    for (const key in Symbol._registry) {
      if (Symbol._registry[key] === symbol) return key;
    }
    return undefined;
  };
  
  Symbol.iterator = Symbol('Symbol.iterator');
  Symbol.toStringTag = Symbol('Symbol.toStringTag');
  
  window.Symbol = Symbol;
})();

// Test Cases
const sym1 = Symbol('test');
const sym2 = Symbol.for('global');
console.log(sym1.toString()); // Symbol(test)
console.log(Symbol.keyFor(sym2)); // 'global'