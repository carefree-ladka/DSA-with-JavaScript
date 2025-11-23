class Spreadsheet {
    constructor() {
        this.rows = 20;
        this.cols = 10;
        this.data = {};
        this.selectedCell = null;
        this.init();
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
    }

    createGrid() {
        this.createHeaders();
        this.createCells();
    }

    createHeaders() {
        const rowHeaders = document.getElementById('rowHeaders');
        const columnHeaders = document.getElementById('columnHeaders');
        
        rowHeaders.innerHTML = '';
        columnHeaders.innerHTML = '';
        
        for (let i = 1; i <= this.rows; i++) {
            const header = document.createElement('div');
            header.className = 'row-header';
            header.textContent = i;
            rowHeaders.appendChild(header);
        }
        
        for (let i = 0; i < this.cols; i++) {
            const header = document.createElement('div');
            header.className = 'column-header';
            header.textContent = String.fromCharCode(65 + i);
            columnHeaders.appendChild(header);
        }
    }

    createCells() {
        const container = document.getElementById('gridContainer');
        const grid = document.createElement('div');
        grid.className = 'grid';
        grid.style.setProperty('--rows', this.rows);
        grid.style.setProperty('--cols', this.cols);
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.contentEditable = true;
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('focus', () => this.selectCell(row, col));
                cell.addEventListener('input', () => this.updateCell(row, col, cell.textContent));
                cell.addEventListener('keydown', (e) => this.handleKeydown(e, row, col));
                grid.appendChild(cell);
            }
        }
        
        container.innerHTML = '';
        container.appendChild(grid);
    }

    selectCell(row, col) {
        document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('selected');
        this.selectedCell = { row, col };
        
        const cellId = this.getCellId(row, col);
        const value = this.data[cellId] || '';
        document.getElementById('formulaBar').value = value;
    }

    updateCell(row, col, value) {
        const cellId = this.getCellId(row, col);
        this.data[cellId] = value;
        
        if (value.startsWith('=')) {
            this.evaluateFormula(row, col, value);
        }
    }

    evaluateFormula(row, col, formula) {
        try {
            const expression = formula.slice(1).replace(/[A-Z]\d+/g, (match) => {
                const cellValue = this.data[match] || '0';
                return isNaN(cellValue) ? '0' : cellValue;
            });
            
            const result = Function(`"use strict"; return (${expression})`)();
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = result;
        } catch (error) {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = '#ERROR';
        }
    }

    handleKeydown(e, row, col) {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (row > 0) this.focusCell(row - 1, col);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (row < this.rows - 1) this.focusCell(row + 1, col);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (col > 0) this.focusCell(row, col - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (col < this.cols - 1) this.focusCell(row, col + 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (row < this.rows - 1) this.focusCell(row + 1, col);
                break;
        }
    }

    focusCell(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.focus();
    }

    getCellId(row, col) {
        return String.fromCharCode(65 + col) + (row + 1);
    }

    addRow() {
        this.rows++;
        this.createGrid();
    }

    addColumn() {
        this.cols++;
        this.createGrid();
    }

    setupEventListeners() {
        document.getElementById('formulaBar').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.selectedCell) {
                const { row, col } = this.selectedCell;
                const value = e.target.value;
                this.updateCell(row, col, value);
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                cell.textContent = value;
                if (value.startsWith('=')) {
                    this.evaluateFormula(row, col, value);
                }
            }
        });
    }
}

const spreadsheet = new Spreadsheet();