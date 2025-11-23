class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.1,
            useIntersectionObserver: true,
            ...options
        };
        
        this.loadedCount = 0;
        this.totalCount = 0;
        this.observer = null;
        
        this.init();
    }
    
    init() {
        this.updateCounts();
        this.bindEvents();
        
        if (this.options.useIntersectionObserver && 'IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.setupScrollListener();
        }
        
        this.loadVisibleImages();
    }
    
    bindEvents() {
        document.getElementById('addImages').addEventListener('click', () => {
            this.addMoreImages();
        });
        
        document.getElementById('toggleMethod').addEventListener('click', () => {
            this.toggleMethod();
        });
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: this.options.rootMargin,
            threshold: this.options.threshold
        });
        
        this.observeImages();
    }
    
    setupScrollListener() {
        this.scrollHandler = this.throttle(() => {
            this.loadVisibleImages();
        }, 100);
        
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
    }
    
    observeImages() {
        const images = document.querySelectorAll('.image-item:not(.loaded):not(.loading)');
        images.forEach(img => {
            this.observer.observe(img);
            img.classList.add('visible');
        });
    }
    
    loadVisibleImages() {
        const images = document.querySelectorAll('.image-item:not(.loaded):not(.loading)');
        
        images.forEach(imageItem => {
            if (this.isInViewport(imageItem)) {
                this.loadImage(imageItem);
            } else {
                imageItem.classList.add('visible');
            }
        });
    }
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return rect.top <= windowHeight + 50 && rect.bottom >= -50;
    }
    
    async loadImage(imageItem) {
        if (imageItem.classList.contains('loaded') || imageItem.classList.contains('loading')) {
            return;
        }
        
        imageItem.classList.add('loading');
        const src = imageItem.dataset.src;
        
        try {
            const img = await this.preloadImage(src);
            
            // Create and insert the image
            img.alt = `Lazy loaded image ${this.loadedCount + 1}`;
            imageItem.appendChild(img);
            
            // Add loaded class after a small delay for smooth transition
            setTimeout(() => {
                imageItem.classList.add('loaded');
                imageItem.classList.remove('loading');
                this.loadedCount++;
                this.updateCounts();
            }, 100);
            
        } catch (error) {
            console.error('Failed to load image:', src, error);
            this.handleImageError(imageItem);
        }
    }
    
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            
            // Add loading delay simulation (remove in production)
            setTimeout(() => {
                img.src = src;
            }, Math.random() * 500 + 200);
        });
    }
    
    handleImageError(imageItem) {
        imageItem.classList.add('error');
        imageItem.classList.remove('loading');
        
        const placeholder = imageItem.querySelector('.image-placeholder');
        placeholder.innerHTML = '<div>❌ Failed to load</div>';
    }
    
    addMoreImages() {
        const grid = document.getElementById('imageGrid');
        const currentCount = grid.children.length;
        
        for (let i = 1; i <= 6; i++) {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.dataset.src = `https://picsum.photos/400/300?random=${currentCount + i + 100}`;
            
            imageItem.innerHTML = `
                <div class="image-placeholder">
                    <div class="loading-spinner"></div>
                </div>
            `;
            
            grid.appendChild(imageItem);
        }
        
        this.updateCounts();
        
        if (this.observer) {
            this.observeImages();
        } else {
            this.loadVisibleImages();
        }
    }
    
    toggleMethod() {
        this.options.useIntersectionObserver = !this.options.useIntersectionObserver;
        const btn = document.getElementById('toggleMethod');
        
        // Clean up current method
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
            this.scrollHandler = null;
        }
        
        // Setup new method
        if (this.options.useIntersectionObserver && 'IntersectionObserver' in window) {
            this.setupIntersectionObserver();
            btn.textContent = 'Method: Intersection Observer';
        } else {
            this.setupScrollListener();
            btn.textContent = 'Method: Scroll Listener';
        }
    }
    
    updateCounts() {
        this.totalCount = document.querySelectorAll('.image-item').length;
        document.getElementById('loadedCount').textContent = this.loadedCount;
        document.getElementById('totalCount').textContent = this.totalCount;
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
}

// Progressive image loading with blur effect
class ProgressiveLazyLoader extends LazyLoader {
    async loadImage(imageItem) {
        if (imageItem.classList.contains('loaded') || imageItem.classList.contains('loading')) {
            return;
        }
        
        imageItem.classList.add('loading');
        const src = imageItem.dataset.src;
        
        try {
            // Load low quality placeholder first
            const lowQualitySrc = src.replace('400/300', '40/30');
            const placeholder = await this.preloadImage(lowQualitySrc);
            
            placeholder.style.filter = 'blur(10px)';
            placeholder.style.transform = 'scale(1.1)';
            imageItem.appendChild(placeholder);
            
            // Then load high quality image
            const highQualityImg = await this.preloadImage(src);
            highQualityImg.style.position = 'absolute';
            highQualityImg.style.top = '0';
            highQualityImg.style.left = '0';
            
            imageItem.appendChild(highQualityImg);
            
            setTimeout(() => {
                imageItem.classList.add('loaded');
                imageItem.classList.remove('loading');
                this.loadedCount++;
                this.updateCounts();
            }, 100);
            
        } catch (error) {
            console.error('Failed to load image:', src, error);
            this.handleImageError(imageItem);
        }
    }
}

// Initialize lazy loader
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader({
        rootMargin: '100px',
        threshold: 0.1,
        useIntersectionObserver: true
    });
});