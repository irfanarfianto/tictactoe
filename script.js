const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const winLine = document.getElementById('win-line');
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



function showWinLine(index) {
  const positions = [
    [0, '16.66%', 0],     // Horizontal Top
    [0, '50%', 0],        // Horizontal Middle
    [0, '83.33%', 0],     // Horizontal Bottom
    ['16.66%', 0, 90],    // Vertical Left
    ['50%', 0, 90],       // Vertical Middle
    ['83.33%', 0, 90],    // Vertical Right
    [0, 0, 45],           // Diagonal TL-BR
    [0, '100%', -45],     // Diagonal BL-TR
  ];

  const [left, top, rotate] = positions[index];
  winLine.style.left = typeof left === 'number' ? `${left}px` : left;
  winLine.style.top = typeof top === 'number' ? `${top}px` : top;
  winLine.style.transform = `rotate(${rotate}deg)`;
  winLine.style.width = '100%';
  winLine.style.opacity = 1;
}


function initializeGame() {
   board = ['', '', '', '', '', '', '', '', ''];
   currentPlayer = 'X';
   gameActive = true;
   gameStatus.textContent = `Giliran: ${currentPlayer}`;
   cells.forEach(cell => {
     cell.textContent = '';
     cell.classList.remove('x', 'o');
   });
 
   // ✅ Sembunyikan garis kemenangan
   winLine.style.width = '0';
   winLine.style.opacity = 0;
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
   let winningIndex = -1;
 
   for (let i = 0; i < winningConditions.length; i++) {
     const [a, b, c] = winningConditions[i];
     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
       winningIndex = i;
       break;
     }
   }
 
   if (winningIndex !== -1) {
     gameStatus.textContent = `Pemain ${currentPlayer} Menang! 🎉`;
     gameActive = false;
     showWinLine(winningIndex); // ✅ Tampilkan garis kemenangan
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


