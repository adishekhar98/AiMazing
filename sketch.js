let cols, rows;
let scl = 50;
let grid = [];
let searchMethod = '';
let prevSearchMethod = '';
let endNodeIndex;
let start;
let end;
let radio;
let solve = false;
let solutionFound = false;
let noSolution = false; 
let stepsTaken = 0;
let shortestPathLen = 0;
let showSolveMetrics = false;
let speed = 20;
let goal;
let population;
let populationCreated;
let cycles;
let speedSlider;
let select;
let barriers = [];


/*


MAZE AI RELATED

*/

let stepCount = 60;
let generation = 0
let averageFitness = 0;
let goalReached = false;
let agent_Radius
let agent_lifespan = 500;
const MUTATION_RATE = 0.001;
const MAX_SPEED = 10;
//const POPULATION_SIZE = 500;
const POPULATION_SIZE = 500;
/*
*/

function setup() {
  frameRate(60);
  createCanvas(500, 500);
  createGrid();
  createInterface();
}




function draw() {
  background(51);
  // Get the speed value from the slider
  parseSpeedValue();

  // If solve is true, run the selected solve on the grid
  doSolveStep();

  // If the search method has changed, reset the search variables
  checkSearchMethod();

  // If a population has been created, run the steps to update it
  doPopulationStep();

  // Draw the Grid
  for (cell of grid) {
    cell.show();
  }

  // If a population is created, draw the agents and the text
  if (populationCreated){
    population.show();
    drawTextGA();
  }

  if(showSolveMetrics){
    drawTextSolve();
  }
}



function mousePressed() {
  for (cell of grid) {
    cell.clicked();
  }
}






function invert() {
  for (cell of grid) {
    cell.fliptile();
  }
}


function resetButtonPressed() {
  showSolveMetrics = false;
  for (cell of grid) {
    cell.resetTiles();
  }

  endNodeIndex = cols * rows - 1;
  end = grid[endNodeIndex];
  dfsReset();
  bfsReset();
  aStarReset();
  resetGA();
  solve = false;
  mazeGenerated = false;
}



function checkSearchMethod(){
  if (prevSearchMethod !== searchMethod) {
    for (var i = 0; i < grid.length; i++) {
      grid[i].resetSearch();
      dfsReset();
      bfsReset();
      aStarReset();
      resetGA();
    }
    prevSearchMethod = searchMethod;
  }
}
