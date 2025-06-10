const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initializeGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  gameStatus.textContent = `Giliran: ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);
  if (board[clickedCellIndex] !== '' || !gameActive) return;

  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  checkGameResult();
}

function checkGameResult() {
  let roundWon = winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });

  if (roundWon) {
    gameStatus.textContent = `Pemain ${currentPlayer} Menang! 🎉`;
    gameActive = false;
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    return;
  }

  if (!board.includes('')) {
    gameStatus.textContent = 'Permainan Seri! 🤝';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Giliran: ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', initializeGame);
initializeGame();
