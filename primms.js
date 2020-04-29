/*
  Created a random maze using Primms maze-generation algorithm
*/

let walls = [];
let wall;
let lastCell;

function primms() {
  resetButtonPressed();
  startIndex = 0;

  for (i = 0; i < getWalls(startIndex).length; i++) {
    walls.push(getWalls(startIndex)[i]);
  }

  // Randomly break walls in the maze to create a continous path from start to goal
  while (walls.length > 0) {
    wall = popRandom(walls);

    if (adjacent(wall).length == 1) {
      grid[wall].state = 0;
      lastCell = wall;

      for (i = 0; i < getWalls(wall).length; i++) {
        walls.push(getWalls(wall)[i]);
      }
    }

  }
  // Move the goal to the last square created in the maze
  console.log('maze generated');
  grid[wall].state = 'f';
  endNodeIndex = wall;
  end = grid[endNodeIndex];
  grid[grid.length-1].state = 1;
}


// Custom function to pop a random element from an array
const popRandom = arr => {
  return arr.splice(floor(random(arr.length)), 1);
}
