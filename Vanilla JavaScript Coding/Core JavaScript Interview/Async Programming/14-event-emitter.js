/**
 * EventEmitter - Pub/Sub pattern with on/off/once/emit
 * Time: O(1) average, Space: O(n)
 */

class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push({ listener, once: false });
    return this;
  }
  
  once(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push({ listener, once: true });
    return this;
  }
  
  off(event, listener) {
    if (!this.events.has(event)) return this;
    
    const listeners = this.events.get(event);
    const index = listeners.findIndex(l => l.listener === listener);
    
    if (index !== -1) {
      listeners.splice(index, 1);
    }
    
    if (listeners.length === 0) {
      this.events.delete(event);
    }
    
    return this;
  }
  
  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    
    const listeners = this.events.get(event).slice(); // Copy to avoid mutation issues
    
    for (const { listener, once } of listeners) {
      listener.apply(this, args);
      
      if (once) {
        this.off(event, listener);
      }
    }
    
    return true;
  }
  
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
    return this;
  }
  
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
  
  listeners(event) {
    return this.events.has(event) 
      ? this.events.get(event).map(l => l.listener)
      : [];
  }
  
  eventNames() {
    return Array.from(this.events.keys());
  }
}

// Advanced EventEmitter with namespaces
class NamespacedEventEmitter extends EventEmitter {
  emit(event, ...args) {
    // Emit specific event
    super.emit(event, ...args);
    
    // Emit wildcard events
    const parts = event.split('.');
    for (let i = 1; i <= parts.length; i++) {
      const namespace = parts.slice(0, i).join('.') + '.*';
      super.emit(namespace, event, ...args);
    }
    
    // Emit global wildcard
    super.emit('*', event, ...args);
    
    return true;
  }
}

// Async EventEmitter
class AsyncEventEmitter extends EventEmitter {
  async emitAsync(event, ...args) {
    if (!this.events.has(event)) return false;
    
    const listeners = this.events.get(event).slice();
    const promises = [];
    
    for (const { listener, once } of listeners) {
      promises.push(Promise.resolve(listener.apply(this, args)));
      
      if (once) {
        this.off(event, listener);
      }
    }
    
    await Promise.all(promises);
    return true;
  }
}

// Test Cases
const emitter = new EventEmitter();

const handler1 = (data) => console.log('Handler 1:', data);
const handler2 = (data) => console.log('Handler 2:', data);

emitter.on('test', handler1);
emitter.once('test', handler2);

emitter.emit('test', 'Hello'); // Both handlers execute
emitter.emit('test', 'World'); // Only handler1 executes

// Namespaced emitter test
const nsEmitter = new NamespacedEventEmitter();
nsEmitter.on('user.login', () => console.log('User logged in'));
nsEmitter.on('user.*', (event) => console.log('User event:', event));
nsEmitter.on('*', (event) => console.log('Any event:', event));

nsEmitter.emit('user.login'); // Triggers all three handlers