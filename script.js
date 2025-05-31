// Get DOM Elements
const statusDisplay = document.getElementById('status-display');
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell'); // Selects all elements with class 'cell'
const resetButton = document.getElementById('reset-button');

// Game State Variables
let currentPlayer = 'X'; // Start with Player X
let gameActive = true; // True while the game is ongoing
// Array to represent the board: 0-8 for each cell, initially empty strings
// 'X' or 'O' will fill these when a move is made
let board = ['', '', '', '', '', '', '', '', ''];

// Winning Conditions
// These are all possible ways to win (rows, columns, diagonals)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Update Status Message Function
function updateStatus(message) {
    statusDisplay.textContent = message;
}

// Handle Cell Click Function
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex); // Get the index from data attribute

    // Check if the game is active AND the cell is empty
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return; // Do nothing if cell is already filled or game is over
    }

    // Update the board array
    board[clickedCellIndex] = currentPlayer;
    // Update the HTML cell visually
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class for styling
    clickedCell.classList.add('filled'); // Add 'filled' class to prevent re-clicking

    // Check for win or tie
    checkGameResult();

    // Switch to the next player if game is still active
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`Player ${currentPlayer}'s Turn`);
    }
}

// Check Game Result Function (Win or Tie)
function checkGameResult() {
    let roundWon = false;

    // Loop through all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        let a = board[condition[0]];
        let b = board[condition[1]];
        let c = board[condition[2]];

        // If any cell in the condition is empty, skip this condition
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // If all three cells match the current player, they win!
        if (a === b && b === c) {
            roundWon = true;
            break; // No need to check other conditions
        }
    }

    if (roundWon) {
        updateStatus(`Player ${currentPlayer} Wins!`);
        gameActive = false; // End the game
        return;
    }

    // Check for a tie (if no win and all cells are filled)
    // `!board.includes('')` means there are no empty strings left in the board array
    if (!board.includes('')) {
        updateStatus("It's a Tie!");
        gameActive = false;
        return;
    }
}

// Reset Game Function
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', '']; // Reset board array

    updateStatus(`Player ${currentPlayer}'s Turn`);

    // Clear all cells visually
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'filled'); // Remove player classes and filled class
    });
}

// Event Listeners
// Add click listener to each cell
cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

// Add click listener to the reset button
resetButton.addEventListener('click', resetGame);

// Initial status message
updateStatus(`Player ${currentPlayer}'s Turn`);