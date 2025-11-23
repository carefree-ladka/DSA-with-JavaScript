class CommentsSystem {
    constructor() {
        this.comments = this.loadComments();
        this.nextId = this.getNextId();
        this.init();
    }

    init() {
        this.renderComments();
        this.setupEventListeners();
    }

    loadComments() {
        const saved = localStorage.getItem('nested-comments');
        return saved ? JSON.parse(saved) : this.getSampleData();
    }

    saveComments() {
        localStorage.setItem('nested-comments', JSON.stringify(this.comments));
    }

    getNextId() {
        return Math.max(0, ...this.getAllIds(this.comments)) + 1;
    }

    getAllIds(comments) {
        let ids = [];
        comments.forEach(comment => {
            ids.push(comment.id);
            if (comment.replies) {
                ids = ids.concat(this.getAllIds(comment.replies));
            }
        });
        return ids;
    }

    getSampleData() {
        return [
            {
                id: 1,
                author: 'Alice Johnson',
                text: 'This is a great implementation! The VSCode-like styling really makes it feel professional.',
                timestamp: Date.now() - 3600000,
                collapsed: false,
                replies: [
                    {
                        id: 2,
                        author: 'Bob Smith',
                        text: 'I agree! The collapsible feature is really smooth.',
                        timestamp: Date.now() - 3000000,
                        collapsed: false,
                        replies: [
                            {
                                id: 3,
                                author: 'Charlie Brown',
                                text: 'The depth indicators are a nice touch too.',
                                timestamp: Date.now() - 2400000,
                                collapsed: false,
                                replies: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 4,
                author: 'Diana Prince',
                text: 'How does the performance scale with deeply nested comments?',
                timestamp: Date.now() - 1800000,
                collapsed: false,
                replies: []
            }
        ];
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('reply-btn')) {
                e.stopPropagation();
                const commentEl = e.target.closest('.comment');
                this.showReplyForm(commentEl);
                return;
            }
            
            if (e.target.classList.contains('submit-reply')) {
                e.stopPropagation();
                const commentEl = e.target.closest('.comment');
                this.submitReply(commentEl);
                return;
            }
            
            if (e.target.classList.contains('cancel-reply')) {
                e.stopPropagation();
                const commentEl = e.target.closest('.comment');
                this.hideReplyForm(commentEl);
                return;
            }
            
            if (e.target.closest('.comment-header') && !e.target.closest('.comment-actions')) {
                const commentEl = e.target.closest('.comment');
                this.toggleComment(commentEl);
            }
        });
    }

    toggleComment(commentEl) {
        const id = parseInt(commentEl.dataset.id);
        const comment = this.findComment(id);
        
        comment.collapsed = !comment.collapsed;
        
        const content = commentEl.querySelector('.comment-content');
        const icon = commentEl.querySelector('.toggle-icon');
        
        content.classList.toggle('collapsed', comment.collapsed);
        icon.classList.toggle('collapsed', comment.collapsed);
        
        this.saveComments();
    }

    showReplyForm(commentEl) {
        const form = commentEl.querySelector('.reply-form');
        form.classList.add('active');
        form.querySelector('textarea').focus();
    }

    hideReplyForm(commentEl) {
        const form = commentEl.querySelector('.reply-form');
        form.classList.remove('active');
        form.querySelector('textarea').value = '';
    }

    submitReply(commentEl) {
        const form = commentEl.querySelector('.reply-form');
        const textarea = form.querySelector('textarea');
        const text = textarea.value.trim();
        
        if (!text) return;
        
        const parentId = parseInt(commentEl.dataset.id);
        const newReply = {
            id: this.nextId++,
            author: 'Current User',
            text: text,
            timestamp: Date.now(),
            collapsed: false,
            replies: []
        };
        
        const parentComment = this.findComment(parentId);
        parentComment.replies.push(newReply);
        
        this.saveComments();
        this.renderComments();
    }

    findComment(id, comments = this.comments) {
        for (const comment of comments) {
            if (comment.id === id) return comment;
            const found = this.findComment(id, comment.replies);
            if (found) return found;
        }
        return null;
    }

    renderComments() {
        const container = document.getElementById('commentsContainer');
        container.innerHTML = this.renderCommentsList(this.comments);
    }

    renderCommentsList(comments, depth = 0) {
        return comments.map(comment => this.renderComment(comment, depth)).join('');
    }

    renderComment(comment, depth) {
        const timeAgo = this.getTimeAgo(comment.timestamp);
        const replyCount = this.getReplyCount(comment);
        
        return `
            <div class="comment" data-id="${comment.id}" data-depth="${depth}">
                <div class="depth-indicator"></div>
                <div class="comment-header">
                    <div class="toggle-icon ${comment.collapsed ? 'collapsed' : ''}">▼</div>
                    <div class="comment-info">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-time">${timeAgo}</span>
                    </div>
                    ${replyCount > 0 ? `<span class="comment-count">${replyCount} replies</span>` : ''}
                    <div class="comment-actions">
                        <button class="reply-btn">Reply</button>
                    </div>
                </div>
                <div class="comment-content ${comment.collapsed ? 'collapsed' : ''}">
                    <div class="comment-text">${comment.text}</div>
                    <div class="reply-form">
                        <textarea placeholder="Write a reply..."></textarea>
                        <div class="form-actions">
                            <button class="submit-reply">Reply</button>
                            <button class="cancel-reply cancel-btn">Cancel</button>
                        </div>
                    </div>
                    ${comment.replies.length > 0 ? `
                        <div class="nested-comments">
                            ${this.renderCommentsList(comment.replies, depth + 1)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getReplyCount(comment) {
        let count = comment.replies.length;
        comment.replies.forEach(reply => {
            count += this.getReplyCount(reply);
        });
        return count;
    }

    getTimeAgo(timestamp) {
        const diff = Date.now() - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    }
}

function addComment() {
    const textarea = document.getElementById('newComment');
    const text = textarea.value.trim();
    
    if (!text) return;
    
    const newComment = {
        id: commentsSystem.nextId++,
        author: 'Current User',
        text: text,
        timestamp: Date.now(),
        collapsed: false,
        replies: []
    };
    
    commentsSystem.comments.push(newComment);
    commentsSystem.saveComments();
    commentsSystem.renderComments();
    
    textarea.value = '';
}

// Initialize the comments system
const commentsSystem = new CommentsSystem();