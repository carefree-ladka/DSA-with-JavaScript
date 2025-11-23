// CPU Scheduling Algorithms - Classic OS concepts asked in system design

class Process {
  constructor(id, arrivalTime, burstTime, priority = 0) {
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.remainingTime = burstTime;
    this.priority = priority;
    this.completionTime = 0;
    this.turnaroundTime = 0;
    this.waitingTime = 0;
  }
}

// First Come First Serve (FCFS)
const fcfsScheduling = (processes) => {
  const result = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  
  for (let process of result) {
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }
    process.completionTime = currentTime + process.burstTime;
    process.turnaroundTime = process.completionTime - process.arrivalTime;
    process.waitingTime = process.turnaroundTime - process.burstTime;
    currentTime = process.completionTime;
  }
  
  return result;
};

// Shortest Job First (SJF) - Non-preemptive
const sjfScheduling = (processes) => {
  const result = [];
  const remaining = [...processes];
  let currentTime = 0;
  
  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }
    
    available.sort((a, b) => a.burstTime - b.burstTime);
    const selected = available[0];
    
    selected.completionTime = currentTime + selected.burstTime;
    selected.turnaroundTime = selected.completionTime - selected.arrivalTime;
    selected.waitingTime = selected.turnaroundTime - selected.burstTime;
    
    currentTime = selected.completionTime;
    result.push(selected);
    remaining.splice(remaining.indexOf(selected), 1);
  }
  
  return result;
};

// Shortest Remaining Time First (SRTF) - Preemptive SJF
const srtfScheduling = (processes) => {
  const result = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const ganttChart = [];
  let currentTime = 0;
  let completed = 0;
  
  while (completed < processes.length) {
    const available = result.filter(p => 
      p.arrivalTime <= currentTime && p.remainingTime > 0
    );
    
    if (available.length === 0) {
      currentTime++;
      continue;
    }
    
    available.sort((a, b) => a.remainingTime - b.remainingTime);
    const selected = available[0];
    
    ganttChart.push({ process: selected.id, time: currentTime });
    selected.remainingTime--;
    currentTime++;
    
    if (selected.remainingTime === 0) {
      selected.completionTime = currentTime;
      selected.turnaroundTime = selected.completionTime - selected.arrivalTime;
      selected.waitingTime = selected.turnaroundTime - selected.burstTime;
      completed++;
    }
  }
  
  return { processes: result, ganttChart };
};

// Round Robin Scheduling
const roundRobinScheduling = (processes, quantum) => {
  const result = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const queue = [];
  const ganttChart = [];
  let currentTime = 0;
  let completed = 0;
  
  // Add initial processes
  result.filter(p => p.arrivalTime <= currentTime).forEach(p => queue.push(p));
  
  while (completed < processes.length || queue.length > 0) {
    if (queue.length === 0) {
      currentTime++;
      result.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0)
            .forEach(p => queue.push(p));
      continue;
    }
    
    const current = queue.shift();
    const executeTime = Math.min(quantum, current.remainingTime);
    
    ganttChart.push({ process: current.id, time: currentTime, duration: executeTime });
    current.remainingTime -= executeTime;
    currentTime += executeTime;
    
    // Add newly arrived processes
    result.filter(p => 
      p.arrivalTime <= currentTime && 
      p.remainingTime > 0 && 
      !queue.includes(p) && 
      p !== current
    ).forEach(p => queue.push(p));
    
    if (current.remainingTime > 0) {
      queue.push(current);
    } else {
      current.completionTime = currentTime;
      current.turnaroundTime = current.completionTime - current.arrivalTime;
      current.waitingTime = current.turnaroundTime - current.burstTime;
      completed++;
    }
  }
  
  return { processes: result, ganttChart };
};

// Priority Scheduling - Non-preemptive (lower number = higher priority)
const priorityScheduling = (processes) => {
  const result = [];
  const remaining = [...processes];
  let currentTime = 0;
  
  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }
    
    available.sort((a, b) => a.priority - b.priority);
    const selected = available[0];
    
    selected.completionTime = currentTime + selected.burstTime;
    selected.turnaroundTime = selected.completionTime - selected.arrivalTime;
    selected.waitingTime = selected.turnaroundTime - selected.burstTime;
    
    currentTime = selected.completionTime;
    result.push(selected);
    remaining.splice(remaining.indexOf(selected), 1);
  }
  
  return result;
};

// Test Cases
const processes = [
  new Process('P1', 0, 7, 3),
  new Process('P2', 2, 4, 1),
  new Process('P3', 4, 1, 4),
  new Process('P4', 5, 4, 2)
];

console.log("FCFS:", fcfsScheduling(processes));
console.log("SJF:", sjfScheduling(processes));
console.log("Round Robin:", roundRobinScheduling(processes, 2));
console.log("Priority:", priorityScheduling(processes));