class VirtualizedList {
    constructor(container) {
        this.container = container;
        this.content = container.querySelector('.virtual-list-content');
        this.spacerBefore = container.querySelector('.virtual-list-spacer-before');
        this.spacerAfter = container.querySelector('.virtual-list-spacer-after');
        
        this.itemHeight = 80;
        this.totalItems = 10000;
        this.visibleItems = [];
        this.renderedItems = new Map();
        this.buffer = 5; // Extra items to render for smooth scrolling
        
        this.init();
    }
    
    init() {
        this.generateData();
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        this.container.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Controls
        document.getElementById('itemCount').addEventListener('change', (e) => {
            this.totalItems = parseInt(e.target.value);
            this.generateData();
            this.render();
        });
        
        document.getElementById('itemHeight').addEventListener('change', (e) => {
            this.itemHeight = parseInt(e.target.value);
            this.render();
        });
        
        document.getElementById('scrollToTop').addEventListener('click', () => {
            this.scrollToIndex(0);
        });
        
        document.getElementById('scrollToMiddle').addEventListener('click', () => {
            this.scrollToIndex(Math.floor(this.totalItems / 2));
        });
        
        document.getElementById('scrollToBottom').addEventListener('click', () => {
            this.scrollToIndex(this.totalItems - 1);
        });
    }
    
    generateData() {
        const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
        const companies = ['TechCorp', 'DataSys', 'CloudInc', 'DevCo', 'CodeLab'];
        const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'];
        
        this.data = Array.from({ length: this.totalItems }, (_, i) => ({
            id: i + 1,
            name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
            email: `user${i + 1}@${companies[i % companies.length].toLowerCase()}.com`,
            department: departments[i % departments.length],
            avatar: names[i % names.length][0],
            joinDate: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toLocaleDateString(),
            status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending'
        }));
    }
    
    handleScroll() {
        const startTime = performance.now();
        
        this.render();
        this.updateStats();
        
        const endTime = performance.now();
        document.getElementById('performance').textContent = `${(endTime - startTime).toFixed(2)}ms`;
    }
    
    render() {
        const scrollTop = this.container.scrollTop;
        const containerHeight = this.container.clientHeight;
        
        // Calculate visible range
        const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.buffer);
        const endIndex = Math.min(
            this.totalItems - 1,
            Math.ceil((scrollTop + containerHeight) / this.itemHeight) + this.buffer
        );
        
        // Update spacers
        this.spacerBefore.style.height = `${startIndex * this.itemHeight}px`;
        this.spacerAfter.style.height = `${(this.totalItems - endIndex - 1) * this.itemHeight}px`;
        
        // Get items to render
        const itemsToRender = [];
        for (let i = startIndex; i <= endIndex; i++) {
            itemsToRender.push(i);
        }
        
        // Remove items that are no longer visible
        for (const [index, element] of this.renderedItems) {
            if (!itemsToRender.includes(index)) {
                element.remove();
                this.renderedItems.delete(index);
            }
        }
        
        // Add new items
        itemsToRender.forEach(index => {
            if (!this.renderedItems.has(index)) {
                const element = this.createItemElement(this.data[index], index);
                this.content.appendChild(element);
                this.renderedItems.set(index, element);
            }
        });
        
        // Update positions
        for (const [index, element] of this.renderedItems) {
            const top = (index - startIndex) * this.itemHeight;
            element.style.top = `${top}px`;
            element.style.height = `${this.itemHeight}px`;
        }
        
        this.visibleItems = itemsToRender;
    }
    
    createItemElement(item, index) {
        const element = document.createElement('div');
        element.className = 'virtual-list-item';
        element.innerHTML = `
            <div class="avatar">${item.avatar}</div>
            <div class="content">
                <div class="title">${item.name}</div>
                <div class="subtitle">${item.email} • ${item.department}</div>
            </div>
            <div class="meta">
                <div>#${item.id}</div>
                <div>${item.joinDate}</div>
                <div style="color: ${this.getStatusColor(item.status)}">${item.status}</div>
            </div>
        `;
        
        // Add click handler
        element.addEventListener('click', () => {
            console.log('Clicked item:', item);
        });
        
        return element;
    }
    
    getStatusColor(status) {
        switch (status) {
            case 'Active': return '#10b981';
            case 'Inactive': return '#ef4444';
            case 'Pending': return '#f59e0b';
            default: return '#64748b';
        }
    }
    
    scrollToIndex(index) {
        const scrollTop = index * this.itemHeight;
        this.container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }
    
    updateStats() {
        document.getElementById('renderedCount').textContent = this.renderedItems.size;
        document.getElementById('scrollPos').textContent = Math.round(this.container.scrollTop);
    }
}

// Alternative implementation with Intersection Observer for even better performance
class IntersectionVirtualizedList extends VirtualizedList {
    constructor(container) {
        super(container);
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const index = parseInt(element.dataset.index);
                
                if (!entry.isIntersecting) {
                    // Item is no longer visible, can be recycled
                    this.recycleItem(element, index);
                }
            });
        }, {
            root: this.container,
            rootMargin: '100px'
        });
    }
    
    createItemElement(item, index) {
        const element = super.createItemElement(item, index);
        element.dataset.index = index;
        this.observer.observe(element);
        return element;
    }
    
    recycleItem(element, index) {
        // Implementation for item recycling
        // This would move the element to a pool for reuse
    }
}

// Initialize virtualized list
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('virtualList');
    new VirtualizedList(container);
});