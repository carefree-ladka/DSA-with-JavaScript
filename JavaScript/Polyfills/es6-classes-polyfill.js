// ES6 Classes Polyfill
function createClass(constructor, methods, staticMethods) {
  // Set up constructor
  function ClassConstructor() {
    if (!(this instanceof ClassConstructor)) {
      throw new TypeError('Class constructor cannot be invoked without new');
    }
    return constructor.apply(this, arguments);
  }
  
  // Copy prototype methods
  if (methods) {
    Object.keys(methods).forEach(key => {
      ClassConstructor.prototype[key] = methods[key];
    });
  }
  
  // Copy static methods
  if (staticMethods) {
    Object.keys(staticMethods).forEach(key => {
      ClassConstructor[key] = staticMethods[key];
    });
  }
  
  return ClassConstructor;
}

// Inheritance helper
function inherits(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  Child.__proto__ = Parent;
}

// Super helper
function createSuper(Parent) {
  return function(child) {
    return {
      call: function(context, ...args) {
        return Parent.apply(context, args);
      },
      get: function(key) {
        return Parent.prototype[key];
      }
    };
  };
}

// Example class transformation
const MyClass = createClass(
  // Constructor
  function MyClass(name) {
    this.name = name;
  },
  // Instance methods
  {
    getName: function() {
      return this.name;
    },
    setName: function(name) {
      this.name = name;
    }
  },
  // Static methods
  {
    create: function(name) {
      return new MyClass(name);
    }
  }
);

// Inheritance example
const MyChildClass = createClass(
  function MyChildClass(name, age) {
    MyClass.call(this, name);
    this.age = age;
  },
  {
    getAge: function() {
      return this.age;
    },
    getInfo: function() {
      return this.getName() + ' is ' + this.age + ' years old';
    }
  }
);

inherits(MyChildClass, MyClass);

// Test Cases
const instance = new MyClass('John');
console.log(instance.getName()); // John

const child = new MyChildClass('Jane', 25);
console.log(child.getInfo()); // Jane is 25 years old

const created = MyClass.create('Bob');
console.log(created.getName()); // Bob