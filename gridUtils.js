/*
This file is to store functions for managing indices of the grid
*/

//returns the next index for moving to a adjacent square in a 2d grid. 
export function getNextIndex(index, direction, height, width) {

  //offsets in the gameBoard to provide movement
  const moves = {
    up: -width,
    down: width,
    left: -1,
    right: 1,
    upLeft: -width - 1,
    upRight: -width + 1,
    downLeft: width - 1,
    downRight: width + 1
  };

  const nextIndex = index + moves[direction];
  // first column
  if (direction.toLowerCase().includes("left") && index % width === 0) return null;

  // last column
  if (direction.toLowerCase().includes("right") && index % width === width - 1) return null;

  // first row
  if (direction.toLowerCase().includes("up") && index < width) return null;

  // last row
  if (direction.toLowerCase().includes("down") && index >= width * (height - 1)) return null;

  return nextIndex;
}