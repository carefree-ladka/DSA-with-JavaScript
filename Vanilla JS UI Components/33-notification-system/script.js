class NotificationSystem {
    constructor() {
        this.queue = [];
        this.activeNotifications = new Map();
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.position = 'top-right';
    }

    show(message, type = 'info', duration = this.defaultDuration) {
        const notification = {
            id: Date.now() + Math.random(),
            message,
            type,
            duration
        };

        if (this.activeNotifications.size >= this.maxNotifications) {
            this.queue.push(notification);
        } else {
            this.display(notification);
        }
    }

    display(notification) {
        const container = document.getElementById('notificationContainer');
        const element = this.createElement(notification);
        
        container.appendChild(element);
        this.activeNotifications.set(notification.id, {
            element,
            timer: null,
            startTime: Date.now(),
            remainingTime: notification.duration
        });

        // Trigger animation
        setTimeout(() => element.classList.add('show'), 10);

        // Start auto-dismiss timer
        this.startTimer(notification.id);

        // Setup hover pause/resume
        element.addEventListener('mouseenter', () => this.pauseTimer(notification.id));
        element.addEventListener('mouseleave', () => this.resumeTimer(notification.id));
    }

    createElement(notification) {
        const element = document.createElement('div');
        element.className = `notification ${notification.type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        element.innerHTML = `
            <div class="notification-icon">${icons[notification.type]}</div>
            <div class="notification-content">${notification.message}</div>
            <button class="notification-close" onclick="notifications.dismiss('${notification.id}')">&times;</button>
            <div class="notification-progress"></div>
        `;

        return element;
    }

    startTimer(id) {
        const notification = this.activeNotifications.get(id);
        if (!notification) return;

        const progress = notification.element.querySelector('.notification-progress');
        progress.style.width = '100%';
        progress.style.transition = `width ${notification.remainingTime}ms linear`;
        
        setTimeout(() => {
            progress.style.width = '0%';
        }, 10);

        notification.timer = setTimeout(() => {
            this.dismiss(id);
        }, notification.remainingTime);
    }

    pauseTimer(id) {
        const notification = this.activeNotifications.get(id);
        if (!notification || !notification.timer) return;

        clearTimeout(notification.timer);
        const elapsed = Date.now() - notification.startTime;
        notification.remainingTime = Math.max(0, notification.remainingTime - elapsed);
        
        const progress = notification.element.querySelector('.notification-progress');
        progress.style.transition = 'none';
        notification.element.classList.add('paused');
    }

    resumeTimer(id) {
        const notification = this.activeNotifications.get(id);
        if (!notification) return;

        notification.startTime = Date.now();
        notification.element.classList.remove('paused');
        this.startTimer(id);
    }

    dismiss(id) {
        const notification = this.activeNotifications.get(id);
        if (!notification) return;

        if (notification.timer) {
            clearTimeout(notification.timer);
        }

        notification.element.classList.remove('show');
        
        setTimeout(() => {
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
            this.activeNotifications.delete(id);
            this.processQueue();
        }, 300);
    }

    processQueue() {
        if (this.queue.length > 0 && this.activeNotifications.size < this.maxNotifications) {
            const next = this.queue.shift();
            this.display(next);
        }
    }

    setPosition(position) {
        this.position = position;
        const container = document.getElementById('notificationContainer');
        container.className = `notification-container ${position}`;
    }

    clear() {
        this.activeNotifications.forEach((_, id) => this.dismiss(id));
        this.queue = [];
    }
}

const notifications = new NotificationSystem();