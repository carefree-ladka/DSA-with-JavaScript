// ES6 Modules Polyfill (Simple Implementation)
(function() {
  if (typeof window === 'undefined') return;
  
  const moduleCache = {};
  const moduleRegistry = {};
  
  // Module loader
  function loadModule(name) {
    if (moduleCache[name]) {
      return moduleCache[name].exports;
    }
    
    if (!moduleRegistry[name]) {
      throw new Error(`Module '${name}' not found`);
    }
    
    const module = {
      exports: {},
      loaded: false
    };
    
    moduleCache[name] = module;
    
    // Execute module
    moduleRegistry[name].call(module.exports, module, module.exports, requireModule);
    module.loaded = true;
    
    return module.exports;
  }
  
  // Require function
  function requireModule(name) {
    return loadModule(name);
  }
  
  // Define module
  function defineModule(name, factory) {
    moduleRegistry[name] = factory;
  }
  
  // Export helpers
  function exportDefault(value) {
    return { default: value };
  }
  
  function exportNamed(exports) {
    return exports;
  }
  
  // Import helpers
  function importDefault(module) {
    return module.default;
  }
  
  function importNamed(module, names) {
    const result = {};
    names.forEach(name => {
      result[name] = module[name];
    });
    return result;
  }
  
  function importAll(module) {
    return module;
  }
  
  // Dynamic import polyfill
  function dynamicImport(moduleName) {
    return Promise.resolve().then(() => {
      return loadModule(moduleName);
    });
  }
  
  // Global API
  window.defineModule = defineModule;
  window.requireModule = requireModule;
  window.exportDefault = exportDefault;
  window.exportNamed = exportNamed;
  window.importDefault = importDefault;
  window.importNamed = importNamed;
  window.importAll = importAll;
  window.dynamicImport = dynamicImport;
  
  // Example usage
  function exampleUsage() {
    // Define a module: export default function add(a, b) { return a + b; }
    defineModule('math', function(module, exports, require) {
      function add(a, b) {
        return a + b;
      }
      
      function multiply(a, b) {
        return a * b;
      }
      
      // Default export
      exports.default = add;
      
      // Named exports
      exports.add = add;
      exports.multiply = multiply;
    });
    
    // Define another module: import { add } from 'math';
    defineModule('calculator', function(module, exports, require) {
      const math = require('math');
      const add = math.add;
      
      function calculate(a, b) {
        return add(a, b) * 2;
      }
      
      exports.default = calculate;
    });
    
    // Use modules
    const math = requireModule('math');
    const calculator = requireModule('calculator');
    
    console.log(math.add(2, 3)); // 5
    console.log(calculator.default(2, 3)); // 10
    
    // Dynamic import example
    dynamicImport('math').then(module => {
      console.log('Dynamically loaded:', module.multiply(4, 5)); // 20
    });
  }
  
  // Auto-run example
  exampleUsage();
})();

// CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    defineModule: defineModule,
    requireModule: requireModule,
    exportDefault: exportDefault,
    exportNamed: exportNamed
  };
}