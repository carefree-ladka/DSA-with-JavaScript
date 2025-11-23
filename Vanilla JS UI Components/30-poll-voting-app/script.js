class PollApp {
    constructor() {
        this.polls = this.loadPolls();
        this.userVotes = this.loadUserVotes();
        this.init();
    }

    init() {
        this.renderPolls();
    }

    loadPolls() {
        const saved = localStorage.getItem('polls');
        return saved ? JSON.parse(saved) : this.getSamplePolls();
    }

    loadUserVotes() {
        const saved = localStorage.getItem('userVotes');
        return saved ? JSON.parse(saved) : {};
    }

    getSamplePolls() {
        return [
            {
                id: 1,
                question: "What's your favorite programming language?",
                options: [
                    { text: "JavaScript", votes: 45 },
                    { text: "Python", votes: 38 },
                    { text: "Java", votes: 22 },
                    { text: "TypeScript", votes: 15 }
                ],
                createdAt: Date.now() - 86400000
            },
            {
                id: 2,
                question: "Which frontend framework do you prefer?",
                options: [
                    { text: "React", votes: 52 },
                    { text: "Vue.js", votes: 28 },
                    { text: "Angular", votes: 18 },
                    { text: "Svelte", votes: 12 }
                ],
                createdAt: Date.now() - 43200000
            }
        ];
    }

    savePolls() {
        localStorage.setItem('polls', JSON.stringify(this.polls));
    }

    saveUserVotes() {
        localStorage.setItem('userVotes', JSON.stringify(this.userVotes));
    }

    renderPolls() {
        const container = document.getElementById('pollsList');
        
        if (this.polls.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No polls yet</h3>
                    <p>Create your first poll to get started!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.polls.map(poll => this.renderPoll(poll)).join('');
        
        // Animate bars after render
        setTimeout(() => this.animateBars(), 100);
    }

    renderPoll(poll) {
        const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
        const hasVoted = this.userVotes[poll.id] !== undefined;
        const userVoteIndex = this.userVotes[poll.id];

        return `
            <div class="poll-card ${hasVoted ? 'voted' : ''}" data-poll-id="${poll.id}">
                <div class="poll-question">${poll.question}</div>
                <div class="poll-options">
                    ${poll.options.map((option, index) => {
                        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                        const isUserVote = hasVoted && userVoteIndex === index;
                        
                        return `
                            <div class="poll-option ${isUserVote ? 'user-vote' : ''}" 
                                 onclick="pollApp.vote(${poll.id}, ${index})">
                                <div class="option-header">
                                    <span class="option-text">
                                        ${option.text} ${isUserVote ? '✓' : ''}
                                    </span>
                                    <span class="option-percentage">${percentage}%</span>
                                </div>
                                <div class="option-bar">
                                    <div class="option-fill" data-width="${percentage}"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="poll-stats">
                    <span class="total-votes">${totalVotes} total votes</span>
                    <div class="poll-actions">
                        <button onclick="pollApp.sharePoll(${poll.id})">Share</button>
                        <button onclick="pollApp.deletePoll(${poll.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }

    animateBars() {
        document.querySelectorAll('.option-fill').forEach(bar => {
            const width = bar.dataset.width;
            setTimeout(() => {
                bar.style.width = width + '%';
            }, Math.random() * 200);
        });
    }

    vote(pollId, optionIndex) {
        if (this.userVotes[pollId] !== undefined) {
            return; // Already voted
        }

        const poll = this.polls.find(p => p.id === pollId);
        if (!poll) return;

        // Add vote
        poll.options[optionIndex].votes++;
        this.userVotes[pollId] = optionIndex;

        // Save state
        this.savePolls();
        this.saveUserVotes();

        // Animate vote
        const pollCard = document.querySelector(`[data-poll-id="${pollId}"]`);
        pollCard.classList.add('vote-animation');
        
        setTimeout(() => {
            pollCard.classList.remove('vote-animation');
            this.renderPolls();
        }, 600);
    }

    showCreateModal() {
        document.getElementById('createModal').style.display = 'block';
        document.getElementById('pollQuestion').focus();
    }

    hideCreateModal() {
        document.getElementById('createModal').style.display = 'none';
        this.clearCreateForm();
    }

    createPoll(event) {
        event.preventDefault();
        
        const question = document.getElementById('pollQuestion').value.trim();
        const optionInputs = document.querySelectorAll('.option-input');
        const options = Array.from(optionInputs)
            .map(input => input.value.trim())
            .filter(text => text.length > 0)
            .map(text => ({ text, votes: 0 }));

        if (options.length < 2) {
            alert('Please provide at least 2 options');
            return;
        }

        const newPoll = {
            id: Date.now(),
            question,
            options,
            createdAt: Date.now()
        };

        this.polls.unshift(newPoll);
        this.savePolls();
        this.renderPolls();
        this.hideCreateModal();
    }

    clearCreateForm() {
        document.getElementById('pollQuestion').value = '';
        document.querySelectorAll('.option-input').forEach(input => {
            input.value = '';
        });
    }

    deletePoll(pollId) {
        if (!confirm('Are you sure you want to delete this poll?')) return;
        
        this.polls = this.polls.filter(poll => poll.id !== pollId);
        delete this.userVotes[pollId];
        
        this.savePolls();
        this.saveUserVotes();
        this.renderPolls();
    }

    sharePoll(pollId) {
        const poll = this.polls.find(p => p.id === pollId);
        if (!poll) return;

        const shareText = `Check out this poll: "${poll.question}"`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Poll Share',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText + ' - ' + window.location.href)
                .then(() => alert('Poll link copied to clipboard!'))
                .catch(() => alert('Unable to share poll'));
        }
    }
}

// Initialize app
const pollApp = new PollApp();

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.id === 'createModal') {
        pollApp.hideCreateModal();
    }
});