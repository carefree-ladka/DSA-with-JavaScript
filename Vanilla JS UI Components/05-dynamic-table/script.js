class DynamicTable {
    constructor(container) {
        this.container = container;
        this.data = [];
        this.columns = [];
        this.editingRow = null;
    }
    
    render(data, columns) {
        this.data = data;
        this.columns = columns;
        
        const table = document.createElement('table');
        table.className = 'dynamic-table';
        
        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.header;
            headerRow.appendChild(th);
        });
        
        // Add actions column
        const actionsHeader = document.createElement('th');
        actionsHeader.textContent = 'Actions';
        headerRow.appendChild(actionsHeader);
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create body
        const tbody = document.createElement('tbody');
        data.forEach((row, index) => {
            const tr = this.createRow(row, index);
            tbody.appendChild(tr);
        });
        
        table.appendChild(tbody);
        
        this.container.innerHTML = '';
        this.container.appendChild(table);
    }
    
    createRow(rowData, index) {
        const tr = document.createElement('tr');
        tr.dataset.index = index;
        
        this.columns.forEach(col => {
            const td = document.createElement('td');
            
            if (col.editable && this.editingRow === index) {
                const input = document.createElement('input');
                input.className = 'editable';
                input.value = rowData[col.key] || '';
                input.dataset.key = col.key;
                td.appendChild(input);
            } else {
                const value = this.formatValue(rowData[col.key], col);
                td.innerHTML = value;
            }
            
            tr.appendChild(td);
        });
        
        // Actions column
        const actionsTd = document.createElement('td');
        actionsTd.innerHTML = this.createActions(index);
        tr.appendChild(actionsTd);
        
        return tr;
    }
    
    formatValue(value, column) {
        if (column.type === 'currency') {
            return `$${parseFloat(value || 0).toFixed(2)}`;
        }
        if (column.type === 'date') {
            return new Date(value).toLocaleDateString();
        }
        if (column.type === 'boolean') {
            return value ? '✅' : '❌';
        }
        return value || '';
    }
    
    createActions(index) {
        if (this.editingRow === index) {
            return `
                <div class="actions">
                    <button class="action-btn save-btn" onclick="dynamicTable.saveRow(${index})">Save</button>
                    <button class="action-btn cancel-btn" onclick="dynamicTable.cancelEdit()">Cancel</button>
                </div>
            `;
        } else {
            return `
                <div class="actions">
                    <button class="action-btn edit-btn" onclick="dynamicTable.editRow(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="dynamicTable.deleteRow(${index})">Delete</button>
                </div>
            `;
        }
    }
    
    editRow(index) {
        this.editingRow = index;
        this.render(this.data, this.columns);
    }
    
    saveRow(index) {
        const row = this.container.querySelector(`tr[data-index="${index}"]`);
        const inputs = row.querySelectorAll('.editable');
        
        inputs.forEach(input => {
            const key = input.dataset.key;
            this.data[index][key] = input.value;
        });
        
        this.editingRow = null;
        this.render(this.data, this.columns);
    }
    
    cancelEdit() {
        this.editingRow = null;
        this.render(this.data, this.columns);
    }
    
    deleteRow(index) {
        this.data.splice(index, 1);
        this.render(this.data, this.columns);
    }
    
    addRow() {
        const newRow = {};
        this.columns.forEach(col => {
            newRow[col.key] = col.defaultValue || '';
        });
        
        this.data.push(newRow);
        this.editingRow = this.data.length - 1;
        this.render(this.data, this.columns);
    }
}

// Sample data schemas
const schemas = {
    users: {
        columns: [
            { key: 'id', header: 'ID', editable: false },
            { key: 'name', header: 'Name', editable: true, defaultValue: 'New User' },
            { key: 'email', header: 'Email', editable: true, defaultValue: 'user@example.com' },
            { key: 'role', header: 'Role', editable: true, defaultValue: 'User' },
            { key: 'active', header: 'Active', type: 'boolean', editable: true, defaultValue: true }
        ],
        data: [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: true },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', active: false }
        ]
    },
    
    products: {
        columns: [
            { key: 'id', header: 'Product ID', editable: false },
            { key: 'name', header: 'Product Name', editable: true, defaultValue: 'New Product' },
            { key: 'price', header: 'Price', type: 'currency', editable: true, defaultValue: 0 },
            { key: 'category', header: 'Category', editable: true, defaultValue: 'General' },
            { key: 'inStock', header: 'In Stock', type: 'boolean', editable: true, defaultValue: true }
        ],
        data: [
            { id: 101, name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
            { id: 102, name: 'Mouse', price: 29.99, category: 'Electronics', inStock: true },
            { id: 103, name: 'Keyboard', price: 79.99, category: 'Electronics', inStock: false }
        ]
    },
    
    orders: {
        columns: [
            { key: 'id', header: 'Order ID', editable: false },
            { key: 'customer', header: 'Customer', editable: true, defaultValue: 'New Customer' },
            { key: 'total', header: 'Total', type: 'currency', editable: true, defaultValue: 0 },
            { key: 'date', header: 'Order Date', type: 'date', editable: true, defaultValue: new Date().toISOString().split('T')[0] },
            { key: 'status', header: 'Status', editable: true, defaultValue: 'Pending' }
        ],
        data: [
            { id: 1001, customer: 'Alice Brown', total: 1299.97, date: '2024-01-15', status: 'Shipped' },
            { id: 1002, customer: 'Charlie Davis', total: 109.98, date: '2024-01-16', status: 'Processing' },
            { id: 1003, customer: 'Diana Wilson', total: 79.99, date: '2024-01-17', status: 'Delivered' }
        ]
    }
};

// Initialize
const container = document.getElementById('tableContainer');
const dynamicTable = new DynamicTable(container);

// Bind events
document.getElementById('loadUsers').addEventListener('click', () => {
    const schema = schemas.users;
    dynamicTable.render(schema.data, schema.columns);
});

document.getElementById('loadProducts').addEventListener('click', () => {
    const schema = schemas.products;
    dynamicTable.render(schema.data, schema.columns);
});

document.getElementById('loadOrders').addEventListener('click', () => {
    const schema = schemas.orders;
    dynamicTable.render(schema.data, schema.columns);
});

document.getElementById('addRow').addEventListener('click', () => {
    dynamicTable.addRow();
});

// Load users by default
document.getElementById('loadUsers').click();