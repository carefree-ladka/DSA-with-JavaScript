class OutlookApp {
    constructor() {
        this.mockData = {
            emails: [
                {
                    id: 1,
                    sender: "John Smith",
                    senderEmail: "john.smith@company.com",
                    subject: "Q4 Budget Review Meeting",
                    preview: "Hi team, I'd like to schedule a meeting to review our Q4 budget allocations...",
                    body: "Hi team,\n\nI'd like to schedule a meeting to review our Q4 budget allocations and discuss the upcoming projects. Please let me know your availability for next week.\n\nBest regards,\nJohn",
                    time: "2:30 PM",
                    date: "Today",
                    unread: true,
                    priority: "normal",
                    hasAttachment: false
                },
                {
                    id: 2,
                    sender: "Sarah Johnson",
                    senderEmail: "sarah.j@company.com",
                    subject: "Project Timeline Update",
                    preview: "The development timeline has been updated. Please review the new milestones...",
                    body: "Hello everyone,\n\nThe development timeline has been updated based on our recent sprint review. Please review the new milestones and let me know if you have any concerns.\n\nKey changes:\n- Phase 1 completion moved to next Friday\n- Testing phase extended by 2 days\n- Final delivery remains on schedule\n\nThanks,\nSarah",
                    time: "1:15 PM",
                    date: "Today",
                    unread: true,
                    priority: "high",
                    hasAttachment: true
                },
                {
                    id: 3,
                    sender: "Mike Chen",
                    senderEmail: "m.chen@company.com",
                    subject: "Code Review Request",
                    preview: "Could you please review the latest pull request for the authentication module?",
                    body: "Hi,\n\nCould you please review the latest pull request for the authentication module? I've implemented the OAuth integration and added unit tests.\n\nPR Link: #234\n\nThanks!",
                    time: "11:45 AM",
                    date: "Today",
                    unread: false,
                    priority: "normal",
                    hasAttachment: false
                },
                {
                    id: 4,
                    sender: "Emily Davis",
                    senderEmail: "emily.davis@company.com",
                    subject: "Design System Updates",
                    preview: "I've updated the design system with new components and color palette...",
                    body: "Team,\n\nI've updated the design system with new components and color palette. The changes include:\n\n- New button variants\n- Updated typography scale\n- Improved accessibility colors\n- Dark mode support\n\nPlease update your projects accordingly.\n\nEmily",
                    time: "10:20 AM",
                    date: "Today",
                    unread: true,
                    priority: "low",
                    hasAttachment: true
                },
                {
                    id: 5,
                    sender: "Alex Wilson",
                    senderEmail: "alex.w@company.com",
                    subject: "Weekly Team Standup",
                    preview: "Reminder: Our weekly standup is scheduled for tomorrow at 9 AM...",
                    body: "Hi everyone,\n\nReminder: Our weekly standup is scheduled for tomorrow at 9 AM in the main conference room.\n\nAgenda:\n- Sprint progress review\n- Blockers discussion\n- Next week planning\n\nSee you there!",
                    time: "Yesterday",
                    date: "Yesterday",
                    unread: false,
                    priority: "normal",
                    hasAttachment: false
                }
            ]
        };
        this.selectedEmail = null;
        this.currentFolder = 'inbox';
        this.init();
    }

    init() {
        this.renderEmails();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('.folder-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.folder-item').forEach(folder => folder.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFolder = e.target.dataset.folder;
                this.renderEmails();
            });
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterEmails(e.target.value);
        });
    }

    renderEmails() {
        const container = document.getElementById('emailsContainer');
        const emails = this.getEmailsForFolder();
        
        container.innerHTML = emails.map(email => `
            <div class="email-item ${email.unread ? 'unread' : ''} ${email.id === this.selectedEmail?.id ? 'selected' : ''}" 
                 onclick="outlookApp.selectEmail(${email.id})">
                <div class="email-header">
                    <span class="email-sender ${email.priority === 'high' ? 'priority-high' : email.priority === 'low' ? 'priority-low' : ''}">${email.sender}</span>
                    <span class="email-time">${email.time}</span>
                </div>
                <div class="email-subject">
                    ${email.subject}
                    ${email.hasAttachment ? '<span class="attachment-icon">📎</span>' : ''}
                </div>
                <div class="email-preview-text">${email.preview}</div>
            </div>
        `).join('');
    }

    getEmailsForFolder() {
        // For demo purposes, return all emails for inbox
        if (this.currentFolder === 'inbox') {
            return this.mockData.emails;
        }
        return [];
    }

    selectEmail(emailId) {
        this.selectedEmail = this.mockData.emails.find(email => email.id === emailId);
        
        // Mark as read
        if (this.selectedEmail.unread) {
            this.selectedEmail.unread = false;
            this.updateUnreadCount();
        }
        
        this.renderEmails();
        this.renderEmailPreview();
    }

    renderEmailPreview() {
        const header = document.getElementById('previewHeader');
        const content = document.getElementById('previewContent');
        
        if (!this.selectedEmail) {
            header.innerHTML = '<div class="email-subject">Select an email to preview</div>';
            content.innerHTML = `
                <div class="no-selection">
                    <div class="no-selection-icon">📧</div>
                    <p>Choose an email from the list to read it here.</p>
                </div>
            `;
            return;
        }

        const email = this.selectedEmail;
        
        header.innerHTML = `
            <div class="email-subject">${email.subject}</div>
            <div class="preview-sender-info">
                <div class="sender-avatar">${this.getInitials(email.sender)}</div>
                <div class="sender-details">
                    <div class="sender-name">${email.sender}</div>
                    <div class="sender-email">${email.senderEmail}</div>
                </div>
                <div class="email-date">${email.date} ${email.time}</div>
            </div>
        `;
        
        content.innerHTML = `
            <div class="email-body">${email.body.replace(/\n/g, '<br>')}</div>
        `;
    }

    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    filterEmails(searchTerm) {
        const container = document.getElementById('emailsContainer');
        const emailItems = container.querySelectorAll('.email-item');
        
        emailItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            item.style.display = matches ? 'block' : 'none';
        });
    }

    updateUnreadCount() {
        const unreadCount = this.mockData.emails.filter(email => email.unread).length;
        const inboxItem = document.querySelector('[data-folder="inbox"] .unread-count');
        if (inboxItem) {
            inboxItem.textContent = unreadCount;
            inboxItem.style.display = unreadCount > 0 ? 'inline' : 'none';
        }
    }

    composeEmail() {
        alert('Compose email functionality would open a new email composer window.');
    }
}

// Initialize Outlook app
const outlookApp = new OutlookApp();