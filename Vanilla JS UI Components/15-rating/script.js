class Rating {
    constructor(element) {
        this.rating = element;
        this.stars = element.querySelectorAll('.star');
        this.valueDisplay = element.parentElement.querySelector('.rating-value span');
        
        this.maxRating = parseInt(element.dataset.max) || 5;
        this.precision = parseFloat(element.dataset.precision) || 1;
        this.currentValue = parseFloat(element.dataset.value) || 0;
        this.isReadonly = element.classList.contains('readonly');
        this.isHalfStars = element.classList.contains('half-stars');
        
        this.init();
    }
    
    init() {
        if (!this.isReadonly) {
            this.bindEvents();
        }
        this.setValue(this.currentValue);
    }
    
    bindEvents() {
        this.stars.forEach((star, index) => {
            star.addEventListener('click', (e) => {
                const value = this.getClickValue(e, index + 1);
                this.setValue(value);
                this.triggerChange();
            });
            
            star.addEventListener('mouseover', (e) => {
                const value = this.getClickValue(e, index + 1);
                this.highlightStars(value);
            });
            
            star.addEventListener('mouseleave', () => {
                this.highlightStars(this.currentValue);
            });
            
            // Keyboard support
            star.addEventListener('keydown', (e) => {
                this.handleKeydown(e, index);
            });
            
            star.setAttribute('tabindex', '0');
        });
    }
    
    getClickValue(event, starIndex) {
        if (!this.isHalfStars || this.precision >= 1) {
            return starIndex;
        }
        
        const star = event.currentTarget;
        const rect = star.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const starWidth = rect.width;
        
        // Determine if click is on left or right half
        const isLeftHalf = clickX < starWidth / 2;
        
        if (isLeftHalf) {
            return starIndex - 0.5;
        } else {
            return starIndex;
        }
    }
    
    handleKeydown(event, index) {
        let newValue = this.currentValue;
        
        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                event.preventDefault();
                newValue = Math.min(this.currentValue + this.precision, this.maxRating);
                break;
                
            case 'ArrowLeft':
            case 'ArrowDown':
                event.preventDefault();
                newValue = Math.max(this.currentValue - this.precision, 0);
                break;
                
            case 'Home':
                event.preventDefault();
                newValue = 0;
                break;
                
            case 'End':
                event.preventDefault();
                newValue = this.maxRating;
                break;
                
            case 'Enter':
            case ' ':
                event.preventDefault();
                newValue = index + 1;
                break;
                
            default:
                return;
        }
        
        this.setValue(newValue);
        this.triggerChange();
    }
    
    setValue(value) {
        this.currentValue = Math.max(0, Math.min(value, this.maxRating));
        this.updateDisplay();
        this.updateStars();
    }
    
    updateDisplay() {
        if (this.valueDisplay) {
            this.valueDisplay.textContent = this.currentValue.toString();
        }
    }
    
    updateStars() {
        this.stars.forEach((star, index) => {
            const starValue = index + 1;
            
            star.classList.remove('filled', 'half-filled', 'hovered');
            
            if (this.isHalfStars) {
                this.updateHalfStar(star, starValue);
            } else {
                if (starValue <= this.currentValue) {
                    star.classList.add('filled');
                }
            }
        });
    }
    
    updateHalfStar(star, starValue) {
        const halfStar = star.querySelector('.star-half');
        const fullStar = star.querySelector('.star-full');
        
        if (starValue <= this.currentValue) {
            // Full star
            star.classList.add('filled');
        } else if (starValue - 0.5 <= this.currentValue) {
            // Half star
            star.classList.add('half-filled');
        }
    }
    
    highlightStars(value) {
        this.stars.forEach((star, index) => {
            const starValue = index + 1;
            
            star.classList.remove('hovered');
            
            if (starValue <= value) {
                star.classList.add('hovered');
            }
        });
    }
    
    triggerChange() {
        // Add animation
        this.stars[Math.ceil(this.currentValue) - 1]?.classList.add('animate');
        setTimeout(() => {
            this.stars.forEach(star => star.classList.remove('animate'));
        }, 300);
        
        // Trigger custom event
        this.rating.dispatchEvent(new CustomEvent('ratingchange', {
            detail: {
                value: this.currentValue,
                maxRating: this.maxRating
            }
        }));
    }
    
    getValue() {
        return this.currentValue;
    }
    
    reset() {
        this.setValue(0);
    }
}

// Rating manager for multiple ratings
class RatingManager {
    constructor() {
        this.ratings = new Map();
        this.init();
    }
    
    init() {
        document.querySelectorAll('.rating').forEach(element => {
            const id = element.dataset.rating;
            const rating = new Rating(element);
            this.ratings.set(id, rating);
            
            // Listen for changes
            element.addEventListener('ratingchange', (e) => {
                console.log(`Rating ${id} changed to:`, e.detail.value);
            });
        });
        
        this.bindControls();
    }
    
    bindControls() {
        document.getElementById('setRating').addEventListener('click', () => {
            this.ratings.forEach((rating, id) => {
                if (id !== 'readonly') {
                    const randomValue = Math.random() * rating.maxRating;
                    const roundedValue = Math.round(randomValue / rating.precision) * rating.precision;
                    rating.setValue(roundedValue);
                }
            });
        });
        
        document.getElementById('clearRatings').addEventListener('click', () => {
            this.ratings.forEach((rating, id) => {
                if (id !== 'readonly') {
                    rating.reset();
                }
            });
        });
        
        document.getElementById('getRatings').addEventListener('click', () => {
            const values = {};
            this.ratings.forEach((rating, id) => {
                values[id] = rating.getValue();
            });
            
            document.getElementById('output').textContent = JSON.stringify(values, null, 2);
        });
    }
    
    getRating(id) {
        return this.ratings.get(id);
    }
    
    getAllRatings() {
        const values = {};
        this.ratings.forEach((rating, id) => {
            values[id] = rating.getValue();
        });
        return values;
    }
}

// Initialize rating manager
document.addEventListener('DOMContentLoaded', () => {
    new RatingManager();
});