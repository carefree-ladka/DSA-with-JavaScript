// Rate Limiter - System design classic (Facebook, Twitter, Uber)
// Implement various rate limiting algorithms

// Token Bucket Rate Limiter
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens per second
    this.lastRefill = Date.now();
  }
  
  refill() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = Math.floor(timePassed * this.refillRate);
    
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
  
  consume(tokens = 1) {
    this.refill();
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
  
  getAvailableTokens() {
    this.refill();
    return this.tokens;
  }
}

// Sliding Window Rate Limiter
class SlidingWindowRateLimiter {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize * 1000; // Convert to milliseconds
    this.maxRequests = maxRequests;
    this.requests = [];
  }
  
  isAllowed() {
    const now = Date.now();
    const windowStart = now - this.windowSize;
    
    // Remove old requests
    this.requests = this.requests.filter(time => time > windowStart);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }
  
  getRequestCount() {
    const now = Date.now();
    const windowStart = now - this.windowSize;
    this.requests = this.requests.filter(time => time > windowStart);
    return this.requests.length;
  }
}

// Fixed Window Rate Limiter
class FixedWindowRateLimiter {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize * 1000;
    this.maxRequests = maxRequests;
    this.windowStart = Date.now();
    this.requestCount = 0;
  }
  
  isAllowed() {
    const now = Date.now();
    
    // Check if we need to reset window
    if (now - this.windowStart >= this.windowSize) {
      this.windowStart = now;
      this.requestCount = 0;
    }
    
    if (this.requestCount < this.maxRequests) {
      this.requestCount++;
      return true;
    }
    
    return false;
  }
  
  getRequestCount() {
    const now = Date.now();
    if (now - this.windowStart >= this.windowSize) {
      return 0;
    }
    return this.requestCount;
  }
}

// Leaky Bucket Rate Limiter
class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity;
    this.queue = [];
    this.leakRate = leakRate; // requests per second
    this.lastLeak = Date.now();
  }
  
  leak() {
    const now = Date.now();
    const timePassed = (now - this.lastLeak) / 1000;
    const leakCount = Math.floor(timePassed * this.leakRate);
    
    for (let i = 0; i < leakCount && this.queue.length > 0; i++) {
      this.queue.shift();
    }
    
    this.lastLeak = now;
  }
  
  addRequest(request) {
    this.leak();
    
    if (this.queue.length < this.capacity) {
      this.queue.push(request);
      return true;
    }
    
    return false; // Bucket overflow
  }
  
  getQueueSize() {
    this.leak();
    return this.queue.length;
  }
}

// Distributed Rate Limiter (Redis-like)
class DistributedRateLimiter {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize;
    this.maxRequests = maxRequests;
    this.storage = new Map(); // Simulates Redis
  }
  
  isAllowed(userId) {
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - this.windowSize;
    const key = `${userId}:${Math.floor(now / this.windowSize)}`;
    
    // Clean old windows
    for (let [k, v] of this.storage) {
      if (v.timestamp < windowStart) {
        this.storage.delete(k);
      }
    }
    
    const current = this.storage.get(key) || { count: 0, timestamp: now };
    
    if (current.count < this.maxRequests) {
      current.count++;
      current.timestamp = now;
      this.storage.set(key, current);
      return true;
    }
    
    return false;
  }
  
  getRemainingRequests(userId) {
    const now = Math.floor(Date.now() / 1000);
    const key = `${userId}:${Math.floor(now / this.windowSize)}`;
    const current = this.storage.get(key) || { count: 0 };
    return Math.max(0, this.maxRequests - current.count);
  }
}

// Adaptive Rate Limiter
class AdaptiveRateLimiter {
  constructor(baseLimit, windowSize) {
    this.baseLimit = baseLimit;
    this.currentLimit = baseLimit;
    this.windowSize = windowSize;
    this.requests = [];
    this.errors = [];
    this.adaptationFactor = 0.1;
  }
  
  isAllowed() {
    const now = Date.now();
    const windowStart = now - this.windowSize * 1000;
    
    // Clean old data
    this.requests = this.requests.filter(time => time > windowStart);
    this.errors = this.errors.filter(time => time > windowStart);
    
    // Adapt limit based on error rate
    const errorRate = this.errors.length / Math.max(1, this.requests.length);
    if (errorRate > 0.1) { // High error rate, decrease limit
      this.currentLimit = Math.max(1, this.currentLimit * (1 - this.adaptationFactor));
    } else if (errorRate < 0.01) { // Low error rate, increase limit
      this.currentLimit = Math.min(this.baseLimit * 2, this.currentLimit * (1 + this.adaptationFactor));
    }
    
    if (this.requests.length < this.currentLimit) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }
  
  recordError() {
    this.errors.push(Date.now());
  }
  
  getCurrentLimit() {
    return Math.floor(this.currentLimit);
  }
}

// Test Cases
const tokenBucket = new TokenBucket(10, 2);
console.log("Token bucket consume:", tokenBucket.consume(3)); // true
console.log("Available tokens:", tokenBucket.getAvailableTokens());

const slidingWindow = new SlidingWindowRateLimiter(60, 100);
console.log("Sliding window allowed:", slidingWindow.isAllowed()); // true

const fixedWindow = new FixedWindowRateLimiter(60, 100);
console.log("Fixed window allowed:", fixedWindow.isAllowed()); // true

const leakyBucket = new LeakyBucket(10, 2);
console.log("Leaky bucket add:", leakyBucket.addRequest("req1")); // true

const distributed = new DistributedRateLimiter(60, 100);
console.log("Distributed allowed:", distributed.isAllowed("user123")); // true
console.log("Remaining requests:", distributed.getRemainingRequests("user123"));

const adaptive = new AdaptiveRateLimiter(100, 60);
console.log("Adaptive allowed:", adaptive.isAllowed()); // true
console.log("Current limit:", adaptive.getCurrentLimit());