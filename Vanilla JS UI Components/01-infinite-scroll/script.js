class InfiniteScroll {
    constructor() {
        this.content = document.getElementById('content');
        this.loading = document.getElementById('loading');
        this.sentinel = document.getElementById('sentinel');
        this.page = 1;
        this.isLoading = false;
        this.hasMore = true;
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoading && this.hasMore) {
                    this.loadData();
                }
            });
        }, options);
        
        this.observer.observe(this.sentinel);
    }
    
    async loadData() {
        if (this.isLoading || !this.hasMore) return;
        
        this.isLoading = true;
        this.loading.classList.remove('hidden');
        
        try {
            const data = await this.fetchData(this.page);
            this.renderItems(data.items);
            this.page++;
            this.hasMore = data.hasMore;
            
            if (!this.hasMore) {
                this.observer.unobserve(this.sentinel);
            }
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            this.isLoading = false;
            this.loading.classList.add('hidden');
        }
    }
    
    async fetchData(page) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const items = Array.from({ length: 10 }, (_, i) => ({
            id: (page - 1) * 10 + i + 1,
            title: `Item ${(page - 1) * 10 + i + 1}`,
            description: `This is the description for item ${(page - 1) * 10 + i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
        }));
        
        return {
            items,
            hasMore: page < 20 // Simulate 200 total items
        };
    }
    
    renderItems(items) {
        const fragment = document.createDocumentFragment();
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            fragment.appendChild(itemElement);
        });
        
        this.content.appendChild(fragment);
    }
}

// Alternative: Scroll-based implementation with throttle
class ScrollBasedInfiniteScroll {
    constructor() {
        this.content = document.getElementById('content');
        this.loading = document.getElementById('loading');
        this.page = 1;
        this.isLoading = false;
        this.hasMore = true;
        
        this.init();
    }
    
    init() {
        this.loadData();
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100));
    }
    
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    handleScroll() {
        if (this.isLoading || !this.hasMore) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            this.loadData();
        }
    }
    
    async loadData() {
        // Same implementation as IntersectionObserver version
        if (this.isLoading || !this.hasMore) return;
        
        this.isLoading = true;
        this.loading.classList.remove('hidden');
        
        try {
            const data = await this.fetchData(this.page);
            this.renderItems(data.items);
            this.page++;
            this.hasMore = data.hasMore;
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            this.isLoading = false;
            this.loading.classList.add('hidden');
        }
    }
    
    async fetchData(page) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const items = Array.from({ length: 10 }, (_, i) => ({
            id: (page - 1) * 10 + i + 1,
            title: `Item ${(page - 1) * 10 + i + 1}`,
            description: `Description for item ${(page - 1) * 10 + i + 1}`
        }));
        
        return { items, hasMore: page < 20 };
    }
    
    renderItems(items) {
        const fragment = document.createDocumentFragment();
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            fragment.appendChild(itemElement);
        });
        
        this.content.appendChild(fragment);
    }
}

// Initialize with Intersection Observer (preferred)
new InfiniteScroll();

// Uncomment to use scroll-based version instead:
// new ScrollBasedInfiniteScroll();