class GoogleCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.events = this.getMockEvents();
        this.init();
    }

    init() {
        this.renderCalendar();
        this.renderMiniCalendar();
        this.setupEventListeners();
    }

    getMockEvents() {
        const today = new Date();
        return [
            {
                id: 1,
                title: "Team Meeting",
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
                time: "10:00",
                calendar: "work",
                description: "Weekly team standup"
            },
            {
                id: 2,
                title: "Doctor Appointment",
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
                time: "14:30",
                calendar: "personal",
                description: "Annual checkup"
            },
            {
                id: 3,
                title: "Project Deadline",
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
                time: "17:00",
                calendar: "work",
                description: "Final submission"
            },
            {
                id: 4,
                title: "Birthday Party",
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
                time: "19:00",
                calendar: "personal",
                description: "Sarah's birthday celebration"
            },
            {
                id: 5,
                title: "Holiday",
                date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
                time: "00:00",
                calendar: "holidays",
                description: "National holiday"
            }
        ];
    }

    setupEventListeners() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target === document.getElementById('eventModal')) {
                this.hideEventModal();
            }
        });
    }

    renderCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        document.getElementById('currentMonth').textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const daysGrid = document.getElementById('daysGrid');
        daysGrid.innerHTML = '';

        for (let i = 0; i < 42; i++) {
            const cellDate = new Date(startDate);
            cellDate.setDate(startDate.getDate() + i);
            
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.onclick = () => this.selectDate(cellDate);

            if (cellDate.getMonth() !== this.currentDate.getMonth()) {
                dayCell.classList.add('other-month');
            }

            if (this.isToday(cellDate)) {
                dayCell.classList.add('today');
            }

            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = cellDate.getDate();
            dayCell.appendChild(dayNumber);

            const dayEvents = this.getEventsForDate(cellDate);
            dayEvents.forEach(event => {
                const eventEl = document.createElement('div');
                eventEl.className = `event ${event.calendar}`;
                eventEl.textContent = event.title;
                eventEl.onclick = (e) => {
                    e.stopPropagation();
                    this.showEventDetails(event);
                };
                dayCell.appendChild(eventEl);
            });

            daysGrid.appendChild(dayCell);
        }
    }

    renderMiniCalendar() {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        document.getElementById('miniMonthYear').textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const miniGrid = document.getElementById('miniGrid');
        miniGrid.innerHTML = '';

        // Add weekday headers
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.textContent = day;
            header.style.fontSize = '10px';
            header.style.color = '#5f6368';
            header.style.textAlign = 'center';
            header.style.padding = '4px';
            miniGrid.appendChild(header);
        });

        for (let i = 0; i < 42; i++) {
            const cellDate = new Date(startDate);
            cellDate.setDate(startDate.getDate() + i);
            
            const miniDay = document.createElement('div');
            miniDay.className = 'mini-day';
            miniDay.textContent = cellDate.getDate();
            miniDay.onclick = () => this.goToDate(cellDate);

            if (cellDate.getMonth() !== this.currentDate.getMonth()) {
                miniDay.classList.add('other-month');
            }

            if (this.isToday(cellDate)) {
                miniDay.classList.add('today');
            }

            miniGrid.appendChild(miniDay);
        }
    }

    getEventsForDate(date) {
        return this.events.filter(event => 
            event.date.toDateString() === date.toDateString()
        );
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
        this.renderMiniCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
        this.renderMiniCalendar();
    }

    goToToday() {
        this.currentDate = new Date();
        this.renderCalendar();
        this.renderMiniCalendar();
    }

    goToDate(date) {
        this.currentDate = new Date(date);
        this.renderCalendar();
        this.renderMiniCalendar();
    }

    selectDate(date) {
        this.selectedDate = date;
        document.getElementById('eventDate').value = date.toISOString().split('T')[0];
        this.showEventModal();
    }

    showEventModal() {
        document.getElementById('eventModal').style.display = 'block';
        document.getElementById('eventTitle').focus();
    }

    hideEventModal() {
        document.getElementById('eventModal').style.display = 'none';
        this.clearForm();
    }

    saveEvent(e) {
        e.preventDefault();
        
        const title = document.getElementById('eventTitle').value;
        const date = new Date(document.getElementById('eventDate').value);
        const time = document.getElementById('eventTime').value;
        const calendar = document.getElementById('eventCalendar').value;
        const description = document.getElementById('eventDescription').value;

        const newEvent = {
            id: this.events.length + 1,
            title,
            date,
            time,
            calendar,
            description
        };

        this.events.push(newEvent);
        this.renderCalendar();
        this.hideEventModal();
    }

    showEventDetails(event) {
        alert(`${event.title}\n${event.date.toDateString()} at ${event.time}\n\n${event.description}`);
    }

    clearForm() {
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventCalendar').value = 'personal';
        document.getElementById('eventDescription').value = '';
    }
}

// Initialize Google Calendar
const calendar = new GoogleCalendar();