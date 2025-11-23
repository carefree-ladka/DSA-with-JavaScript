class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.vsComputer = false;
        this.score = { X: 0, O: 0, draw: 0 };
        this.difficulty = 'medium';
        this.init();
    }

    init() {
        this.createBoard();
        this.updateDisplay();
        this.loadScore();
    }

    createBoard() {
        const board = document.getElementById('gameBoard');
        board.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('button');
            cell.className = 'cell';
            cell.onclick = () => this.makeMove(i);
            board.appendChild(cell);
        }
    }

    makeMove(index) {
        if (!this.gameActive || this.board[index]) return;
        
        this.board[index] = this.currentPlayer;
        this.updateBoard();
        
        if (this.checkWinner()) {
            this.endGame(this.currentPlayer);
            return;
        }
        
        if (this.board.every(cell => cell)) {
            this.endGame('draw');
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
        
        if (this.vsComputer && this.currentPlayer === 'O' && this.gameActive) {
            setTimeout(() => this.computerMove(), 500);
        }
    }

    computerMove() {
        if (!this.gameActive) return;
        
        document.querySelector('.game-container').classList.add('thinking');
        
        let move;
        switch (this.difficulty) {
            case 'easy':
                move = this.getRandomMove();
                break;
            case 'medium':
                move = Math.random() < 0.7 ? this.getBestMove() : this.getRandomMove();
                break;
            case 'hard':
                move = this.getBestMove();
                break;
        }
        
        setTimeout(() => {
            document.querySelector('.game-container').classList.remove('thinking');
            this.makeMove(move);
        }, 300);
    }

    getRandomMove() {
        const availableMoves = this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(val => val !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    getBestMove() {
        // Check for winning move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWinner() === 'O') {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // Block player's winning move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWinner() === 'X') {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // Take center if available
        if (this.board[4] === '') return 4;
        
        // Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => this.board[i] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Take any available move
        return this.getRandomMove();
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(pattern);
                return this.board[a];
            }
        }
        return null;
    }

    highlightWinningCells(pattern) {
        const cells = document.querySelectorAll('.cell');
        pattern.forEach(index => {
            cells[index].classList.add('winning');
        });
    }

    endGame(result) {
        this.gameActive = false;
        const status = document.getElementById('gameStatus');
        
        if (result === 'draw') {
            status.textContent = "It's a draw!";
            status.className = 'game-status draw';
            this.score.draw++;
        } else {
            status.textContent = `Player ${result} wins!`;
            status.className = 'game-status winner';
            this.score[result]++;
        }
        
        this.updateScore();
        this.saveScore();
    }

    updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            cell.className = `cell ${this.board[index].toLowerCase()}`;
        });
    }

    updateDisplay() {
        document.getElementById('currentPlayer').textContent = this.currentPlayer;
        document.getElementById('gameStatus').textContent = '';
        document.getElementById('gameStatus').className = 'game-status';
    }

    updateScore() {
        document.getElementById('scoreX').textContent = this.score.X;
        document.getElementById('scoreO').textContent = this.score.O;
        document.getElementById('scoreDraw').textContent = this.score.draw;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.createBoard();
        this.updateDisplay();
    }

    resetScore() {
        this.score = { X: 0, O: 0, draw: 0 };
        this.updateScore();
        this.saveScore();
    }

    toggleMode() {
        this.vsComputer = !this.vsComputer;
        const btn = document.getElementById('modeBtn');
        const difficultyPanel = document.getElementById('difficultyPanel');
        
        if (this.vsComputer) {
            btn.textContent = 'vs Human';
            difficultyPanel.style.display = 'block';
        } else {
            btn.textContent = 'vs Computer';
            difficultyPanel.style.display = 'none';
        }
        
        this.resetGame();
        
        // Setup difficulty change listener
        document.getElementById('difficulty').onchange = (e) => {
            this.difficulty = e.target.value;
        };
    }

    saveScore() {
        localStorage.setItem('ticTacToeScore', JSON.stringify(this.score));
    }

    loadScore() {
        const saved = localStorage.getItem('ticTacToeScore');
        if (saved) {
            this.score = JSON.parse(saved);
            this.updateScore();
        }
    }
}

// Initialize game
const game = new TicTacToe();