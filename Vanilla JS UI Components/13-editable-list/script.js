class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.todoList = document.getElementById('todoList');
        this.newTodoInput = document.getElementById('newTodoInput');
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.remainingCount = document.getElementById('remainingCount');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }
    
    bindEvents() {
        // Add new todo
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        this.newTodoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Actions
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('toggleAll').addEventListener('click', () => this.toggleAll());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'a':
                        e.preventDefault();
                        this.toggleAll();
                        break;
                    case 'Backspace':
                        e.preventDefault();
                        this.clearCompleted();
                        break;
                }
            }
        });
    }
    
    addTodo() {
        const text = this.newTodoInput.value.trim();
        if (!text) return;
        
        const todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.newTodoInput.value = '';
        this.save();
        this.render();
        this.updateStats();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
            this.render();
            this.updateStats();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
        this.updateStats();
    }
    
    editTodo(id) {
        this.editingId = id;
        this.render();
        
        const input = document.querySelector(`[data-id="${id}"] .todo-text`);
        if (input) {
            input.focus();
            input.select();
        }
    }
    
    saveEdit(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            this.save();
        }
        this.editingId = null;
        this.render();
    }
    
    cancelEdit() {
        this.editingId = null;
        this.render();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }
    
    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.save();
        this.render();
        this.updateStats();
    }
    
    toggleAll() {
        const allCompleted = this.todos.every(t => t.completed);
        this.todos.forEach(t => t.completed = !allCompleted);
        this.save();
        this.render();
        this.updateStats();
    }
    
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }
    
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        this.todoList.innerHTML = '';
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;
            
            const isEditing = this.editingId === todo.id;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                ${isEditing 
                    ? `<input type="text" class="todo-text editing" value="${todo.text}">`
                    : `<span class="todo-text">${todo.text}</span>`
                }
                <div class="todo-actions-item">
                    ${!isEditing 
                        ? `<button class="todo-btn edit-btn">Edit</button>`
                        : `<button class="todo-btn edit-btn">Save</button>`
                    }
                    <button class="todo-btn delete-btn">Delete</button>
                </div>
            `;
            
            // Bind events
            const checkbox = li.querySelector('.todo-checkbox');
            const textElement = li.querySelector('.todo-text');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            if (isEditing) {
                editBtn.addEventListener('click', () => {
                    this.saveEdit(todo.id, textElement.value);
                });
                
                textElement.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.saveEdit(todo.id, textElement.value);
                    } else if (e.key === 'Escape') {
                        this.cancelEdit();
                    }
                });
                
                textElement.addEventListener('blur', () => {
                    this.saveEdit(todo.id, textElement.value);
                });
            } else {
                editBtn.addEventListener('click', () => this.editTodo(todo.id));
                textElement.addEventListener('dblclick', () => this.editTodo(todo.id));
            }
            
            this.todoList.appendChild(li);
        });
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;
        
        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;
        this.remainingCount.textContent = remaining;
    }
    
    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

new TodoApp();