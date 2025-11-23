class Tabs {
    constructor(container) {
        this.container = container;
        this.tabs = container.querySelectorAll('.tab');
        this.panels = container.querySelectorAll('.tab-panel');
        this.activeIndex = 0;
        
        this.init();
    }
    
    init() {
        this.setupAccessibility();
        this.bindEvents();
        this.setActiveTab(0);
    }
    
    setupAccessibility() {
        this.tabs.forEach((tab, index) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });
        
        this.panels.forEach(panel => {
            panel.setAttribute('role', 'tabpanel');
        });
    }
    
    bindEvents() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.setActiveTab(index);
            });
            
            tab.addEventListener('keydown', (e) => {
                this.handleKeydown(e, index);
            });
        });
    }
    
    handleKeydown(e, currentIndex) {
        let newIndex = currentIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                break;
                
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
                
            case 'End':
                e.preventDefault();
                newIndex = this.tabs.length - 1;
                break;
                
            default:
                return;
        }
        
        this.setActiveTab(newIndex);
        this.tabs[newIndex].focus();
    }
    
    setActiveTab(index) {
        // Remove active state from all tabs and panels
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        
        this.panels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Set active state
        this.tabs[index].classList.add('active');
        this.tabs[index].setAttribute('aria-selected', 'true');
        this.tabs[index].setAttribute('tabindex', '0');
        
        const tabId = this.tabs[index].dataset.tab;
        const panel = this.container.querySelector(`[data-panel="${tabId}"]`);
        if (panel) {
            panel.classList.add('active');
        }
        
        this.activeIndex = index;
        
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('tabchange', {
            detail: { index, tabId, tab: this.tabs[index], panel }
        }));
    }
    
    getActiveTab() {
        return {
            index: this.activeIndex,
            tab: this.tabs[this.activeIndex],
            panel: this.panels[this.activeIndex]
        };
    }
    
    addTab(tabConfig) {
        const { id, label, content } = tabConfig;
        
        // Create tab button
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.setAttribute('role', 'tab');
        tab.setAttribute('data-tab', id);
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
        tab.textContent = label;
        
        // Create panel
        const panel = document.createElement('div');
        panel.className = 'tab-panel';
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('data-panel', id);
        panel.innerHTML = content;
        
        // Add to DOM
        this.container.querySelector('.tabs').appendChild(tab);
        this.container.querySelector('.tab-content').appendChild(panel);
        
        // Update arrays
        this.tabs = this.container.querySelectorAll('.tab');
        this.panels = this.container.querySelectorAll('.tab-panel');
        
        // Bind events for new tab
        const newIndex = this.tabs.length - 1;
        tab.addEventListener('click', () => this.setActiveTab(newIndex));
        tab.addEventListener('keydown', (e) => this.handleKeydown(e, newIndex));
        
        return { tab, panel };
    }
    
    removeTab(index) {
        if (this.tabs.length <= 1) return; // Don't remove last tab
        
        const tab = this.tabs[index];
        const panel = this.panels[index];
        
        tab.remove();
        panel.remove();
        
        // Update arrays
        this.tabs = this.container.querySelectorAll('.tab');
        this.panels = this.container.querySelectorAll('.tab-panel');
        
        // Adjust active index if necessary
        if (index === this.activeIndex) {
            const newIndex = Math.min(index, this.tabs.length - 1);
            this.setActiveTab(newIndex);
        } else if (index < this.activeIndex) {
            this.activeIndex--;
        }
    }
}

// Enhanced tabs with lazy loading
class LazyTabs extends Tabs {
    constructor(container) {
        super(container);
        this.loadedPanels = new Set();
    }
    
    setActiveTab(index) {
        super.setActiveTab(index);
        
        // Lazy load panel content
        if (!this.loadedPanels.has(index)) {
            this.loadPanelContent(index);
            this.loadedPanels.add(index);
        }
    }
    
    async loadPanelContent(index) {
        const panel = this.panels[index];
        const tabId = this.tabs[index].dataset.tab;
        
        // Show loading state
        const originalContent = panel.innerHTML;
        panel.innerHTML = '<div style="text-align: center; padding: 40px;">Loading...</div>';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Restore content (in real app, this would be loaded content)
            panel.innerHTML = originalContent;
        } catch (error) {
            panel.innerHTML = '<div style="text-align: center; padding: 40px; color: #ef4444;">Error loading content</div>';
        }
    }
}

// Initialize tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs-container');
    const tabs = new Tabs(tabsContainer);
    
    // Listen for tab changes
    tabsContainer.addEventListener('tabchange', (e) => {
        console.log('Tab changed:', e.detail);
    });
    
    // Demo: Add dynamic tab after 3 seconds
    setTimeout(() => {
        tabs.addTab({
            id: 'dynamic',
            label: '🆕 Dynamic',
            content: `
                <h2>Dynamic Tab</h2>
                <p>This tab was added dynamically after page load.</p>
                <button onclick="alert('Dynamic content works!')">Test Button</button>
            `
        });
    }, 3000);
});