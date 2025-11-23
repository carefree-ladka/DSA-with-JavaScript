class TrafficLight {
    constructor() {
        this.config = {
            red: 30,
            yellow: 5,
            green: 25
        };
        this.currentState = 'red';
        this.timeLeft = this.config.red;
        this.isRunning = false;
        this.interval = null;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.setActiveLight('red');
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    stop() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    reset() {
        this.stop();
        this.currentState = 'red';
        this.timeLeft = this.config.red;
        this.updateDisplay();
        this.setActiveLight('red');
    }

    tick() {
        this.timeLeft--;
        this.updateDisplay();

        if (this.timeLeft <= 0) {
            this.nextState();
        }
    }

    nextState() {
        const states = ['red', 'green', 'yellow'];
        const currentIndex = states.indexOf(this.currentState);
        const nextIndex = (currentIndex + 1) % states.length;
        
        this.currentState = states[nextIndex];
        this.timeLeft = this.config[this.currentState];
        this.setActiveLight(this.currentState);
        this.updateDisplay();
    }

    setActiveLight(color) {
        document.querySelectorAll('.light').forEach(light => {
            light.classList.remove('active');
        });
        
        const activeLight = document.querySelector(`.light.${color}`);
        if (activeLight) {
            activeLight.classList.add('active');
        }
    }

    updateDisplay() {
        const timers = {
            red: document.getElementById('redTimer'),
            yellow: document.getElementById('yellowTimer'),
            green: document.getElementById('greenTimer')
        };

        // Reset all timers to config values
        timers.red.textContent = this.config.red;
        timers.yellow.textContent = this.config.yellow;
        timers.green.textContent = this.config.green;

        // Show current countdown on active light
        if (timers[this.currentState]) {
            timers[this.currentState].textContent = this.timeLeft;
        }
    }

    updateConfig() {
        const newConfig = {
            red: parseInt(document.getElementById('redDuration').value) || 30,
            yellow: parseInt(document.getElementById('yellowDuration').value) || 5,
            green: parseInt(document.getElementById('greenDuration').value) || 25
        };

        this.config = newConfig;
        
        // If not running, update current time
        if (!this.isRunning) {
            this.timeLeft = this.config[this.currentState];
        }
        
        this.updateDisplay();
    }
}

// Initialize traffic light system
const trafficLight = new TrafficLight();