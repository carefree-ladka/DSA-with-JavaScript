// Event Emitter - Implement event emitter class
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    
    return {
      unsubscribe: () => {
        const index = this.events[eventName].indexOf(callback);
        if (index > -1) {
          this.events[eventName].splice(index, 1);
        }
      }
    };
  }
  
  emit(eventName, args = []) {
    if (!this.events[eventName]) return [];
    return this.events[eventName].map(callback => callback(...args));
  }
}

// Test Cases
const emitter = new EventEmitter();
const sub = emitter.subscribe("firstEvent", (x) => x + 1);
console.log(emitter.emit("firstEvent", [5])); // [6]
sub.unsubscribe();
console.log(emitter.emit("firstEvent", [5])); // []