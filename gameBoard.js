import { getNextIndex } from './gridUtils.js';
import { validKloakMove, removeKloak } from './square.js';

//Piece properties
const colorMap = {
  b: "blue",
  p: "pink",
  y: "yellow",
  o: "orange",
  g: "green",
};

export function resetBoard(gameBoard) {
  clearValidMoves();
  clearBoard();
  initializeKloak(gameBoard);
}

//places pieces on the board
export function initializeKloak(gameBoard) {
  // Each element represents a color piece to place on the board
  const colorPieces = ["b", "b", "b", "p", "p", "p", "y", "y", "y", "o", "o", "o", "g", "g", "g"];

  for (let index = 0; index < 25; index++) {
    const square = gameBoard.children[index];

    // Place Kloaks on the first and last two rows
    if (index < 5 || index > 19) {
      placeKloak(index);
    }
    // Place pieces with random colors on the middle three rows
    else {
      const randomColor = colorMap[popRandomElement(colorPieces)];
      let piece = document.createElement("div");
      piece.classList.add('piece');
      piece.style.backgroundColor = randomColor;
      square.appendChild(piece);
    }
  }

  function popRandomElement(array) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * array.length);
    // Remove and return the element at the random index
    return array.splice(randomIndex, 1)[0];
  } //end popRandomElement

} //end initializeKloak

let selectedKloak = null;
function handleKloakClick(kloak, index) {


  //clear the valid moves for the previous selected kloak, and deselect the previous selected kloak
  if (selectedKloak) {
    deselectKloak(kloak, index);
  }

  //update the selected kloak to the newly selected kloak
  selectedKloak = kloak;
  selectedKloak.classList.add('selected-kloak');

  //show the valid moves for the newly selected kloak
  showValidMoves(index);

}

function deselectKloak(index) {
  clearValidMoves();
  selectedKloak.classList.remove('selected-kloak');
  const validSquare = gameBoard.children[index];
}

//Undisplays valid moves for a deselected kloak
function clearValidMoves() {
  const validMoves = gameBoard.querySelectorAll('.valid-square');
  validMoves.forEach(validMove => {
    validMove.removeEventListener('click', validMove._clickHandler);
    validMove.classList.remove('valid-square');
  });
}

//Displays valid moves for a kloak at a particular index
function showValidMoves(index) {
  const directions = [
    "up", "down", "left", "right",
    "upLeft", "upRight", "downLeft", "downRight"
  ];

  directions.forEach(direction => {
    const nextIndex = getNextIndex(index, direction, 5, 5);
    if (nextIndex !== null && validKloakMove(gameBoard.children[nextIndex])) {

      let originSquare = gameBoard.children[index];
      let validSquare = gameBoard.children[nextIndex];

      // Store the click handler function
      validSquare._clickHandler = () => moveKloak(index, nextIndex);

      validSquare.addEventListener('click', validSquare._clickHandler);

      gameBoard.children[nextIndex].classList.add('valid-square');
    }
  });
}

function moveKloak(originIndex, destIndex) {
  deselectKloak(originIndex)

  const originSquare = gameBoard.children[originIndex];

  removeKloak(originSquare);
  placeKloak(destIndex);
}

//Remove all pieces and kloaks on the gameBoard
function clearBoard() {
  for (let index = 0; index < 25; index++) {
    const square = gameBoard.children[index];
    // Remove all the child elements of the square
    while (square.firstChild) {
      square.removeChild(square.firstChild);
    }
  }
}

//Places a kloak on a square if there is no kloak on that square
function placeKloak(index) {
  const square = gameBoard.children[index];

  //place a kloak if there is no kloak, otherwise do nothing
  if (square.querySelector(".kloak")) {
    //do nothing
  } else {
    //hide the colored piece before placing the kloak in the square
    if (square.querySelector(".piece")) {
      square.children[0].hidden = true;
    }
    else {
      //Place a placeholder element in index 0 if there is no colored piece
      const placeholder = document.createElement("div");
      placeholder.classList.add('placeholder');
      square.appendChild(placeholder);
    }

    //place a kloak in the square
    const kloak = document.createElement("div");
    kloak.classList.add('kloak');
    square.appendChild(kloak);
    kloak.addEventListener('click', () => {
      handleKloakClick(kloak, index);
    });
  }
};