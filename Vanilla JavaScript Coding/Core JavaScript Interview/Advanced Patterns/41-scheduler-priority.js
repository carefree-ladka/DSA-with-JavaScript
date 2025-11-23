/**
 * Scheduler with Priority - React Fiber-style simplified
 * Time: O(log n) insertion, Space: O(n)
 */

const TaskPriority = {
  IMMEDIATE: 1,
  USER_BLOCKING: 2,
  NORMAL: 3,
  LOW: 4,
  IDLE: 5
};

class PriorityScheduler {
  constructor() {
    this.taskQueue = [];
    this.timerQueue = [];
    this.isHostCallbackScheduled = false;
    this.isHostTimeoutScheduled = false;
    this.currentTime = 0;
  }
  
  scheduleCallback(priorityLevel, callback, options = {}) {
    const currentTime = this.getCurrentTime();
    const { delay = 0 } = options;
    
    const startTime = currentTime + delay;
    const timeout = this.getTimeoutForPriority(priorityLevel);
    const expirationTime = startTime + timeout;
    
    const newTask = {
      id: this.generateId(),
      callback,
      priorityLevel,
      startTime,
      expirationTime,
      sortIndex: delay > 0 ? startTime : expirationTime
    };
    
    if (delay > 0) {
      // Delayed task
      this.timerQueue.push(newTask);
      this.timerQueue.sort((a, b) => a.sortIndex - b.sortIndex);
      
      if (!this.isHostTimeoutScheduled) {
        this.requestHostTimeout(this.handleTimeout.bind(this), delay);
      }
    } else {
      // Immediate task
      this.taskQueue.push(newTask);
      this.taskQueue.sort((a, b) => a.sortIndex - b.sortIndex);
      
      if (!this.isHostCallbackScheduled) {
        this.isHostCallbackScheduled = true;
        this.requestHostCallback(this.flushWork.bind(this));
      }
    }
    
    return newTask;
  }
  
  cancelCallback(task) {
    task.callback = null;
  }
  
  flushWork(hasTimeRemaining, initialTime) {
    this.isHostCallbackScheduled = false;
    
    if (this.isHostTimeoutScheduled) {
      this.isHostTimeoutScheduled = false;
      this.cancelHostTimeout();
    }
    
    this.advanceTimers(initialTime);
    
    try {
      return this.workLoop(hasTimeRemaining, initialTime);
    } finally {
      this.currentTask = null;
      
      if (this.taskQueue.length > 0) {
        this.isHostCallbackScheduled = true;
        this.requestHostCallback(this.flushWork.bind(this));
      } else {
        this.advanceTimers(this.getCurrentTime());
      }
    }
  }
  
  workLoop(hasTimeRemaining, initialTime) {
    let currentTime = initialTime;
    this.advanceTimers(currentTime);
    
    this.currentTask = this.taskQueue[0];
    
    while (this.currentTask !== null) {
      if (this.currentTask.expirationTime > currentTime && 
          (!hasTimeRemaining || this.shouldYieldToHost())) {
        break;
      }
      
      const callback = this.currentTask.callback;
      if (typeof callback === 'function') {
        this.currentTask.callback = null;
        const didUserCallbackTimeout = this.currentTask.expirationTime <= currentTime;
        
        const continuationCallback = callback(didUserCallbackTimeout);
        
        currentTime = this.getCurrentTime();
        
        if (typeof continuationCallback === 'function') {
          this.currentTask.callback = continuationCallback;
        } else {
          if (this.currentTask === this.taskQueue[0]) {
            this.taskQueue.shift();
          }
        }
        
        this.advanceTimers(currentTime);
      } else {
        this.taskQueue.shift();
      }
      
      this.currentTask = this.taskQueue[0];
    }
    
    return this.taskQueue.length > 0;
  }
  
  advanceTimers(currentTime) {
    let timer = this.timerQueue[0];
    
    while (timer !== undefined) {
      if (timer.callback === null) {
        this.timerQueue.shift();
      } else if (timer.startTime <= currentTime) {
        this.timerQueue.shift();
        timer.sortIndex = timer.expirationTime;
        this.taskQueue.push(timer);
        this.taskQueue.sort((a, b) => a.sortIndex - b.sortIndex);
      } else {
        return;
      }
      
      timer = this.timerQueue[0];
    }
  }
  
  handleTimeout(currentTime) {
    this.isHostTimeoutScheduled = false;
    this.advanceTimers(currentTime);
    
    if (!this.isHostCallbackScheduled) {
      if (this.taskQueue.length > 0) {
        this.isHostCallbackScheduled = true;
        this.requestHostCallback(this.flushWork.bind(this));
      } else {
        const firstTimer = this.timerQueue[0];
        if (firstTimer !== undefined) {
          this.requestHostTimeout(
            this.handleTimeout.bind(this),
            firstTimer.startTime - currentTime
          );
        }
      }
    }
  }
  
  getTimeoutForPriority(priorityLevel) {
    switch (priorityLevel) {
      case TaskPriority.IMMEDIATE: return -1;
      case TaskPriority.USER_BLOCKING: return 250;
      case TaskPriority.NORMAL: return 5000;
      case TaskPriority.LOW: return 10000;
      case TaskPriority.IDLE: return 1073741823; // Never expires
      default: return 5000;
    }
  }
  
  getCurrentTime() {
    return performance.now();
  }
  
  shouldYieldToHost() {
    return this.getCurrentTime() - this.startTime >= 5; // 5ms time slice
  }
  
  requestHostCallback(callback) {
    this.scheduledHostCallback = callback;
    this.messageChannel.port2.postMessage(null);
  }
  
  requestHostTimeout(callback, ms) {
    this.taskTimeoutID = setTimeout(() => {
      callback(this.getCurrentTime());
    }, ms);
  }
  
  cancelHostTimeout() {
    clearTimeout(this.taskTimeoutID);
    this.taskTimeoutID = -1;
  }
  
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Initialize message channel for scheduling
const scheduler = new PriorityScheduler();
scheduler.messageChannel = new MessageChannel();
scheduler.messageChannel.port1.onmessage = () => {
  if (scheduler.scheduledHostCallback !== null) {
    const currentTime = scheduler.getCurrentTime();
    scheduler.startTime = currentTime;
    const hasTimeRemaining = true;
    
    try {
      const hasMoreWork = scheduler.scheduledHostCallback(hasTimeRemaining, currentTime);
      if (!hasMoreWork) {
        scheduler.scheduledHostCallback = null;
      }
    } catch (error) {
      scheduler.scheduledHostCallback = null;
      throw error;
    }
  }
};

// Test Cases
console.log('Scheduling tasks with different priorities...');

scheduler.scheduleCallback(TaskPriority.IMMEDIATE, () => {
  console.log('Immediate priority task executed');
});

scheduler.scheduleCallback(TaskPriority.LOW, () => {
  console.log('Low priority task executed');
});

scheduler.scheduleCallback(TaskPriority.USER_BLOCKING, () => {
  console.log('User blocking task executed');
});

scheduler.scheduleCallback(TaskPriority.NORMAL, () => {
  console.log('Normal priority task executed');
}, { delay: 100 });

export { PriorityScheduler, TaskPriority };