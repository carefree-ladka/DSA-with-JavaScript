class KanbanBoard {
    constructor() {
        this.cards = this.loadCards();
        this.draggedCard = null;
        this.init();
    }

    init() {
        this.renderCards();
        this.setupDragAndDrop();
        this.setupKeyboardNavigation();
    }

    loadCards() {
        const saved = localStorage.getItem('kanbanCards');
        return saved ? JSON.parse(saved) : this.getSampleCards();
    }

    getSampleCards() {
        return [
            {
                id: 1,
                title: "Design Homepage",
                description: "Create wireframes and mockups for the new homepage",
                priority: "high",
                column: "todo"
            },
            {
                id: 2,
                title: "API Integration",
                description: "Connect frontend with backend API endpoints",
                priority: "medium",
                column: "inprogress"
            },
            {
                id: 3,
                title: "User Testing",
                description: "Conduct usability tests with target users",
                priority: "low",
                column: "done"
            }
        ];
    }

    saveCards() {
        localStorage.setItem('kanbanCards', JSON.stringify(this.cards));
    }

    renderCards() {
        const columns = ['todo', 'inprogress', 'done'];
        
        columns.forEach(column => {
            const container = document.getElementById(`${column}-cards`);
            const columnCards = this.cards.filter(card => card.column === column);
            
            container.innerHTML = columnCards.map(card => this.createCardHTML(card)).join('');
            
            // Update card count
            const countElement = document.querySelector(`[data-column="${column}"] .card-count`);
            countElement.textContent = columnCards.length;
        });
    }

    createCardHTML(card) {
        return `
            <div class="card" draggable="true" data-card-id="${card.id}" tabindex="0">
                <div class="card-actions">
                    <button onclick="kanban.deleteCard(${card.id})" title="Delete">&times;</button>
                </div>
                <div class="card-title">${card.title}</div>
                <div class="card-description">${card.description}</div>
                <div class="card-priority ${card.priority}">${card.priority}</div>
            </div>
        `;
    }

    setupDragAndDrop() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                this.draggedCard = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.remove('dragging');
                this.draggedCard = null;
            }
        });

        document.querySelectorAll('.cards-container').forEach(container => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                container.classList.add('drag-over');
            });

            container.addEventListener('dragleave', (e) => {
                if (!container.contains(e.relatedTarget)) {
                    container.classList.remove('drag-over');
                }
            });

            container.addEventListener('drop', (e) => {
                e.preventDefault();
                container.classList.remove('drag-over');
                
                if (this.draggedCard) {
                    const cardId = parseInt(this.draggedCard.dataset.cardId);
                    const newColumn = container.id.replace('-cards', '');
                    this.moveCard(cardId, newColumn);
                }
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const focusedCard = document.activeElement;
            if (!focusedCard.classList.contains('card')) return;

            const cardId = parseInt(focusedCard.dataset.cardId);
            const card = this.cards.find(c => c.id === cardId);
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (card.column === 'inprogress') this.moveCard(cardId, 'todo');
                    else if (card.column === 'done') this.moveCard(cardId, 'inprogress');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (card.column === 'todo') this.moveCard(cardId, 'inprogress');
                    else if (card.column === 'inprogress') this.moveCard(cardId, 'done');
                    break;
                case 'Delete':
                    e.preventDefault();
                    this.deleteCard(cardId);
                    break;
            }
        });
    }

    moveCard(cardId, newColumn) {
        const card = this.cards.find(c => c.id === cardId);
        if (card && card.column !== newColumn) {
            card.column = newColumn;
            this.saveCards();
            this.renderCards();
        }
    }

    addCard() {
        document.getElementById('cardModal').style.display = 'block';
        document.getElementById('cardTitle').focus();
    }

    hideModal() {
        document.getElementById('cardModal').style.display = 'none';
        this.clearForm();
    }

    saveCard(event) {
        event.preventDefault();
        
        const title = document.getElementById('cardTitle').value.trim();
        const description = document.getElementById('cardDescription').value.trim();
        const priority = document.getElementById('cardPriority').value;
        
        if (!title) return;
        
        const newCard = {
            id: Date.now(),
            title,
            description,
            priority,
            column: 'todo'
        };
        
        this.cards.push(newCard);
        this.saveCards();
        this.renderCards();
        this.hideModal();
    }

    deleteCard(cardId) {
        if (confirm('Are you sure you want to delete this card?')) {
            this.cards = this.cards.filter(card => card.id !== cardId);
            this.saveCards();
            this.renderCards();
        }
    }

    clearForm() {
        document.getElementById('cardTitle').value = '';
        document.getElementById('cardDescription').value = '';
        document.getElementById('cardPriority').value = 'low';
    }
}

const kanban = new KanbanBoard();

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.id === 'cardModal') {
        kanban.hideModal();
    }
});