// Fetch API Polyfill (Simplified)
if (!window.fetch) {
  window.fetch = function(url, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const method = options.method || 'GET';
      const headers = options.headers || {};
      
      xhr.open(method, url);
      
      // Set headers
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      
      xhr.onload = () => {
        const response = {
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          statusText: xhr.statusText,
          text: () => Promise.resolve(xhr.responseText),
          json: () => Promise.resolve(JSON.parse(xhr.responseText)),
          headers: new Map()
        };
        resolve(response);
      };
      
      xhr.onerror = () => reject(new Error('Network Error'));
      xhr.ontimeout = () => reject(new Error('Timeout'));
      
      xhr.send(options.body);
    });
  };
}

// Response polyfill
if (!window.Response) {
  window.Response = function(body, options = {}) {
    this.ok = (options.status || 200) >= 200 && (options.status || 200) < 300;
    this.status = options.status || 200;
    this.statusText = options.statusText || 'OK';
    this.headers = new Map(Object.entries(options.headers || {}));
    
    this.text = () => Promise.resolve(String(body));
    this.json = () => Promise.resolve(JSON.parse(body));
  };
}

// Test Cases
// fetch('/api/data').then(response => response.json()).then(console.log);