// Event System Polyfills

// addEventListener polyfill for IE8
if (!Element.prototype.addEventListener) {
  Element.prototype.addEventListener = function(event, handler, useCapture) {
    const element = this;
    const wrappedHandler = function(e) {
      e.target = e.srcElement;
      e.currentTarget = element;
      e.preventDefault = function() { e.returnValue = false; };
      e.stopPropagation = function() { e.cancelBubble = true; };
      handler.call(element, e);
    };
    
    element.attachEvent('on' + event, wrappedHandler);
    
    // Store for removeEventListener
    if (!element._eventHandlers) element._eventHandlers = {};
    if (!element._eventHandlers[event]) element._eventHandlers[event] = [];
    element._eventHandlers[event].push({ original: handler, wrapped: wrappedHandler });
  };
}

// removeEventListener polyfill
if (!Element.prototype.removeEventListener) {
  Element.prototype.removeEventListener = function(event, handler, useCapture) {
    if (this._eventHandlers && this._eventHandlers[event]) {
      const handlers = this._eventHandlers[event];
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i].original === handler) {
          this.detachEvent('on' + event, handlers[i].wrapped);
          handlers.splice(i, 1);
          break;
        }
      }
    }
  };
}

// CustomEvent polyfill
if (!window.CustomEvent) {
  window.CustomEvent = function(event, params = {}) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles || false, params.cancelable || false, params.detail || null);
    return evt;
  };
}

// Event polyfill
if (!window.Event) {
  window.Event = function(type, eventInitDict = {}) {
    const event = document.createEvent('Event');
    event.initEvent(type, eventInitDict.bubbles || false, eventInitDict.cancelable || false);
    return event;
  };
}

// EventTarget polyfill
if (!window.EventTarget) {
  window.EventTarget = function() {
    this._listeners = {};
  };
  
  EventTarget.prototype.addEventListener = function(type, listener) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(listener);
  };
  
  EventTarget.prototype.removeEventListener = function(type, listener) {
    if (this._listeners[type]) {
      const index = this._listeners[type].indexOf(listener);
      if (index !== -1) this._listeners[type].splice(index, 1);
    }
  };
  
  EventTarget.prototype.dispatchEvent = function(event) {
    if (this._listeners[event.type]) {
      this._listeners[event.type].forEach(listener => listener.call(this, event));
    }
    return true;
  };
}

// Test Cases
const target = new EventTarget();
target.addEventListener('test', e => console.log('Event fired:', e.detail));
target.dispatchEvent(new CustomEvent('test', { detail: 'Hello World' }));