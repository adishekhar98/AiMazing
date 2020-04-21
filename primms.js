let walls = [];
let wall;
let lastCell;

function primms() {
  resetMaze();
  startIndex = 0;

  for (i = 0; i < getWalls(startIndex).length; i++) {
    walls.push(getWalls(startIndex)[i]);
  }


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
  console.log('maze generated');
  grid[wall].state = 'f';
  endNodeIndex = wall;
  end = grid[endNodeIndex];
  grid[grid.length-1].state = 1;
}



const popRandom = arr => {
  return arr.splice(floor(random(arr.length)), 1);
}
