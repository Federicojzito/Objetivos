// CONSTANTS

const X_CLASS = 'X';
      CIRCLE_CLASS = 'O';
      STATUS_DISPLAY = document.querySelector('.game-notification'),
GAME_STATE = ['','','','','','','','',''],
WINNINGS = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
],
WIN_MESSAGE = () => `This Player ${currentPlayer} has won!`,
DRAW_MESSAGE = () => `The Game ended in a draw!`,
CURRENT_PLAYER_TURN = () => `Player turn ${currentPlayer}`;


// VARIABLES

let gameActive = true,
    currentPlayer = CIRCLE_CLASS;

// FUNCTIONS

//StartGame
function startGame() {
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    listeners();
  }

// addEventListeners
  function listeners() {
    document.querySelector('.game-container').addEventListener('click', handleCellClick);
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
  }

// handleStatusDisplay show current game result
  function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message;
  }

//handleRestartGame Restart Game
  function handleRestartGame() {
    gameActive = true;
    currentPlayer = X_CLASS;
    restartGameState();
    handleStatusDisplay(CURRENT_PLAYER_TURN());
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "");
  }
  
// handleCellClick Event Click
  function handleCellClick(clickedCellEvent /** Type Event **/) {
    const clickedCell = clickedCellEvent.target;
    //IF clickedCell Know which cell you clicked on
    if (clickedCell.classList.contains('game-cell')) {
      //Array.from call all children of parent's clickedCell, cast them to array.
      const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
      if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
        return false
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    }
  }
  //handleCellPlayed pass it clickedCell and its Index
  function handleCellPlayed(clickedCell, clickedCellIndex) {
      // Add in the corresponding position the value either "X" or "O" in the current state of the game
    GAME_STATE[clickedCellIndex] = currentPlayer;   
    // Add the player's value to the HTML
    clickedCell.innerHTML = currentPlayer;
  }
  
  //handleResultValidation Checking if any player won, lost or tied
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < WINNINGS.length; i++) {  
    // Iterate each of the possible winning combinations
      const winCondition = WINNINGS[i];
    // Save the combination for example: [0, 1, 2]
      let position1 = GAME_STATE[winCondition[0]],
        position2 = GAME_STATE[winCondition[1]],
        position3 = GAME_STATE[winCondition[2]]    
    // Stores the value of the current state of the game according to the positions of winCondition
  
      if (position1 === '' || position2 === '' || position3 === '') {
        continue; // If there is any empty value no one has won yet
      }
      if (position1 === position2 && position2 === position3) {
        roundWon = true // If all the positions match then, that player has won the game
        break;
      }
    }
  
    if (roundWon) {
      handleStatusDisplay(WIN_MESSAGE());
      gameActive = false;
      return;
    }
  
    //roundDraw check if there is any empty position
    let roundDraw = !GAME_STATE.includes("") ;// If all cells have value and the previous statement was false then it is a tie
    if (roundDraw) {
      handleStatusDisplay(DRAW_MESSAGE());
      gameActive = false;
      return;
    }
  
    handlePlayerChange();
  }
  
  function handlePlayerChange() {
    currentPlayer = currentPlayer === X_CLASS ? CIRCLE_CLASS : X_CLASS;
    handleStatusDisplay(CURRENT_PLAYER_TURN());
  }
  
  function restartGameState() {
    let i = GAME_STATE.length;
    while (i--) {
      GAME_STATE[i] = ''
    }
  }

//CallBack startGame 
  startGame();
