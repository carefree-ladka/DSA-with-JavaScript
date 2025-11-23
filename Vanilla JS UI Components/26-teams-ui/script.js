class TeamsApp {
    constructor() {
        this.mockData = {
            teams: [
                { id: 1, name: "Development Team", channel: "General" },
                { id: 2, name: "Marketing Team", channel: "Campaigns" },
                { id: 3, name: "Design Team", channel: "Creative" },
                { id: 4, name: "Sales Team", channel: "Leads" }
            ],
            members: [
                { id: 1, name: "John Smith", status: "online", avatar: "JS" },
                { id: 2, name: "Sarah Johnson", status: "away", avatar: "SJ" },
                { id: 3, name: "Mike Chen", status: "busy", avatar: "MC" },
                { id: 4, name: "Emily Davis", status: "online", avatar: "ED" },
                { id: 5, name: "Alex Wilson", status: "offline", avatar: "AW" }
            ],
            messages: [
                { id: 1, author: "John Smith", avatar: "JS", text: "Good morning everyone! Ready for the sprint planning?", time: "9:15 AM" },
                { id: 2, author: "Sarah Johnson", avatar: "SJ", text: "Yes! I've prepared the user stories for review.", time: "9:16 AM" },
                { id: 3, author: "Mike Chen", avatar: "MC", text: "The API endpoints are ready for testing. Let me know if you need anything.", time: "9:18 AM" },
                { id: 4, author: "Emily Davis", avatar: "ED", text: "Great work team! The designs are also finalized.", time: "9:20 AM" }
            ]
        };
        this.currentTeam = this.mockData.teams[0];
        this.init();
    }

    init() {
        this.renderTeams();
        this.renderMembers();
        this.renderMessages();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.id === 'messageInput') {
                this.sendMessage();
            }
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    renderTeams() {
        const teamsList = document.getElementById('teamsList');
        teamsList.innerHTML = this.mockData.teams.map(team => `
            <div class="team-item ${team.id === this.currentTeam.id ? 'active' : ''}" 
                 onclick="teamsApp.selectTeam(${team.id})">
                # ${team.channel}
            </div>
        `).join('');
    }

    renderMembers() {
        const membersList = document.getElementById('membersList');
        membersList.innerHTML = this.mockData.members.map(member => `
            <div class="member-item">
                <div class="member-avatar">${member.avatar}</div>
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-status">${this.getStatusText(member.status)}</div>
                </div>
                <div class="status-indicator status-${member.status}"></div>
            </div>
        `).join('');
    }

    renderMessages() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = this.mockData.messages.map(message => `
            <div class="message">
                <div class="message-avatar">${message.avatar}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${message.author}</span>
                        <span class="message-time">${message.time}</span>
                    </div>
                    <div class="message-text">${message.text}</div>
                </div>
            </div>
        `).join('');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    selectTeam(teamId) {
        this.currentTeam = this.mockData.teams.find(team => team.id === teamId);
        document.getElementById('chatHeader').querySelector('.chat-title').textContent = this.currentTeam.channel;
        this.renderTeams();
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const text = input.value.trim();
        
        if (!text) return;

        const newMessage = {
            id: this.mockData.messages.length + 1,
            author: "You",
            avatar: "YU",
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        this.mockData.messages.push(newMessage);
        this.renderMessages();
        input.value = '';
    }

    getStatusText(status) {
        const statusMap = {
            online: "Available",
            away: "Away",
            busy: "Busy",
            offline: "Offline"
        };
        return statusMap[status] || "Unknown";
    }
}

// Initialize Teams app
const teamsApp = new TeamsApp();