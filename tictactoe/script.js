document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const tieSound = document.getElementById('tieSound');

    const handleCellClick = (index) => {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            clickSound.play();
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (gameActive && currentPlayer === 'O') {
                setTimeout(makeAiMove, 500); // Delay AI move for better user experience
            }
        }
    };

    const makeAiMove = () => {
        const availableMoves = gameBoard.reduce((acc, cell, index) => (cell === '' ? [...acc, index] : acc), []);
    
        // Check for winning moves
        let winningMove = findWinningMove('O');
        if (winningMove !== null) {
            gameBoard[winningMove] = 'O';
        } else {
            // Check for blocking moves
            let blockingMove = findWinningMove('X');
            if (blockingMove !== null) {
                gameBoard[blockingMove] = 'O';
            } else {
                // If no winning or blocking move, choose a random move
                let aiMove;
                do {
                    aiMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                } while (gameBoard[aiMove] !== ''); // Keep choosing until an empty spot is found
                gameBoard[aiMove] = 'O';
            }
        }
    
        renderBoard();
        clickSound.play();
        checkWinner();
        currentPlayer = 'X';
    };
    
    
    
    
    
    
    
    const findWinningMove = (symbol) => {
        // Check for a winning move in rows, columns, and diagonals
        for (let i = 0; i < 3; i++) {
            // Check rows and columns
            if ((gameBoard[i * 3] === symbol && gameBoard[i * 3 + 1] === symbol && gameBoard[i * 3 + 2] === '') ||
                (gameBoard[i] === symbol && gameBoard[i + 3] === symbol && gameBoard[i + 6] === '')) {
                return i * 3 + (gameBoard[i * 3 + 2] === '' ? 2 : 0);
            }
    
            // Check diagonals
            if ((gameBoard[0] === symbol && gameBoard[4] === symbol && gameBoard[8] === '') ||
                (gameBoard[2] === symbol && gameBoard[4] === symbol && gameBoard[6] === '')) {
                return gameBoard[8] === '' ? 8 : 0;
            }
        }
    
        return null; // No winning move found
    };
    
    
    
    
    const findBestStrategicMove = (symbol, opponentSymbol, moves) => {
        // Sort the available moves by strategic importance
        const sortedMoves = moves.sort((a, b) => {
            return getMoveImportance(b, symbol, opponentSymbol) - getMoveImportance(a, symbol, opponentSymbol);
        });
    
        return sortedMoves[0]; // Return the move with the highest strategic importance
    };
    
    const getMoveImportance = (move, symbol, opponentSymbol) => {
        // Calculate the strategic importance of a move
        let importance = 0;
    
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            const row = [i * 3, i * 3 + 1, i * 3 + 2];
            const col = [i, i + 3, i + 6];
    
            if (row.includes(move) && row.every((index) => gameBoard[index] === symbol)) {
                importance += 2; // Winning row
            }
    
            if (col.includes(move) && col.every((index) => gameBoard[index] === symbol)) {
                importance += 2; // Winning column
            }
    
            if (row.includes(move) && row.some((index) => gameBoard[index] === opponentSymbol)) {
                importance += 1; // Blocking opponent's row
            }
    
            if (col.includes(move) && col.some((index) => gameBoard[index] === opponentSymbol)) {
                importance += 1; // Blocking opponent's column
            }
        }
    
        // Check diagonals
        const diagonal1 = [0, 4, 8];
        const diagonal2 = [2, 4, 6];
    
        if (diagonal1.includes(move) && diagonal1.every((index) => gameBoard[index] === symbol)) {
            importance += 2; // Winning diagonal
        }
    
        if (diagonal2.includes(move) && diagonal2.every((index) => gameBoard[index] === symbol)) {
            importance += 2; // Winning diagonal
        }
    
        if (diagonal1.includes(move) && diagonal1.some((index) => gameBoard[index] === opponentSymbol)) {
            importance += 1; // Blocking opponent's diagonal
        }
    
        if (diagonal2.includes(move) && diagonal2.some((index) => gameBoard[index] === opponentSymbol)) {
            importance += 1; // Blocking opponent's diagonal
        }
    
        return importance;
    };
    

    const renderBoard = () => {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundImage = value !== '' ? `url('${value}.png')` : '';
            cell.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cell);
        });
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                gameActive = false;
                winSound.play();
                result.textContent = `${gameBoard[a]} a gagné!`;
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            tieSound.play();
            result.textContent = "C'est une égalité!";
        }
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        result.textContent = '';

        renderBoard();
    };

    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetGame);

    renderBoard();
});
