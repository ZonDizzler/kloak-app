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

//Piece properties
const colorMap = {
  b: "blue",
  p: "pink",
  y: "yellow",
  o: "orange",
  g: "green",
};

gameStart();

/*==========Game functions==========*/
function gameStart() {
  initializeKloak();
}

function initializeKloak() {
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

} //end initializeKloak

let selectedKloak = null;

function handleKloakClick(kloak, index) {

  //clear the valid moves for the previous selected kloak, and deselect the previous selected kloak
  if (selectedKloak) {
    clearValidMoves();
    selectedKloak.classList.remove('selected-kloak');
  }

  selectedKloak = kloak;
  selectedKloak.classList.add('selected-kloak');
  showValidMoves(index);

}

//Undisplays valid moves
function clearValidMoves() {
  const validMoves = gameBoard.querySelectorAll('.valid-square');
  validMoves.forEach(validMove => {
    validMove.classList.remove('valid-square');
  });
}

//Displays valid moves for a kloak from a particular index
function showValidMoves(index) {

  //diagonal up-left
  if (validKloakMove(up(left(index)))) {
    gameBoard.children[up(left(index))].classList.add('valid-square');
  }

  //up
  if (validKloakMove(up(index))) {
    gameBoard.children[up(index)].classList.add('valid-square');
  }

  //diagonal up-right
  if (validKloakMove(up(right(index)))) {
    gameBoard.children[up(right(index))].classList.add('valid-square');
  }

  //right
  if (validKloakMove(right(index))) {
    gameBoard.children[right(index)].classList.add('valid-square');
  }

  //diagonal down-right
  if (validKloakMove(down(right(index)))) {
    gameBoard.children[down(right(index))].classList.add('valid-square');
  }

  //down
  if (validKloakMove(down(index))) {
    gameBoard.children[down(index)].classList.add('valid-square');
  }

  //diagonal down-left
  if (validKloakMove(down(left(index)))) {
    gameBoard.children[down(left(index))].classList.add('valid-square');
  }

  //left
  if (validKloakMove(left(index))) {
    gameBoard.children[left(index)].classList.add('valid-square');
  }



}

//returns true if the index is a valid kloak move
function validKloakMove(index) {

  if (validateIndex(index)) {
    //A move is invalid if a square already contains a kloak
    if (gameBoard.children[index].querySelector(".kloak")) {
      return false;
    }
    return true;
  }
  return false;
}

//Remove all pieces and kloaks on the gameBoard
function clearBoard() {
  for (var index = 0; index < 25; index++) {
    const square = gameBoard.children[index];
    // Remove all the child elements of the square
    while (square.firstChild) {
      square.removeChild(square.firstChild);
    }
  }
}


function resetGame() {
  clearValidMoves();
  clearBoard();
  initializeKloak();
}

//Places a kloak on a square if there is no kloak on that square
function placeKloak(index) {

  const square = gameBoard.children[index];
  //place a kloak if there is no kloak
  if (square.querySelector(".kloak")) {
    //do nothing
  } else {
    //hide the colored piece before placing the kloak
    if (square.querySelector(".piece")) {
      square.children[0].hidden = true;
    }
    else {
      //Place a placeholder element in index 0 if there is no colored piece
      let placeholder = document.createElement("div");
      placeholder.classList.add('placeholder');

      square.appendChild(placeholder);

    }

    //place a kloak in the square
    let kloak = document.createElement("div");
    kloak.classList.add('kloak');
    square.appendChild(kloak);

    kloak.addEventListener('click', () => {

      handleKloakClick(kloak, index);
    });
  }

};

//Removes a kloak
function removeKloak(square) {

  //Unhides a piece if it is under the kloak
  if (square.children[0].className === 'piece') {
    square.children[0].hidden = false;
  }
  square.children[1].remove();
};

/*==========Utility functions==========*/

function popRandomElement(array) {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * array.length);

  // Remove and return the element at the random index
  return array.splice(randomIndex, 1)[0];
}

/*===========Movement functions==========*/

function validateIndex(index) {
  return (index > -1 && index < 25);
}

function down(index) {
  //Can't move down on the bottom row
  if (validateIndex(index) && index > 19) {
    return -1;
  }

  return index + 5;
}
function up(index) {
  //Can't move up on the top row
  if (validateIndex(index) && index < 5) {
    return -1;
  }
  return index - 5;
}

function left(index) {
  //Can't move left on the leftmost column
  if (validateIndex(index) && index % 5 == 0) {
    return -1;
  }
  return index - 1;
}

function right(index) {
  //Can't move left on the rightmost column
  if (validateIndex(index) && index % 5 == 4) {
    return -1;
  }
  return index + 1;
}