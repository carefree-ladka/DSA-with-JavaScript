class DebouncedSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.clearBtn = document.getElementById('clearBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.sortBy = document.getElementById('sortBy');
        this.searchStats = document.getElementById('searchStats');
        
        this.debounceDelay = 300;
        this.minChars = 2;
        this.currentQuery = '';
        this.abortController = null;
        this.searchStartTime = 0;
        
        this.data = this.generateSampleData();
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), this.debounceDelay));
        this.clearBtn.addEventListener('click', this.clearSearch.bind(this));
        this.categoryFilter.addEventListener('change', this.handleFilterChange.bind(this));
        this.sortBy.addEventListener('change', this.handleFilterChange.bind(this));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.searchInput.focus();
            }
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }
    
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    async handleSearch() {
        const query = this.searchInput.value.trim();
        
        // Update UI state
        this.updateClearButton(query);
        
        if (query.length < this.minChars) {
            this.showPlaceholder();
            return;
        }
        
        // Cancel previous request
        if (this.abortController) {
            this.abortController.abort();
        }
        
        this.currentQuery = query;
        this.showLoading();
        this.searchStartTime = performance.now();
        
        try {
            const results = await this.performSearch(query);
            
            // Only update if this is still the current query
            if (query === this.currentQuery) {
                this.displayResults(results, query);
                this.updateStats(results.length);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Search failed:', error);
                this.showError();
            }
        } finally {
            this.hideLoading();
        }
    }
    
    async performSearch(query) {
        this.abortController = new AbortController();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
        
        if (this.abortController.signal.aborted) {
            throw new Error('Request cancelled');
        }
        
        const category = this.categoryFilter.value;
        const sortBy = this.sortBy.value;
        
        let results = this.data.filter(item => {
            const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                               item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
                               item.description.toLowerCase().includes(query.toLowerCase());
            
            const matchesCategory = !category || item.category === category;
            
            return matchesQuery && matchesCategory;
        });
        
        // Sort results
        results = this.sortResults(results, sortBy, query);
        
        return results;
    }
    
    sortResults(results, sortBy, query) {
        switch (sortBy) {
            case 'name':
                return results.sort((a, b) => a.title.localeCompare(b.title));
            case 'year':
                return results.sort((a, b) => (b.year || 0) - (a.year || 0));
            case 'rating':
                return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'relevance':
            default:
                return results.sort((a, b) => {
                    const aScore = this.calculateRelevanceScore(a, query);
                    const bScore = this.calculateRelevanceScore(b, query);
                    return bScore - aScore;
                });
        }
    }
    
    calculateRelevanceScore(item, query) {
        const lowerQuery = query.toLowerCase();
        let score = 0;
        
        // Exact title match gets highest score
        if (item.title.toLowerCase() === lowerQuery) score += 100;
        
        // Title starts with query
        if (item.title.toLowerCase().startsWith(lowerQuery)) score += 50;
        
        // Title contains query
        if (item.title.toLowerCase().includes(lowerQuery)) score += 25;
        
        // Subtitle contains query
        if (item.subtitle.toLowerCase().includes(lowerQuery)) score += 10;
        
        // Description contains query
        if (item.description.toLowerCase().includes(lowerQuery)) score += 5;
        
        return score;
    }
    
    displayResults(results, query) {
        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }
        
        const resultsHTML = `
            <div class="results-container">
                <div class="results-header">
                    <div class="results-count">${results.length} result${results.length !== 1 ? 's' : ''} found</div>
                </div>
                ${results.map(item => this.renderResultItem(item, query)).join('')}
            </div>
        `;
        
        this.searchResults.innerHTML = resultsHTML;
    }
    
    renderResultItem(item, query) {
        const highlightedTitle = this.highlightText(item.title, query);
        const highlightedSubtitle = this.highlightText(item.subtitle, query);
        
        return `
            <div class="result-item" onclick="console.log('Selected:', ${JSON.stringify(item.title)})">
                <div class="result-avatar">${item.icon}</div>
                <div class="result-content">
                    <div class="result-title">${highlightedTitle}</div>
                    <div class="result-subtitle">${highlightedSubtitle}</div>
                    <div class="result-meta">
                        <span class="result-category">${item.category}</span>
                        ${item.year ? `<span>Year: ${item.year}</span>` : ''}
                        ${item.rating ? `<span>Rating: ${item.rating}/10</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    showPlaceholder() {
        this.searchResults.innerHTML = `
            <div class="search-placeholder">
                <div class="placeholder-icon">🎬</div>
                <h3>Start typing to search</h3>
                <p>Search for movies, actors, directors, and more...</p>
            </div>
        `;
    }
    
    showNoResults(query) {
        this.searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">😔</div>
                <h3>No results found</h3>
                <p>No results found for "${query}". Try different keywords or filters.</p>
            </div>
        `;
    }
    
    showError() {
        this.searchResults.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">⚠️</div>
                <h3>Search Error</h3>
                <p>Something went wrong. Please try again.</p>
            </div>
        `;
    }
    
    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
        document.querySelector('.search-icon').style.display = 'none';
    }
    
    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
        document.querySelector('.search-icon').style.display = 'block';
    }
    
    updateClearButton(query) {
        if (query.length > 0) {
            this.clearBtn.classList.remove('hidden');
            document.querySelector('.search-icon').style.display = 'none';
        } else {
            this.clearBtn.classList.add('hidden');
            document.querySelector('.search-icon').style.display = 'block';
        }
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.currentQuery = '';
        this.updateClearButton('');
        this.showPlaceholder();
        this.searchStats.textContent = '';
        
        if (this.abortController) {
            this.abortController.abort();
        }
    }
    
    handleFilterChange() {
        if (this.currentQuery) {
            this.handleSearch();
        }
    }
    
    updateStats(resultCount) {
        const searchTime = performance.now() - this.searchStartTime;
        this.searchStats.textContent = `Search completed in ${searchTime.toFixed(0)}ms`;
    }
    
    generateSampleData() {
        return [
            { title: 'The Shawshank Redemption', subtitle: 'Drama • 1994', description: 'Two imprisoned men bond over years', category: 'movie', year: 1994, rating: 9.3, icon: '🎬' },
            { title: 'The Godfather', subtitle: 'Crime Drama • 1972', description: 'The aging patriarch of an organized crime dynasty', category: 'movie', year: 1972, rating: 9.2, icon: '🎬' },
            { title: 'Leonardo DiCaprio', subtitle: 'Actor • Born 1974', description: 'American actor and film producer', category: 'actor', year: 1974, rating: 8.5, icon: '👤' },
            { title: 'Christopher Nolan', subtitle: 'Director • Born 1970', description: 'British-American filmmaker', category: 'actor', year: 1970, rating: 9.0, icon: '🎭' },
            { title: 'Inception', subtitle: 'Sci-Fi Thriller • 2010', description: 'A thief who steals corporate secrets', category: 'movie', year: 2010, rating: 8.8, icon: '🎬' },
            { title: 'Action', subtitle: 'Movie Genre', description: 'High-energy films with physical stunts', category: 'genre', icon: '💥' },
            { title: 'Drama', subtitle: 'Movie Genre', description: 'Character-driven narratives', category: 'genre', icon: '🎭' },
            { title: 'Pulp Fiction', subtitle: 'Crime • 1994', description: 'The lives of two mob hitmen', category: 'movie', year: 1994, rating: 8.9, icon: '🎬' },
            { title: 'Morgan Freeman', subtitle: 'Actor • Born 1937', description: 'American actor and narrator', category: 'actor', year: 1937, rating: 8.7, icon: '👤' },
            { title: 'Quentin Tarantino', subtitle: 'Director • Born 1963', description: 'American filmmaker and screenwriter', category: 'actor', year: 1963, rating: 8.6, icon: '🎭' }
        ];
    }
}

new DebouncedSearch();