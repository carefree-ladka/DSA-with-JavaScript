class TableFilter {
    constructor() {
        this.table = document.getElementById('dataTable');
        this.tbody = this.table.querySelector('tbody');
        this.searchInput = document.getElementById('searchInput');
        this.departmentFilter = document.getElementById('departmentFilter');
        this.statusFilter = document.getElementById('statusFilter');
        this.resultsCount = document.getElementById('resultsCount');
        
        this.data = [];
        this.filteredData = [];
        
        this.init();
    }
    
    init() {
        this.generateData();
        this.populateFilters();
        this.render();
        this.bindEvents();
    }
    
    bindEvents() {
        this.searchInput.addEventListener('input', this.debounce(this.applyFilters.bind(this), 300));
        this.departmentFilter.addEventListener('change', this.applyFilters.bind(this));
        this.statusFilter.addEventListener('change', this.applyFilters.bind(this));
        
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });
    }
    
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    generateData() {
        const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson', 'Frank Miller', 'Grace Lee', 'Henry Davis'];
        const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
        const statuses = ['Active', 'Inactive'];
        
        this.data = Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            name: names[Math.floor(Math.random() * names.length)],
            email: `user${i + 1}@company.com`,
            department: departments[Math.floor(Math.random() * departments.length)],
            salary: Math.floor(Math.random() * 100000) + 40000,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
        }));
        
        this.filteredData = [...this.data];
    }
    
    populateFilters() {
        const departments = [...new Set(this.data.map(item => item.department))];
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            this.departmentFilter.appendChild(option);
        });
    }
    
    applyFilters() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const departmentFilter = this.departmentFilter.value;
        const statusFilter = this.statusFilter.value;
        
        this.filteredData = this.data.filter(item => {
            const matchesSearch = !searchTerm || 
                Object.values(item).some(value => 
                    value.toString().toLowerCase().includes(searchTerm)
                );
            
            const matchesDepartment = !departmentFilter || item.department === departmentFilter;
            const matchesStatus = !statusFilter || item.status === statusFilter;
            
            return matchesSearch && matchesDepartment && matchesStatus;
        });
        
        this.render();
    }
    
    highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    render() {
        const searchTerm = this.searchInput.value.toLowerCase();
        
        this.tbody.innerHTML = '';
        
        this.filteredData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${this.highlightText(row.name, searchTerm)}</td>
                <td>${this.highlightText(row.email, searchTerm)}</td>
                <td>${this.highlightText(row.department, searchTerm)}</td>
                <td>$${row.salary.toLocaleString()}</td>
                <td><span class="status ${row.status.toLowerCase()}">${row.status}</span></td>
                <td>${row.joinDate}</td>
            `;
            this.tbody.appendChild(tr);
        });
        
        this.updateResultsCount();
    }
    
    updateResultsCount() {
        const count = this.filteredData.length;
        this.resultsCount.textContent = `${count} result${count !== 1 ? 's' : ''}`;
    }
    
    clearFilters() {
        this.searchInput.value = '';
        this.departmentFilter.value = '';
        this.statusFilter.value = '';
        this.applyFilters();
    }
}

new TableFilter();