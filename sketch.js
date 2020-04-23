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
let barriers = [];
let xoff = 0;
let yoff = 10000;
let force;
let population;
let populationCreated;
let agent_Radius
let agent_lifespan = 500;
let testAg;


/*


MAZE AI RELATED

*/

let stepCount = 60;
let generation = 0
const MUTATION_RATE = 0.001;
const MAX_SPEED = 10;
const POPULATION_SIZE = 500;
/*
*/

function setup() {
  createCanvas(500, 500);
  frameRate(60);

  cols = floor(width / scl);
  rows = floor(height / scl);
  agent_radius = scl/2 * 0.2;

  createGrid();


  endNodeIndex = cols * rows - 1;
  start = grid[0]
  end = grid[endNodeIndex];
  openSet.push(start);


  createInterface();

}




function draw() {
  background(51);
  // Draw the Grid
  for (cell of grid) {
    cell.show();
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
  if (populationCreated){
    if (population.allAgentsDead()){
      population.naturalSelection();
      population.mutate();
    }

    population.update();
    population.show();
  }

}



function mousePressed() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].clicked();
  }
}

function keyPressed(){
  if (key=== ' '){
    for (agent of population){
      if (agent.debug){
        agent.debug = false;
      }
    }

    population[floor(random(population.length))].debug = true;

  }
}

function createInterface(){
  createP('');
  radio = createRadio();
  radio.option('Depth First Search');
  radio.option('Breadth First Search');
  radio.option('A* Search');
  radio.option('NeuroEvolution Agent');
  radio.value('Depth First Search');
  createP("");
  var solveButton = createButton('Solve');
  var resetButton = createButton('Reset');
  var primmsButton = createButton('Generate A Maze');
  var invertButton = createButton('Invert Squares');
  solveButton.mousePressed(solveButtonPressed);
  resetButton.mousePressed(resetButtonPressed);
  primmsButton.mousePressed(primms);
  invertButton.mousePressed(invert);
}

function solveButtonPressed() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].resetSearch();
  }
  if (searchMethod == 'NeuroEvolution Agent'){
    nnSolve();
  } else {
    solve = true;
  }
}

function nnSolve(){
  population = new Population(POPULATION_SIZE);
  populationCreated = true;
}

function resetNN(){
  populationCreated=false;
  population = [];
}

function invert() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].fliptile();
  }
}


function resetButtonPressed() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].resetTiles();
  }

  endNodeIndex = cols * rows - 1;
  dfsReset();
  bfsReset();
  aStarReset();
  solve = false;
  mazeGenerated = false;
}

function createGrid(){
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
}
