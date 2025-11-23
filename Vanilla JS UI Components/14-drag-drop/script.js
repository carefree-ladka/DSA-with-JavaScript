class DragDrop {
    constructor() {
        this.draggedElement = null;
        this.draggedData = null;
        this.placeholder = null;
        this.touchStartPos = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.createPlaceholder();
    }
    
    bindEvents() {
        // Mouse events
        document.addEventListener('dragstart', this.handleDragStart.bind(this));
        document.addEventListener('dragend', this.handleDragEnd.bind(this));
        document.addEventListener('dragover', this.handleDragOver.bind(this));
        document.addEventListener('drop', this.handleDrop.bind(this));
        
        // Touch events for mobile
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Controls
        document.getElementById('addItem').addEventListener('click', this.addItem.bind(this));
        document.getElementById('resetOrder').addEventListener('click', this.resetOrder.bind(this));
        document.getElementById('getOrder').addEventListener('click', this.getOrder.bind(this));
    }
    
    createPlaceholder() {
        this.placeholder = document.createElement('div');
        this.placeholder.className = 'drop-placeholder';
    }
    
    handleDragStart(e) {
        this.draggedElement = e.target.closest('.draggable-item, .kanban-item');
        if (!this.draggedElement) return;
        
        this.draggedElement.classList.add('dragging');
        
        this.draggedData = {
            id: this.draggedElement.dataset.id,
            content: this.draggedElement.innerHTML,
            source: this.draggedElement.parentElement
        };
        
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.draggedElement.outerHTML);
        
        // Create ghost image
        const ghost = this.draggedElement.cloneNode(true);
        ghost.classList.add('drag-ghost');
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }
    
    handleDragEnd(e) {
        if (this.draggedElement) {
            this.draggedElement.classList.remove('dragging');
            this.draggedElement = null;
            this.draggedData = null;
        }
        
        // Remove all drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
        
        // Remove placeholder
        if (this.placeholder.parentElement) {
            this.placeholder.parentElement.removeChild(this.placeholder);
        }
    }
    
    handleDragOver(e) {
        e.preventDefault();
        
        const target = e.target.closest('.sortable-list, .kanban-items, .kanban-column');
        if (!target || !this.draggedElement) return;
        
        if (target.classList.contains('sortable-list')) {
            this.handleSortableListDragOver(e, target);
        } else if (target.classList.contains('kanban-items') || target.classList.contains('kanban-column')) {
            this.handleKanbanDragOver(e, target);
        }
    }
    
    handleSortableListDragOver(e, list) {
        const afterElement = this.getDragAfterElement(list, e.clientY);
        
        if (afterElement == null) {
            list.appendChild(this.placeholder);
        } else {
            list.insertBefore(this.placeholder, afterElement);
        }
        
        this.placeholder.classList.add('active');
    }
    
    handleKanbanDragOver(e, target) {
        const column = target.closest('.kanban-column');
        const items = column.querySelector('.kanban-items');
        
        column.classList.add('drag-over');
        
        const afterElement = this.getDragAfterElement(items, e.clientY);
        
        if (afterElement == null) {
            items.appendChild(this.placeholder);
        } else {
            items.insertBefore(this.placeholder, afterElement);
        }
        
        this.placeholder.classList.add('active');
    }
    
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging), .kanban-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    handleDrop(e) {
        e.preventDefault();
        
        if (!this.draggedElement || !this.placeholder.parentElement) return;
        
        // Insert dragged element at placeholder position
        this.placeholder.parentElement.insertBefore(this.draggedElement, this.placeholder);
        
        // Remove placeholder
        this.placeholder.parentElement.removeChild(this.placeholder);
        this.placeholder.classList.remove('active');
        
        // Update data attributes if moving between kanban columns
        const newColumn = this.draggedElement.closest('.kanban-column');
        if (newColumn && this.draggedElement.classList.contains('kanban-item')) {
            const newStatus = newColumn.dataset.status;
            this.draggedElement.dataset.status = newStatus;
        }
        
        this.updateOutput('Item moved successfully');
    }
    
    // Touch support for mobile
    handleTouchStart(e) {
        const target = e.target.closest('.draggable-item, .kanban-item');
        if (!target) return;
        
        this.touchStartPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        
        this.draggedElement = target;
    }
    
    handleTouchMove(e) {
        if (!this.draggedElement || !this.touchStartPos) return;
        
        e.preventDefault();
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.touchStartPos.x;
        const deltaY = touch.clientY - this.touchStartPos.y;
        
        // Start dragging if moved enough
        if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
            this.draggedElement.classList.add('dragging');
            
            // Position element at touch point
            this.draggedElement.style.position = 'fixed';
            this.draggedElement.style.left = touch.clientX - 50 + 'px';
            this.draggedElement.style.top = touch.clientY - 25 + 'px';
            this.draggedElement.style.zIndex = '1000';
            this.draggedElement.style.pointerEvents = 'none';
        }
    }
    
    handleTouchEnd(e) {
        if (!this.draggedElement) return;
        
        // Reset styles
        this.draggedElement.style.position = '';
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.style.pointerEvents = '';
        
        this.draggedElement.classList.remove('dragging');
        
        // Find drop target
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropTarget = elementBelow?.closest('.sortable-list, .kanban-items');
        
        if (dropTarget && this.draggedElement.parentElement !== dropTarget) {
            dropTarget.appendChild(this.draggedElement);
            this.updateOutput('Item moved via touch');
        }
        
        this.draggedElement = null;
        this.touchStartPos = null;
    }
    
    addItem() {
        const list = document.getElementById('sortableList');
        const newId = Date.now();
        
        const newItem = document.createElement('li');
        newItem.className = 'draggable-item';
        newItem.draggable = true;
        newItem.dataset.id = newId;
        newItem.innerHTML = `
            <span class="drag-handle">⋮⋮</span>
            <span class="content">New Task ${newId}</span>
        `;
        
        list.appendChild(newItem);
        this.updateOutput('New item added');
    }
    
    resetOrder() {
        const list = document.getElementById('sortableList');
        const items = [...list.querySelectorAll('.draggable-item')];
        
        items.sort((a, b) => parseInt(a.dataset.id) - parseInt(b.dataset.id));
        
        items.forEach(item => list.appendChild(item));
        this.updateOutput('Order reset to original');
    }
    
    getOrder() {
        const sortableItems = [...document.querySelectorAll('#sortableList .draggable-item')];
        const kanbanItems = [...document.querySelectorAll('.kanban-item')];
        
        const sortableOrder = sortableItems.map(item => ({
            id: item.dataset.id,
            content: item.querySelector('.content').textContent
        }));
        
        const kanbanOrder = {};
        document.querySelectorAll('.kanban-column').forEach(column => {
            const status = column.dataset.status;
            kanbanOrder[status] = [...column.querySelectorAll('.kanban-item')].map(item => ({
                id: item.dataset.id,
                title: item.querySelector('h5').textContent,
                description: item.querySelector('p').textContent
            }));
        });
        
        this.updateOutput(JSON.stringify({ sortable: sortableOrder, kanban: kanbanOrder }, null, 2));
    }
    
    updateOutput(message) {
        const output = document.getElementById('output');
        const timestamp = new Date().toLocaleTimeString();
        output.textContent = `[${timestamp}] ${message}\n` + output.textContent;
    }
}

// Initialize drag and drop
new DragDrop();