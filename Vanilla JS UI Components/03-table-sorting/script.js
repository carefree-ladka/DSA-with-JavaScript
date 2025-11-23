class TableSorter {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector('tbody');
        this.headers = this.table.querySelectorAll('th[data-column]');
        this.sortStatus = document.getElementById('sortStatus');
        
        this.data = [];
        this.sortConfig = [];
        
        this.init();
    }
    
    init() {
        this.generateData();
        this.render();
        this.bindEvents();
    }
    
    bindEvents() {
        this.headers.forEach(header => {
            header.addEventListener('click', (e) => {
                const column = header.dataset.column;
                const type = header.dataset.type;
                
                if (e.shiftKey) {
                    this.addSort(column, type);
                } else {
                    this.setSingleSort(column, type);
                }
                
                this.applySorts();
                this.render();
                this.updateSortIndicators();
            });
        });
        
        document.getElementById('addData').addEventListener('click', () => {
            this.addRandomData();
            this.applySorts();
            this.render();
        });
        
        document.getElementById('clearSort').addEventListener('click', () => {
            this.clearSort();
        });
    }
    
    setSingleSort(column, type) {
        const existing = this.sortConfig.find(s => s.column === column);
        
        if (existing) {
            if (existing.direction === 'asc') {
                existing.direction = 'desc';
            } else {
                this.sortConfig = [];
            }
        } else {
            this.sortConfig = [{ column, type, direction: 'asc' }];
        }
    }
    
    addSort(column, type) {
        const existingIndex = this.sortConfig.findIndex(s => s.column === column);
        
        if (existingIndex >= 0) {
            const existing = this.sortConfig[existingIndex];
            if (existing.direction === 'asc') {
                existing.direction = 'desc';
            } else {
                this.sortConfig.splice(existingIndex, 1);
            }
        } else {
            this.sortConfig.push({ column, type, direction: 'asc' });
        }
    }
    
    applySorts() {
        if (this.sortConfig.length === 0) {
            this.data.sort((a, b) => a.originalIndex - b.originalIndex);
            return;
        }
        
        this.data.sort((a, b) => {
            for (const sort of this.sortConfig) {
                const result = this.compareValues(a[sort.column], b[sort.column], sort.type);
                if (result !== 0) {
                    return sort.direction === 'asc' ? result : -result;
                }
            }
            return a.originalIndex - b.originalIndex; // Stable sort
        });
    }
    
    compareValues(a, b, type) {
        if (a === b) return 0;
        if (a == null) return 1;
        if (b == null) return -1;
        
        switch (type) {
            case 'number':
                return Number(a) - Number(b);
            case 'date':
                return new Date(a) - new Date(b);
            case 'string':
            default:
                return String(a).localeCompare(String(b));
        }
    }
    
    updateSortIndicators() {
        // Update header classes
        this.headers.forEach(header => {
            const column = header.dataset.column;
            const sort = this.sortConfig.find(s => s.column === column);
            
            header.classList.remove('sort-asc', 'sort-desc');
            
            const existingIcon = header.querySelector('.sort-icon');
            const existingOrder = header.querySelector('.sort-order');
            
            if (existingIcon) existingIcon.remove();
            if (existingOrder) existingOrder.remove();
            
            if (sort) {
                header.classList.add(`sort-${sort.direction}`);
                
                const icon = document.createElement('span');
                icon.className = 'sort-icon';
                header.appendChild(icon);
                
                const sortIndex = this.sortConfig.indexOf(sort);
                if (this.sortConfig.length > 1) {
                    const order = document.createElement('span');
                    order.className = 'sort-order';
                    order.textContent = sortIndex + 1;
                    header.appendChild(order);
                }
            } else {
                const icon = document.createElement('span');
                icon.className = 'sort-icon';
                header.appendChild(icon);
            }
        });
        
        // Update sort status
        this.renderSortStatus();
    }
    
    renderSortStatus() {
        this.sortStatus.innerHTML = '';
        
        if (this.sortConfig.length === 0) {
            this.sortStatus.innerHTML = '<span style="color: #64748b;">No sorting applied</span>';
            return;
        }
        
        this.sortConfig.forEach((sort, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'sort-indicator';
            
            const arrow = sort.direction === 'asc' ? '↑' : '↓';
            indicator.innerHTML = `
                <span>${index + 1}. ${sort.column} ${arrow}</span>
                <span class="remove" data-column="${sort.column}">×</span>
            `;
            
            indicator.querySelector('.remove').addEventListener('click', () => {
                this.removeSortColumn(sort.column);
            });
            
            this.sortStatus.appendChild(indicator);
        });
    }
    
    removeSortColumn(column) {
        this.sortConfig = this.sortConfig.filter(s => s.column !== column);
        this.applySorts();
        this.render();
        this.updateSortIndicators();
    }
    
    clearSort() {
        this.sortConfig = [];
        this.applySorts();
        this.render();
        this.updateSortIndicators();
    }
    
    generateData() {
        const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson', 'Frank Miller', 'Grace Lee', 'Henry Davis', 'Ivy Chen', 'Jack Taylor'];
        const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
        
        this.data = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: names[Math.floor(Math.random() * names.length)],
            email: `user${i + 1}@company.com`,
            age: Math.floor(Math.random() * 40) + 25,
            salary: Math.floor(Math.random() * 100000) + 40000,
            department: departments[Math.floor(Math.random() * departments.length)],
            joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            originalIndex: i
        }));
    }
    
    addRandomData() {
        const names = ['New User', 'Test Person', 'Random Name'];
        const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
        
        const newItems = Array.from({ length: 10 }, (_, i) => ({
            id: this.data.length + i + 1,
            name: names[Math.floor(Math.random() * names.length)],
            email: `newuser${this.data.length + i + 1}@company.com`,
            age: Math.floor(Math.random() * 40) + 25,
            salary: Math.floor(Math.random() * 100000) + 40000,
            department: departments[Math.floor(Math.random() * departments.length)],
            joinDate: new Date().toISOString().split('T')[0],
            originalIndex: this.data.length + i
        }));
        
        this.data.push(...newItems);
    }
    
    render() {
        this.tbody.innerHTML = '';
        
        this.data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.age}</td>
                <td>$${row.salary.toLocaleString()}</td>
                <td>${row.department}</td>
                <td>${row.joinDate}</td>
            `;
            this.tbody.appendChild(tr);
        });
    }
}

// Initialize table sorter
new TableSorter('dataTable');