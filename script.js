import { getNextIndex } from './gridUtils.js';
import { initializeKloak, resetBoard } from './gameBoard.js';

/*==========Global Variables==========*/

//Components
const gameBoard = document.querySelector("#gameBoard");
const resetBtn = document.querySelector("#resetBtn")
resetBtn.addEventListener("click", resetGame);

// Select all divs with the class "square"
const squares = document.querySelectorAll('.square');

// Add a click event listener to each square

/*
squares.forEach((square) => {
  square.addEventListener('click', () => {
    if (square.querySelector(".kloak")) {
      //console.log('removing kloak');
      //removeKloak(square);
    } else {
      console.log('placing kloak');
      placeKloak(square);
    }
  });
});
*/

gameStart();

/*==========Game functions==========*/
function gameStart() {
  initializeKloak(gameBoard);
}

function resetGame() {
  resetBoard(gameBoard);

}