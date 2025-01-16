//Removes a kloak
export function removeKloak(square) {
  //Unhides a piece if it is under the kloak
  if (square.children[0].className === 'piece') {
    square.children[0].hidden = false;
  }
  square.children[1].remove();
};

//returns true if the index is a valid kloak move
export function validKloakMove(square) {
  //A move is invalid if a square already contains a kloak
  if (square.querySelector(".kloak")) {
    return false;
  }
  return true;
}