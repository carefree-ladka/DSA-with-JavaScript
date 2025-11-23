class CountdownTimer {
    constructor() {
        this.totalTime = 0;
        this.remainingTime = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.intervalId = null;
        this.startTime = null;
        this.pausedTime = 0;
        
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            inputHours: document.getElementById('inputHours'),
            inputMinutes: document.getElementById('inputMinutes'),
            inputSeconds: document.getElementById('inputSeconds'),
            startBtn: document.getElementById('startBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            statusIndicator: document.getElementById('statusIndicator'),
            progressFill: document.getElementById('progressFill')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.setStatus('ready');
    }
    
    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.start());
        this.elements.pauseBtn.addEventListener('click', () => this.pause());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seconds = parseInt(e.target.dataset.time);
                this.setTime(0, 0, seconds);
            });
        });
        
        // Input validation
        [this.elements.inputHours, this.elements.inputMinutes, this.elements.inputSeconds].forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('change', () => this.updateFromInputs());
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'Escape') {
                this.reset();
            }
        });
        
        // Page visibility API to handle accurate timing
        document.addEventListener('visibilitychange', () => {
            if (this.isRunning && !document.hidden) {
                this.syncTime();
            }
        });
    }
    
    validateInput(input) {
        const value = parseInt(input.value);
        const max = parseInt(input.max);
        
        if (value > max) {
            input.value = max;
        } else if (value < 0) {
            input.value = 0;
        }
    }
    
    updateFromInputs() {
        const hours = parseInt(this.elements.inputHours.value) || 0;
        const minutes = parseInt(this.elements.inputMinutes.value) || 0;
        const seconds = parseInt(this.elements.inputSeconds.value) || 0;
        
        this.setTime(hours, minutes, seconds);
    }
    
    setTime(hours, minutes, seconds) {
        if (this.isRunning) return;
        
        this.totalTime = (hours * 3600) + (minutes * 60) + seconds;
        this.remainingTime = this.totalTime;
        
        this.elements.inputHours.value = hours;
        this.elements.inputMinutes.value = minutes;
        this.elements.inputSeconds.value = seconds;
        
        this.updateDisplay();
        this.updateProgress();
    }
    
    start() {
        if (this.remainingTime <= 0) {
            this.updateFromInputs();
            if (this.remainingTime <= 0) return;
        }
        
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = Date.now() - this.pausedTime;
        
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        
        this.setStatus('running');
        
        this.intervalId = setInterval(() => {
            this.tick();
        }, 100); // Update every 100ms for smooth progress
    }
    
    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.isPaused = true;
        this.pausedTime = Date.now() - this.startTime;
        
        clearInterval(this.intervalId);
        
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        this.setStatus('paused');
    }
    
    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.pausedTime = 0;
        
        clearInterval(this.intervalId);
        
        this.remainingTime = this.totalTime;
        
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        this.updateDisplay();
        this.updateProgress();
        this.setStatus('ready');
    }
    
    tick() {
        this.syncTime();
        
        if (this.remainingTime <= 0) {
            this.finish();
        } else {
            this.updateDisplay();
            this.updateProgress();
        }
    }
    
    syncTime() {
        if (!this.isRunning) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        this.remainingTime = Math.max(0, this.totalTime - elapsed);
    }
    
    finish() {
        this.isRunning = false;
        this.remainingTime = 0;
        
        clearInterval(this.intervalId);
        
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        this.updateDisplay();
        this.updateProgress();
        this.setStatus('finished');
        
        // Play notification sound (if available)
        this.playNotification();
        
        // Show browser notification
        this.showNotification();
    }
    
    updateDisplay() {
        const time = this.parseTime(this.remainingTime);
        
        this.elements.days.textContent = time.days.toString().padStart(2, '0');
        this.elements.hours.textContent = time.hours.toString().padStart(2, '0');
        this.elements.minutes.textContent = time.minutes.toString().padStart(2, '0');
        this.elements.seconds.textContent = time.seconds.toString().padStart(2, '0');
        
        // Update document title
        if (this.isRunning) {
            document.title = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')} - Timer`;
        } else {
            document.title = 'Countdown Timer';
        }
    }
    
    updateProgress() {
        if (this.totalTime === 0) {
            this.elements.progressFill.style.width = '0%';
            return;
        }
        
        const progress = ((this.totalTime - this.remainingTime) / this.totalTime) * 100;
        this.elements.progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
    
    parseTime(totalSeconds) {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return { days, hours, minutes, seconds };
    }
    
    setStatus(status) {
        this.elements.statusIndicator.className = `status-indicator ${status}`;
        
        const statusText = {
            ready: 'Ready',
            running: 'Running',
            paused: 'Paused',
            finished: 'Time\'s Up!'
        };
        
        this.elements.statusIndicator.textContent = statusText[status] || 'Ready';
    }
    
    playNotification() {
        // Create audio context for beep sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Audio notification not available');
        }
    }
    
    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Timer Finished!', {
                body: 'Your countdown timer has reached zero.',
                icon: '⏰'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Timer Finished!', {
                        body: 'Your countdown timer has reached zero.',
                        icon: '⏰'
                    });
                }
            });
        }
    }
}

new CountdownTimer();