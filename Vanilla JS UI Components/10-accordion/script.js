class Accordion {
    constructor(element, options = {}) {
        this.accordion = element;
        this.items = element.querySelectorAll('.accordion-item');
        this.triggers = element.querySelectorAll('.accordion-trigger');
        
        this.options = {
            allowMultiple: options.allowMultiple || false,
            animationDuration: options.animationDuration || 400,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupAccessibility();
    }
    
    bindEvents() {
        this.triggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => {
                this.toggle(index);
            });
            
            trigger.addEventListener('keydown', (e) => {
                this.handleKeydown(e, index);
            });
        });
    }
    
    setupAccessibility() {
        this.triggers.forEach((trigger, index) => {
            const content = this.items[index].querySelector('.accordion-content');
            const id = `accordion-content-${index}`;
            
            trigger.setAttribute('aria-controls', id);
            content.setAttribute('id', id);
            content.setAttribute('role', 'region');
        });
    }
    
    handleKeydown(e, index) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.focusNext(index);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.focusPrevious(index);
                break;
                
            case 'Home':
                e.preventDefault();
                this.triggers[0].focus();
                break;
                
            case 'End':
                e.preventDefault();
                this.triggers[this.triggers.length - 1].focus();
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.toggle(index);
                break;
        }
    }
    
    focusNext(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.triggers.length;
        this.triggers[nextIndex].focus();
    }
    
    focusPrevious(currentIndex) {
        const prevIndex = currentIndex === 0 ? this.triggers.length - 1 : currentIndex - 1;
        this.triggers[prevIndex].focus();
    }
    
    toggle(index) {
        const item = this.items[index];
        const trigger = this.triggers[index];
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('open');
        
        if (!this.options.allowMultiple && !isOpen) {
            this.closeAll();
        }
        
        if (isOpen) {
            this.close(index);
        } else {
            this.open(index);
        }
    }
    
    open(index) {
        const item = this.items[index];
        const trigger = this.triggers[index];
        const content = item.querySelector('.accordion-content');
        
        // Set max-height to actual content height for smooth animation
        const body = content.querySelector('.accordion-body');
        const height = body.scrollHeight;
        
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = height + 'px';
        
        // Trigger custom event
        this.accordion.dispatchEvent(new CustomEvent('accordionopen', {
            detail: { index, item, trigger, content }
        }));
        
        // Reset max-height after animation to allow dynamic content
        setTimeout(() => {
            if (item.classList.contains('open')) {
                content.style.maxHeight = 'none';
            }
        }, this.options.animationDuration);
    }
    
    close(index) {
        const item = this.items[index];
        const trigger = this.triggers[index];
        const content = item.querySelector('.accordion-content');
        
        // Set specific height first, then animate to 0
        const body = content.querySelector('.accordion-body');
        content.style.maxHeight = body.scrollHeight + 'px';
        
        // Force reflow
        content.offsetHeight;
        
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
        
        // Trigger custom event
        this.accordion.dispatchEvent(new CustomEvent('accordionclose', {
            detail: { index, item, trigger, content }
        }));
    }
    
    openAll() {
        this.items.forEach((_, index) => {
            if (!this.items[index].classList.contains('open')) {
                this.open(index);
            }
        });
    }
    
    closeAll() {
        this.items.forEach((_, index) => {
            if (this.items[index].classList.contains('open')) {
                this.close(index);
            }
        });
    }
    
    setMultipleMode(allow) {
        this.options.allowMultiple = allow;
        
        if (allow) {
            this.accordion.classList.add('multiple');
        } else {
            this.accordion.classList.remove('multiple');
            // Close all but first open item
            let firstOpenFound = false;
            this.items.forEach((item, index) => {
                if (item.classList.contains('open')) {
                    if (firstOpenFound) {
                        this.close(index);
                    } else {
                        firstOpenFound = true;
                    }
                }
            });
        }
    }
    
    getOpenItems() {
        return Array.from(this.items)
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.classList.contains('open'));
    }
}

// Enhanced accordion with lazy loading
class LazyAccordion extends Accordion {
    constructor(element, options = {}) {
        super(element, options);
        this.loadedItems = new Set();
    }
    
    open(index) {
        // Load content if not already loaded
        if (!this.loadedItems.has(index)) {
            this.loadContent(index);
            this.loadedItems.add(index);
        }
        
        super.open(index);
    }
    
    async loadContent(index) {
        const item = this.items[index];
        const body = item.querySelector('.accordion-body');
        
        // Show loading state
        const originalContent = body.innerHTML;
        body.innerHTML = '<div style="text-align: center; padding: 20px;">Loading...</div>';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Restore content (in real app, this would be loaded content)
            body.innerHTML = originalContent;
        } catch (error) {
            body.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">Error loading content</div>';
        }
    }
}

// Initialize accordion
document.addEventListener('DOMContentLoaded', () => {
    const accordionElement = document.getElementById('accordion');
    const accordion = new Accordion(accordionElement, {
        allowMultiple: false,
        animationDuration: 400
    });
    
    // Controls
    document.getElementById('openAll').addEventListener('click', () => {
        accordion.openAll();
    });
    
    document.getElementById('closeAll').addEventListener('click', () => {
        accordion.closeAll();
    });
    
    let isMultipleMode = false;
    document.getElementById('toggleMode').addEventListener('click', (e) => {
        isMultipleMode = !isMultipleMode;
        accordion.setMultipleMode(isMultipleMode);
        e.target.textContent = `Toggle Mode: ${isMultipleMode ? 'Multiple' : 'Single'}`;
    });
    
    // Listen for accordion events
    accordionElement.addEventListener('accordionopen', (e) => {
        console.log('Accordion opened:', e.detail.index);
    });
    
    accordionElement.addEventListener('accordionclose', (e) => {
        console.log('Accordion closed:', e.detail.index);
    });
});