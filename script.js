/*==========Global Variables==========*/

//Components
const gameBoard = document.querySelector("#gameBoard");
const resetBtn = document.querySelector("#resetBtn")
resetBtn.addEventListener("click", resetGame);

// Select all divs with the class "square"
const squares = document.querySelectorAll('.square');

// Add a click event listener to each square
squares.forEach((square) => {
  square.addEventListener('click', () => {
    if (square.querySelector(".kloak")) {
      console.log('removing kloak');
      removeKloak(square);
    } else {
      console.log('placing kloak');
      placeKloak(square);
    }
    console.log(square);




  });
});


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

  for (var index = 0; index < 25; index++) {
    const square = gameBoard.children[index];


    // Place Kloaks on the first and last two rows
    if (index < 5 || index > 19) {

      //Place a placeholder element in index 0
      let placeholder = document.createElement("div");
      placeholder.classList.add('placeholder');
      square.appendChild(placeholder);

      //Place a kloak in index 1
      let kloak = document.createElement("div");
      kloak.classList.add('kloak');
      square.appendChild(kloak);

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

//Remove all pieces and kloaks on the gameBoard
function clearBoard() {

  for (var index = 0; index < 25; index++) {
    const parent = gameBoard.children[index];
    parent.removeChild(parent.firstChild);
  }

}

function resetGame() {
  clearBoard();
  initializeKloak();
}

//Places a kloak on a square if there is no kloak on that square
function placeKloak(square) {
  //place a kloak if there is no kloak
  if (square.querySelector(".kloak")) {
    //do nothing
  } else {
    //hide the colored piece before placing the kloak
    if (square.querySelector(".piece")) {
      square.children[0].hidden = true;
    }

    //place a kloak in the square
    let kloak = document.createElement("div");
    kloak.classList.add('kloak');
    square.appendChild(kloak);
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

function down(index) {
  //Can't move down on the bottom row
  if (index > 19) {
    return -1;
  }

  return index + 5;
}
function up(index) {
  //Can't move up on the top row
  if (index < 5) {
    return -1;
  }
  return index - 5;
}

function left(index) {
  //Can't move left on the left row
  if (index % 5 == 0) {
    return -1;
  }
  return
}

function left(index) {
  //Can't move left on the left row
  if ((index + 4) % 5 == 0) {
    return -1;
  }
  return
}



