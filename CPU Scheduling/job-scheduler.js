// Job Scheduler - System design interview favorite (Amazon, Google)
// Implement a job scheduler with dependencies and priorities

class Job {
  constructor(id, duration, dependencies = [], priority = 0) {
    this.id = id;
    this.duration = duration;
    this.dependencies = dependencies;
    this.priority = priority;
    this.status = 'pending'; // pending, running, completed
    this.startTime = null;
    this.endTime = null;
  }
}

class JobScheduler {
  constructor(maxConcurrency = 2) {
    this.jobs = new Map();
    this.maxConcurrency = maxConcurrency;
    this.runningJobs = new Set();
    this.completedJobs = new Set();
    this.currentTime = 0;
    this.schedule = [];
  }
  
  addJob(job) {
    this.jobs.set(job.id, job);
  }
  
  // Check if job dependencies are satisfied
  canSchedule(job) {
    return job.dependencies.every(depId => this.completedJobs.has(depId));
  }
  
  // Get ready jobs (dependencies satisfied, not running/completed)
  getReadyJobs() {
    const ready = [];
    for (let job of this.jobs.values()) {
      if (job.status === 'pending' && this.canSchedule(job)) {
        ready.push(job);
      }
    }
    // Sort by priority (higher first), then by duration (shorter first)
    return ready.sort((a, b) => b.priority - a.priority || a.duration - b.duration);
  }
  
  // Schedule jobs using topological sort + priority
  scheduleJobs() {
    while (this.completedJobs.size < this.jobs.size) {
      // Complete running jobs that finished
      for (let jobId of this.runningJobs) {
        const job = this.jobs.get(jobId);
        if (this.currentTime >= job.endTime) {
          job.status = 'completed';
          this.runningJobs.delete(jobId);
          this.completedJobs.add(jobId);
          this.schedule.push({
            time: this.currentTime,
            event: 'completed',
            job: jobId
          });
        }
      }
      
      // Start new jobs if capacity available
      const readyJobs = this.getReadyJobs();
      while (this.runningJobs.size < this.maxConcurrency && readyJobs.length > 0) {
        const job = readyJobs.shift();
        job.status = 'running';
        job.startTime = this.currentTime;
        job.endTime = this.currentTime + job.duration;
        this.runningJobs.add(job.id);
        this.schedule.push({
          time: this.currentTime,
          event: 'started',
          job: job.id
        });
      }
      
      // Advance time to next event
      if (this.runningJobs.size > 0) {
        const nextEndTime = Math.min(...Array.from(this.runningJobs)
          .map(id => this.jobs.get(id).endTime));
        this.currentTime = nextEndTime;
      } else if (this.completedJobs.size < this.jobs.size) {
        // Deadlock detection - no jobs can run
        const pendingJobs = Array.from(this.jobs.values())
          .filter(job => job.status === 'pending');
        throw new Error(`Deadlock detected. Pending jobs: ${pendingJobs.map(j => j.id)}`);
      }
    }
    
    return {
      totalTime: this.currentTime,
      schedule: this.schedule,
      jobs: Array.from(this.jobs.values())
    };
  }
}

// Cron Job Scheduler
class CronScheduler {
  constructor() {
    this.jobs = new Map();
    this.currentTime = 0;
  }
  
  // Add recurring job with cron-like interval
  addCronJob(id, duration, interval, startTime = 0) {
    this.jobs.set(id, {
      id,
      duration,
      interval,
      nextRun: startTime,
      executions: []
    });
  }
  
  // Simulate cron execution for given time period
  simulate(endTime) {
    const events = [];
    
    while (this.currentTime < endTime) {
      // Find next job to execute
      let nextJob = null;
      let nextTime = endTime;
      
      for (let job of this.jobs.values()) {
        if (job.nextRun < nextTime) {
          nextTime = job.nextRun;
          nextJob = job;
        }
      }
      
      if (nextJob && nextTime < endTime) {
        this.currentTime = nextTime;
        
        // Execute job
        const execution = {
          startTime: this.currentTime,
          endTime: this.currentTime + nextJob.duration
        };
        
        nextJob.executions.push(execution);
        events.push({
          time: this.currentTime,
          job: nextJob.id,
          event: 'started'
        });
        
        events.push({
          time: execution.endTime,
          job: nextJob.id,
          event: 'completed'
        });
        
        // Schedule next execution
        nextJob.nextRun = this.currentTime + nextJob.interval;
      } else {
        break;
      }
    }
    
    return events;
  }
}

// Batch Job Processor
const processBatchJobs = (jobs, batchSize) => {
  const batches = [];
  const sortedJobs = [...jobs].sort((a, b) => b.priority - a.priority);
  
  for (let i = 0; i < sortedJobs.length; i += batchSize) {
    batches.push(sortedJobs.slice(i, i + batchSize));
  }
  
  let currentTime = 0;
  const results = [];
  
  for (let batch of batches) {
    const batchDuration = Math.max(...batch.map(job => job.duration));
    
    results.push({
      batchId: results.length,
      jobs: batch.map(job => job.id),
      startTime: currentTime,
      endTime: currentTime + batchDuration,
      duration: batchDuration
    });
    
    currentTime += batchDuration;
  }
  
  return results;
};

// Test Cases
const scheduler = new JobScheduler(2);

scheduler.addJob(new Job('A', 3, [], 1));
scheduler.addJob(new Job('B', 2, ['A'], 2));
scheduler.addJob(new Job('C', 1, ['A'], 1));
scheduler.addJob(new Job('D', 4, ['B', 'C'], 3));

console.log("Job scheduling result:", scheduler.scheduleJobs());

const cronScheduler = new CronScheduler();
cronScheduler.addCronJob('backup', 2, 10, 0);
cronScheduler.addCronJob('cleanup', 1, 15, 5);

console.log("Cron simulation:", cronScheduler.simulate(30));

const batchJobs = [
  new Job('J1', 5, [], 3),
  new Job('J2', 3, [], 1),
  new Job('J3', 7, [], 2),
  new Job('J4', 2, [], 3)
];

console.log("Batch processing:", processBatchJobs(batchJobs, 2));