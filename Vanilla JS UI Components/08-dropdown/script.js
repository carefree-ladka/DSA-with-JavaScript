class Dropdown {
    constructor(element) {
        this.dropdown = element;
        this.trigger = element.querySelector('.dropdown-trigger');
        this.menu = element.querySelector('.dropdown-menu');
        this.items = element.querySelectorAll('.dropdown-item');
        this.search = element.querySelector('.dropdown-search');
        
        this.isOpen = false;
        this.selectedValues = [];
        this.highlightedIndex = -1;
        this.isMultiSelect = element.classList.contains('multi-select');
        this.isSearchable = element.classList.contains('searchable');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
    }
    
    bindEvents() {
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        this.items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectItem(item, index);
            });
            
            item.addEventListener('mouseenter', () => {
                this.highlightItem(index);
            });
        });
        
        if (this.search) {
            this.search.addEventListener('input', (e) => {
                this.filterItems(e.target.value);
            });
            
            this.search.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        document.addEventListener('click', () => {
            this.close();
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.isOpen) {
                this.handleKeydown(e);
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.dropdown.classList.add('open');
        this.highlightedIndex = -1;
        
        if (this.search) {
            setTimeout(() => this.search.focus(), 0);
        }
        
        this.positionMenu();
    }
    
    close() {
        this.isOpen = false;
        this.dropdown.classList.remove('open');
        this.highlightedIndex = -1;
        this.updateHighlight();
        
        if (this.search) {
            this.search.value = '';
            this.filterItems('');
        }
    }
    
    positionMenu() {
        const rect = this.dropdown.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        if (spaceBelow < 200 && spaceAbove > spaceBelow) {
            this.dropdown.classList.add('dropup');
        } else {
            this.dropdown.classList.remove('dropup');
        }
    }
    
    selectItem(item, index) {
        const value = item.dataset.value;
        const text = item.textContent.trim();
        
        if (this.isMultiSelect) {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                
                if (checkbox.checked) {
                    if (!this.selectedValues.find(v => v.value === value)) {
                        this.selectedValues.push({ value, text });
                    }
                } else {
                    this.selectedValues = this.selectedValues.filter(v => v.value !== value);
                }
            }
        } else {
            this.selectedValues = [{ value, text }];
            this.close();
        }
        
        this.updateDisplay();
        this.updateSelection();
    }
    
    updateDisplay() {
        if (this.isMultiSelect) {
            const countSpan = this.trigger.querySelector('.selected-count');
            if (this.selectedValues.length === 0) {
                countSpan.textContent = 'Select items...';
            } else {
                countSpan.textContent = `${this.selectedValues.length} selected`;
            }
        } else {
            const span = this.trigger.querySelector('span');
            if (this.selectedValues.length > 0) {
                span.textContent = this.selectedValues[0].text;
            }
        }
        
        // Update item selection states
        this.items.forEach(item => {
            const value = item.dataset.value;
            const isSelected = this.selectedValues.some(v => v.value === value);
            item.classList.toggle('selected', isSelected);
        });
    }
    
    updateSelection() {
        const output = document.getElementById('output');
        const dropdownId = this.dropdown.dataset.dropdown;
        
        if (output) {
            const current = output.textContent ? JSON.parse(output.textContent || '{}') : {};
            current[dropdownId] = this.selectedValues;
            output.textContent = JSON.stringify(current, null, 2);
        }
    }
    
    handleKeydown(e) {
        const visibleItems = Array.from(this.items).filter(item => !item.classList.contains('hidden'));
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.highlightedIndex = Math.min(this.highlightedIndex + 1, visibleItems.length - 1);
                this.updateHighlight();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
                this.updateHighlight();
                break;
                
            case 'Enter':
                e.preventDefault();
                if (this.highlightedIndex >= 0) {
                    const item = visibleItems[this.highlightedIndex];
                    const index = Array.from(this.items).indexOf(item);
                    this.selectItem(item, index);
                }
                break;
                
            case 'Escape':
                this.close();
                break;
        }
    }
    
    highlightItem(index) {
        this.highlightedIndex = index;
        this.updateHighlight();
    }
    
    updateHighlight() {
        this.items.forEach((item, index) => {
            item.classList.toggle('highlighted', index === this.highlightedIndex);
        });
    }
    
    filterItems(query) {
        const lowerQuery = query.toLowerCase();
        
        this.items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(lowerQuery);
            item.classList.toggle('hidden', !matches);
        });
        
        this.highlightedIndex = -1;
        this.updateHighlight();
    }
}

// Initialize all dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => new Dropdown(dropdown));
});