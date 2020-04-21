var cols, rows;
var scl = 50;
var grid = [];
var searchMethod = '';
var prevSearchMethod = '';
var endNodeIndex;
var start;
var end;
let radio;
let solve = false;
let speed = 20;
let goal;
let agent;
let radius;
let barriers = [];
let xoff = 0;
let yoff = 10000;
let force;
let population = [];
let populationSize = 100;


function setup() {
  tf.setBackend('cpu');
  createCanvas(500, 500);
  force = createVector(0,0);
  frameRate(60);
  cols = floor(width / scl);
  rows = floor(height / scl);
  radius = scl/2 * 0.75;
  80
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      if (y == 0 && x == 0) {
        var cell = new Cell(x, y, 's');
      } else if (y == rows - 1 && x == cols - 1) {
        var cell = new Cell(x, y, 'f');
      } else {
        var cell = new Cell(x, y, 1);
      }

      grid.push(cell);

    }
  }

  endNodeIndex = cols * rows - 1;
  start = grid[0]
  end = grid[endNodeIndex];
  openSet.push(start);

  createP('');
  radio = createRadio();
  radio.option('Depth First Search');
  radio.option('Breadth First Search');
  radio.option('A* Search');
  radio.value('Depth First Search');
  createP("");
  var solveButton = createButton('Solve');
  var resetButton = createButton('Reset');
  var primmsButton = createButton('Generate A Maze');
  var invertButton = createButton('Invert Squares');
  solveButton.mousePressed(solveButtonPressed);
  resetButton.mousePressed(resetMaze);
  primmsButton.mousePressed(primms);
  invertButton.mousePressed(invert);
  // Create the agent in the centre of the start cell
  getBarriers();
  for (var i = 0; i < populationSize; i++){
    population[i] = new Agent(start.i + scl/2, start.j + scl/2);
  }

  for (agent of population){
    agent.createRays();
    agent.createNN();
  }

}




function draw() {
  background(51);
  // Draw the Grid
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // Solve the current grid using the selected search method
  if (solve) {
    radio.value(searchMethod);

    if (frameCount % (60 / speed) == 0) {
      switch (searchMethod) {
        case 'Depth First Search':
          dfsStep();
          break;
        case 'Breadth First Search':
          bfsStep();
          break;
        case 'A* Search':
          aStarStep();
          break;
      }
    }



  } else {
    searchMethod = radio.value();
  }

  // If the search method has changed, reset the search variables
  if (prevSearchMethod !== searchMethod) {
    for (var i = 0; i < grid.length; i++) {
      grid[i].resetSearch();
    }

    prevSearchMethod = searchMethod;
  }


  // AGENT RELATED

  //agent.move(noise(xoff) * width ,noise(yoff) * height);
  for (agent of population){
    agent.update();
    agent.show();
  }

}

function mousePressed() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].clicked();
  }
  getBarriers();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    force.set(-0.1,0);
  } else if (keyCode === RIGHT_ARROW) {
    force.set(0.1,0);
  } else if (keyCode === UP_ARROW) {
    force.set(0,-0.1);
  } else if (keyCode === DOWN_ARROW) {
    force.set(0,0.1);
  }
}

function keyReleased(){
  force.set(0,0);
}

function solveButtonPressed() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].resetSearch();
  }
  solve = true;
}

function invert() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].fliptile();
  }
  getBarriers();
}


function resetMaze() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].resetTiles();
  }

  endNodeIndex = cols * rows - 1;
  dfsReset();
  bfsReset();
  aStarReset();
  solve = false;
  mazeGenerated = false;
  getBarriers();
}

function getBarriers(){
  barriers = [];
  barriers.push(new Barrier(0, 0, width, 0));
  barriers.push(new Barrier(width, 0, width, height));
  barriers.push(new Barrier(width, height, 0, height));
  barriers.push(new Barrier(0, height, 0, 0));
  for (cell of grid){
    if (cell.state == 1){

      for (var i = 0; i < 4; i++){
        let cellWall = i + 1;

        switch (cellWall) {
          case 1:
            barriers.push(new Barrier(cell.x,cell.y,cell.p,cell.y));
            break;
          case 2:
            barriers.push(new Barrier(cell.p,cell.y,cell.p,cell.q));
            break;
          case 3:
            barriers.push(new Barrier(cell.p,cell.q,cell.x,cell.q));
            break;
          case 4:
            barriers.push(new Barrier(cell.x,cell.q,cell.x,cell.y));
            break;
        }
      }
    }
  }

  return barriers;
}
