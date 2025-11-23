class Pagination {
    constructor() {
        this.content = document.getElementById('content');
        this.pagination = document.getElementById('pagination');
        this.paginationInfo = document.getElementById('paginationInfo');
        this.pageSize = document.getElementById('pageSize');
        this.jumpInput = document.getElementById('jumpInput');
        this.jumpBtn = document.getElementById('jumpBtn');
        
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.totalItems = 1000;
        this.data = this.generateData();
        
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    bindEvents() {
        this.pageSize.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.render();
        });
        
        this.jumpBtn.addEventListener('click', () => {
            const page = parseInt(this.jumpInput.value);
            if (page && page >= 1 && page <= this.getTotalPages()) {
                this.currentPage = page;
                this.render();
                this.jumpInput.value = '';
            }
        });
        
        this.jumpInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.jumpBtn.click();
            }
        });
    }
    
    generateData() {
        return Array.from({ length: this.totalItems }, (_, i) => ({
            id: i + 1,
            title: `Item ${i + 1}`,
            description: `This is the description for item ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
        }));
    }
    
    getTotalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
    
    getCurrentPageData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.data.slice(startIndex, endIndex);
    }
    
    renderContent() {
        const pageData = this.getCurrentPageData();
        
        this.content.innerHTML = '';
        
        pageData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            this.content.appendChild(itemElement);
        });
    }
    
    renderPagination() {
        const totalPages = this.getTotalPages();
        const current = this.currentPage;
        
        this.pagination.innerHTML = '';
        
        // Previous button
        const prevBtn = this.createButton('Previous', current > 1, () => {
            this.currentPage--;
            this.render();
        });
        this.pagination.appendChild(prevBtn);
        
        // Page numbers with ellipsis
        const pages = this.getPageNumbers(current, totalPages);
        
        pages.forEach(page => {
            if (page === '...') {
                const ellipsis = this.createButton('...', false);
                ellipsis.classList.add('ellipsis');
                this.pagination.appendChild(ellipsis);
            } else {
                const pageBtn = this.createButton(page.toString(), true, () => {
                    this.currentPage = page;
                    this.render();
                });
                
                if (page === current) {
                    pageBtn.classList.add('active');
                }
                
                this.pagination.appendChild(pageBtn);
            }
        });
        
        // Next button
        const nextBtn = this.createButton('Next', current < totalPages, () => {
            this.currentPage++;
            this.render();
        });
        this.pagination.appendChild(nextBtn);
    }
    
    getPageNumbers(current, total) {
        const pages = [];
        const delta = 2; // Number of pages to show around current page
        
        if (total <= 7) {
            // Show all pages if total is small
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (current > delta + 2) {
                pages.push('...');
            }
            
            // Show pages around current
            const start = Math.max(2, current - delta);
            const end = Math.min(total - 1, current + delta);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (current < total - delta - 1) {
                pages.push('...');
            }
            
            // Always show last page
            if (total > 1) {
                pages.push(total);
            }
        }
        
        return pages;
    }
    
    createButton(text, enabled, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.disabled = !enabled;
        
        if (onClick && enabled) {
            button.addEventListener('click', onClick);
        }
        
        return button;
    }
    
    renderInfo() {
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
        
        this.paginationInfo.textContent = 
            `Showing ${startItem}-${endItem} of ${this.totalItems} items`;
        
        // Update jump input max
        this.jumpInput.max = this.getTotalPages();
    }
    
    render() {
        this.renderContent();
        this.renderPagination();
        this.renderInfo();
        
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize pagination
new Pagination();