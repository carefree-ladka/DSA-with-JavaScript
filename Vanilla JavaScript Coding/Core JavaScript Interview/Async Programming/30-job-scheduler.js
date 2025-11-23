/**
 * Job Scheduler - Queue tasks with concurrency control
 * Time: O(1) enqueue, Space: O(n)
 */

class JobScheduler {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  async add(task, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        priority,
        resolve,
        reject
      });
      
      // Sort by priority (higher priority first)
      this.queue.sort((a, b) => b.priority - a.priority);
      
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
    
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // Process next task
    }
  }
  
  clear() {
    this.queue = [];
  }
  
  size() {
    return this.queue.length;
  }
  
  pending() {
    return this.running;
  }
}

// Advanced scheduler with retry and timeout
class AdvancedJobScheduler extends JobScheduler {
  constructor(concurrency = 1, options = {}) {
    super(concurrency);
    this.defaultRetries = options.retries || 0;
    this.defaultTimeout = options.timeout || 0;
  }
  
  async add(task, options = {}) {
    const { priority = 0, retries = this.defaultRetries, timeout = this.defaultTimeout } = options;
    
    const wrappedTask = async () => {
      let lastError;
      
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (timeout > 0) {
            return await this.withTimeout(task, timeout);
          } else {
            return await task();
          }
        } catch (error) {
          lastError = error;
          if (attempt < retries) {
            await this.delay(Math.pow(2, attempt) * 100); // Exponential backoff
          }
        }
      }
      
      throw lastError;
    };
    
    return super.add(wrappedTask, priority);
  }
  
  async withTimeout(task, timeout) {
    return Promise.race([
      task(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Task timeout')), timeout)
      )
    ]);
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Rate-limited scheduler
class RateLimitedScheduler {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
    this.queue = [];
  }
  
  async add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.queue.length === 0) return;
    
    const now = Date.now();
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      const { task, resolve, reject } = this.queue.shift();
      
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      }
      
      // Process next task
      setTimeout(() => this.process(), 0);
    } else {
      // Wait until we can make another request
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (now - oldestRequest);
      setTimeout(() => this.process(), waitTime);
    }
  }
}

// Test Cases
const scheduler = new JobScheduler(2); // Max 2 concurrent tasks

const createTask = (id, duration) => () => {
  console.log(`Task ${id} started`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve(`Result ${id}`);
    }, duration);
  });
};

// Add tasks
scheduler.add(createTask(1, 1000));
scheduler.add(createTask(2, 500));
scheduler.add(createTask(3, 800));

// Advanced scheduler test
const advancedScheduler = new AdvancedJobScheduler(1, { retries: 2, timeout: 1000 });

const flakyTask = () => {
  if (Math.random() < 0.7) {
    throw new Error('Random failure');
  }
  return 'Success!';
};

advancedScheduler.add(flakyTask, { priority: 1 })
  .then(console.log)
  .catch(console.error);

// Rate limited scheduler test
const rateLimiter = new RateLimitedScheduler(3, 1000); // 3 requests per second

for (let i = 0; i < 5; i++) {
  rateLimiter.add(() => {
    console.log(`Rate limited task ${i}`);
    return `Result ${i}`;
  });
}