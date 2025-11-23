class ImageCarousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = element.querySelectorAll('.carousel-slide');
        this.prevBtn = element.querySelector('.prev');
        this.nextBtn = element.querySelector('.next');
        this.dotsContainer = element.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.isPlaying = true;
        this.isInfinite = true;
        this.interval = 3000;
        this.autoplayTimer = null;
        
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.bindEvents();
        this.startAutoplay();
        this.setupInfiniteLoop();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Touch events for swipe
        this.carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoplay());
        
        // Controls
        document.getElementById('playPause').addEventListener('click', this.toggleAutoplay.bind(this));
        document.getElementById('toggleInfinite').addEventListener('click', this.toggleInfinite.bind(this));
        
        const speedControl = document.getElementById('speedControl');
        speedControl.addEventListener('input', (e) => {
            this.interval = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = (this.interval / 1000) + 's';
            if (this.isPlaying) {
                this.stopAutoplay();
                this.startAutoplay();
            }
        });
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }
    
    setupInfiniteLoop() {
        if (!this.isInfinite) return;
        
        // Clone first and last slides
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
        
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        
        this.track.appendChild(firstClone);
        this.track.insertBefore(lastClone, this.slides[0]);
        
        // Update slides list
        this.allSlides = this.track.querySelectorAll('.carousel-slide');
        this.currentIndex = 1; // Start at first real slide
        this.updateCarousel(false);
    }
    
    next() {
        if (this.isInfinite) {
            this.currentIndex++;
            this.updateCarousel();
            
            if (this.currentIndex >= this.allSlides.length - 1) {
                setTimeout(() => {
                    this.currentIndex = 1;
                    this.updateCarousel(false);
                }, 500);
            }
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateCarousel();
        }
    }
    
    prev() {
        if (this.isInfinite) {
            this.currentIndex--;
            this.updateCarousel();
            
            if (this.currentIndex <= 0) {
                setTimeout(() => {
                    this.currentIndex = this.allSlides.length - 2;
                    this.updateCarousel(false);
                }, 500);
            }
        } else {
            this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        if (this.isInfinite) {
            this.currentIndex = index + 1;
        } else {
            this.currentIndex = index;
        }
        this.updateCarousel();
    }
    
    updateCarousel(animate = true) {
        const slideWidth = this.carousel.offsetWidth;
        const translateX = -this.currentIndex * slideWidth;
        
        if (animate) {
            this.track.style.transition = 'transform 0.5s ease';
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update active states
        this.slides.forEach((slide, index) => {
            const isActive = this.isInfinite ? 
                index === this.currentIndex - 1 : 
                index === this.currentIndex;
            slide.classList.toggle('active', isActive);
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            const isActive = this.isInfinite ? 
                index === this.currentIndex - 1 : 
                index === this.currentIndex;
            dot.classList.toggle('active', isActive);
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    startAutoplay() {
        if (!this.isPlaying) return;
        
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, this.interval);
    }
    
    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
    
    pauseAutoplay() {
        if (this.isPlaying) {
            this.stopAutoplay();
        }
    }
    
    resumeAutoplay() {
        if (this.isPlaying) {
            this.startAutoplay();
        }
    }
    
    toggleAutoplay() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('playPause');
        
        if (this.isPlaying) {
            this.startAutoplay();
            btn.textContent = '⏸️ Pause';
        } else {
            this.stopAutoplay();
            btn.textContent = '▶️ Play';
        }
    }
    
    toggleInfinite() {
        this.isInfinite = !this.isInfinite;
        const btn = document.getElementById('toggleInfinite');
        btn.textContent = `🔄 Infinite: ${this.isInfinite ? 'ON' : 'OFF'}`;
        
        // Rebuild carousel
        this.stopAutoplay();
        this.track.innerHTML = '';
        
        this.slides.forEach(slide => {
            if (!slide.classList.contains('clone')) {
                this.track.appendChild(slide);
            }
        });
        
        this.currentIndex = 0;
        
        if (this.isInfinite) {
            this.setupInfiniteLoop();
        } else {
            this.updateCarousel(false);
        }
        
        if (this.isPlaying) {
            this.startAutoplay();
        }
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    new ImageCarousel(carousel);
});