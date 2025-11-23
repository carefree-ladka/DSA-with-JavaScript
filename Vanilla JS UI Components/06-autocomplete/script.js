class Autocomplete {
    constructor() {
        this.input = document.getElementById('searchInput');
        this.dropdown = document.getElementById('dropdown');
        this.loading = document.getElementById('loading');
        this.selectedList = document.getElementById('selectedList');
        
        this.debounceDelay = 300;
        this.minChars = 2;
        this.maxResults = 10;
        this.highlightedIndex = -1;
        this.results = [];
        this.selected = [];
        this.abortController = null;
        
        this.data = this.generateCountries();
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.input.addEventListener('input', this.debounce(this.handleInput.bind(this), this.debounceDelay));
        this.input.addEventListener('keydown', this.handleKeydown.bind(this));
        this.input.addEventListener('focus', this.handleFocus.bind(this));
        
        document.addEventListener('click', this.handleClickOutside.bind(this));
    }
    
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    async handleInput(e) {
        const query = e.target.value.trim();
        
        if (query.length < this.minChars) {
            this.hideDropdown();
            return;
        }
        
        this.showLoading();
        
        try {
            const results = await this.search(query);
            this.showResults(results, query);
        } catch (error) {
            console.error('Search failed:', error);
            this.hideLoading();
        }
    }
    
    handleKeydown(e) {
        if (!this.isDropdownVisible()) return;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.highlightNext();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.highlightPrevious();
                break;
            case 'Enter':
                e.preventDefault();
                this.selectHighlighted();
                break;
            case 'Escape':
                this.hideDropdown();
                break;
        }
    }
    
    handleFocus() {
        if (this.input.value.length >= this.minChars && this.results.length > 0) {
            this.showDropdown();
        }
    }
    
    handleClickOutside(e) {
        if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
            this.hideDropdown();
        }
    }
    
    async search(query) {
        // Cancel previous request
        if (this.abortController) {
            this.abortController.abort();
        }
        
        this.abortController = new AbortController();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (this.abortController.signal.aborted) {
            throw new Error('Request cancelled');
        }
        
        const filtered = this.data
            .filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase()) &&
                !this.selected.some(selected => selected.id === item.id)
            )
            .slice(0, this.maxResults);
        
        return filtered;
    }
    
    showResults(results, query) {
        this.results = results;
        this.highlightedIndex = -1;
        
        this.hideLoading();
        
        if (results.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.renderResults(results, query);
        this.showDropdown();
    }
    
    renderResults(results, query) {
        this.dropdown.innerHTML = '';
        
        results.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'dropdown-item';
            element.setAttribute('role', 'option');
            element.setAttribute('data-index', index);
            
            const highlightedText = this.highlightMatch(item.name, query);
            element.innerHTML = `
                <div>${highlightedText}</div>
                <small style="color: #64748b;">${item.code}</small>
            `;
            
            element.addEventListener('click', () => this.selectItem(item));
            element.addEventListener('mouseenter', () => this.highlightItem(index));
            
            this.dropdown.appendChild(element);
        });
    }
    
    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="match">$1</span>');
    }
    
    showNoResults() {
        this.dropdown.innerHTML = '<div class="no-results">No results found</div>';
        this.showDropdown();
    }
    
    highlightNext() {
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.results.length - 1);
        this.updateHighlight();
    }
    
    highlightPrevious() {
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        this.updateHighlight();
    }
    
    highlightItem(index) {
        this.highlightedIndex = index;
        this.updateHighlight();
    }
    
    updateHighlight() {
        const items = this.dropdown.querySelectorAll('.dropdown-item');
        
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.highlightedIndex);
        });
        
        // Scroll highlighted item into view
        if (this.highlightedIndex >= 0) {
            const highlightedItem = items[this.highlightedIndex];
            if (highlightedItem) {
                highlightedItem.scrollIntoView({ block: 'nearest' });
            }
        }
    }
    
    selectHighlighted() {
        if (this.highlightedIndex >= 0 && this.results[this.highlightedIndex]) {
            this.selectItem(this.results[this.highlightedIndex]);
        }
    }
    
    selectItem(item) {
        this.selected.push(item);
        this.input.value = '';
        this.hideDropdown();
        this.renderSelected();
    }
    
    removeItem(item) {
        this.selected = this.selected.filter(selected => selected.id !== item.id);
        this.renderSelected();
    }
    
    renderSelected() {
        this.selectedList.innerHTML = '';
        
        this.selected.forEach(item => {
            const element = document.createElement('div');
            element.className = 'selected-item';
            element.innerHTML = `
                <span>${item.name}</span>
                <span class="remove" title="Remove">×</span>
            `;
            
            element.querySelector('.remove').addEventListener('click', () => {
                this.removeItem(item);
            });
            
            this.selectedList.appendChild(element);
        });
    }
    
    showLoading() {
        this.loading.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loading.classList.add('hidden');
    }
    
    showDropdown() {
        this.dropdown.classList.remove('hidden');
        this.input.setAttribute('aria-expanded', 'true');
    }
    
    hideDropdown() {
        this.dropdown.classList.add('hidden');
        this.input.setAttribute('aria-expanded', 'false');
        this.highlightedIndex = -1;
    }
    
    isDropdownVisible() {
        return !this.dropdown.classList.contains('hidden');
    }
    
    generateCountries() {
        return [
            { id: 1, name: 'United States', code: 'US' },
            { id: 2, name: 'Canada', code: 'CA' },
            { id: 3, name: 'United Kingdom', code: 'GB' },
            { id: 4, name: 'Germany', code: 'DE' },
            { id: 5, name: 'France', code: 'FR' },
            { id: 6, name: 'Italy', code: 'IT' },
            { id: 7, name: 'Spain', code: 'ES' },
            { id: 8, name: 'Netherlands', code: 'NL' },
            { id: 9, name: 'Belgium', code: 'BE' },
            { id: 10, name: 'Switzerland', code: 'CH' },
            { id: 11, name: 'Austria', code: 'AT' },
            { id: 12, name: 'Sweden', code: 'SE' },
            { id: 13, name: 'Norway', code: 'NO' },
            { id: 14, name: 'Denmark', code: 'DK' },
            { id: 15, name: 'Finland', code: 'FI' },
            { id: 16, name: 'Poland', code: 'PL' },
            { id: 17, name: 'Czech Republic', code: 'CZ' },
            { id: 18, name: 'Hungary', code: 'HU' },
            { id: 19, name: 'Portugal', code: 'PT' },
            { id: 20, name: 'Greece', code: 'GR' },
            { id: 21, name: 'Australia', code: 'AU' },
            { id: 22, name: 'New Zealand', code: 'NZ' },
            { id: 23, name: 'Japan', code: 'JP' },
            { id: 24, name: 'South Korea', code: 'KR' },
            { id: 25, name: 'Singapore', code: 'SG' },
            { id: 26, name: 'India', code: 'IN' },
            { id: 27, name: 'China', code: 'CN' },
            { id: 28, name: 'Brazil', code: 'BR' },
            { id: 29, name: 'Mexico', code: 'MX' },
            { id: 30, name: 'Argentina', code: 'AR' }
        ];
    }
}

// Initialize autocomplete
new Autocomplete();