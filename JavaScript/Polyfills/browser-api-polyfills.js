// Browser API Polyfills

// localStorage polyfill
if (!window.localStorage) {
  window.localStorage = {
    _data: {},
    setItem: function(key, value) {
      this._data[key] = String(value);
    },
    getItem: function(key) {
      return this._data.hasOwnProperty(key) ? this._data[key] : null;
    },
    removeItem: function(key) {
      delete this._data[key];
    },
    clear: function() {
      this._data = {};
    },
    key: function(index) {
      const keys = Object.keys(this._data);
      return keys[index] || null;
    },
    get length() {
      return Object.keys(this._data).length;
    }
  };
}

// sessionStorage polyfill (same as localStorage for this example)
if (!window.sessionStorage) {
  window.sessionStorage = window.localStorage;
}

// URLSearchParams polyfill
if (!window.URLSearchParams) {
  window.URLSearchParams = function(init) {
    this._params = {};
    
    if (typeof init === 'string') {
      init = init.replace(/^\?/, '');
      const pairs = init.split('&');
      pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) {
          this._params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
      });
    }
  };
  
  URLSearchParams.prototype.get = function(name) {
    return this._params[name] || null;
  };
  
  URLSearchParams.prototype.set = function(name, value) {
    this._params[name] = String(value);
  };
  
  URLSearchParams.prototype.has = function(name) {
    return this._params.hasOwnProperty(name);
  };
  
  URLSearchParams.prototype.delete = function(name) {
    delete this._params[name];
  };
  
  URLSearchParams.prototype.toString = function() {
    const pairs = [];
    for (const key in this._params) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(this._params[key]));
    }
    return pairs.join('&');
  };
}

// FormData polyfill (simplified)
if (!window.FormData) {
  window.FormData = function(form) {
    this._data = {};
    
    if (form) {
      const elements = form.elements;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.name && element.value) {
          this._data[element.name] = element.value;
        }
      }
    }
  };
  
  FormData.prototype.append = function(name, value) {
    this._data[name] = value;
  };
  
  FormData.prototype.get = function(name) {
    return this._data[name] || null;
  };
  
  FormData.prototype.has = function(name) {
    return this._data.hasOwnProperty(name);
  };
  
  FormData.prototype.delete = function(name) {
    delete this._data[name];
  };
}

// Test Cases
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test')); // 'value'

const params = new URLSearchParams('?name=John&age=30');
console.log(params.get('name')); // 'John'

const formData = new FormData();
formData.append('username', 'john_doe');
console.log(formData.get('username')); // 'john_doe'