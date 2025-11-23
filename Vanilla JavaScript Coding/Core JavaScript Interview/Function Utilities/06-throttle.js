/**
 * Throttle - Rate limiting with leading/trailing versions
 * Time: O(1), Space: O(1)
 */

function throttle(func, delay, options = {}) {
  let timeoutId;
  let lastExecTime = 0;
  let lastArgs;
  let lastThis;
  
  const { leading = true, trailing = true } = options;
  
  function exec() {
    lastExecTime = Date.now();
    timeoutId = null;
    func.apply(lastThis, lastArgs);
  }
  
  function throttled(...args) {
    const now = Date.now();
    
    if (!lastExecTime && !leading) {
      lastExecTime = now;
    }
    
    const remaining = delay - (now - lastExecTime);
    lastArgs = args;
    lastThis = this;
    
    if (remaining <= 0 || remaining > delay) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastExecTime = now;
      func.apply(this, args);
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(exec, remaining);
    }
  }
  
  throttled.cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastExecTime = 0;
    lastArgs = lastThis = undefined;
  };
  
  return throttled;
}

// Simple throttle version
function simpleThrottle(func, delay) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
}

// Test Cases
const throttledLog = throttle(console.log, 1000);
throttledLog('First'); // Executes immediately
throttledLog('Second'); // Throttled
throttledLog('Third'); // Throttled

const simpleThrottledLog = simpleThrottle(console.log, 1000);
simpleThrottledLog('Simple throttle test');