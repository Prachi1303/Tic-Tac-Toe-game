
const boxes = document.querySelectorAll('.boxes');
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');
const popup = document.querySelector('.popup');

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';


let gameOver = false;


function BoxClick(index) {
  if (gameState[index] === '' && !gameOver) {
    gameState[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;

    if (checkWin()) {
      endGame(false);
    } else if (checkDraw()) {
      endGame(true);
    } else {
      
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return true;
    }
  }

  return false;
}


function checkDraw() {
  return !gameState.includes('');
}


function endGame(draw) {
  if (draw) {
    messageElement.innerText = 'It\'s a draw!';
  } else {
    messageElement.innerText = `Player ${currentPlayer} wins!`;
  }

  popup.classList.remove('hide');
  gameOver = true;
}


function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];

  boxes.forEach((box) => {
    box.innerText = '';
  });

  currentPlayer = 'X';
  gameOver = false;

  
  popup.classList.add('hide');
}


boxes.forEach((box, index) => {
  box.addEventListener('click', () => BoxClick(index));
});


restartButton.addEventListener('click', restartGame);


const newGameButton = document.getElementById('new_game');
function startNewGame() {
    location.reload();
  }
  
newGameButton.addEventListener('click', startNewGame);
