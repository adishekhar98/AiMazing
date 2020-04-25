var cols, rows;
var scl = 50;
var grid = [];
var searchMethod = '';
var prevSearchMethod = '';
let prevSelectValue = 'medium';
var endNodeIndex;
var start;
var end;
let radio;
let solve = false;
let speed = 20;
let goal;
let population;
let populationCreated;
let agent_Radius
let agent_lifespan = 500;
let testAg;
let cycles;
let speedSlider;
let select;


/*


MAZE AI RELATED

*/

let stepCount = 60;
let generation = 0
let averageFitness = 0;
let goalReached = false;
const MUTATION_RATE = 0.001;
const MAX_SPEED = 10;
const POPULATION_SIZE = 500;
/*
*/

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  createGrid();
  createInterface();

}




function draw() {
  background(51);

  cycles = speedSlider.value();
  if (speedSlider.value() <= 10){
    speed = 5;
  } else if (speedSlider.value() <= 20) {
    speed = 10;
  } else if (speedSlider.value() <= 30) {
    speed = 15;
  } else if (speedSlider.value() <= 40) {
    speed = 20;
  } else if (speedSlider.value() <= 50) {
    speed = 30;
  } else if (speedSlider.value() <= 60) {
    speed = 60;
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
        case 'Best First Search':
          bStarStep();
          break;
      }
    }
  } else {
    searchMethod = radio.value();
  }

  // If the search method has changed, reset the search variables
  checkSearchMethod();

  for (let n = 0; n < cycles; n++){
    if (populationCreated){
      if (population.allAgentsDead()){
        population.naturalSelection();
        population.mutate();
      }

      population.update();
    }
  }

  // Draw the Grid
  for (cell of grid) {
    cell.show();
  }

  if (populationCreated){
    population.show();
  }

  if(populationCreated) {
    push();
    fill(255,200);
    stroke(0,200);
    strokeWeight(5);
    textSize(15);
    text('Generation: ' + generation , 10, height - 40);
    if (goalReached){
      fill(0,255,0,200);
      text('Goal Reached!', 10, height - 15);
    } else {
      fill(255,200);
      text('Solving...', 10, height - 15);
    }
    pop();
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
  select = createSelect();
  select.option('small');
  select.option('medium');
  select.option('large');
  select.selected('medium');
  select.changed(checkGridSize);
  speedSlider = createSlider(1, 60, 1);
  radio = createRadio();
  radio.option('Depth First Search');
  radio.option('Breadth First Search');
  radio.option('Best First Search');
  radio.option('A* Search');
  radio.option('AI Agents');
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
  if (searchMethod == 'AI Agents'){
    GASolve();
  } else {
    solve = true;
  }
}

function GASolve(){
  population = new Population(POPULATION_SIZE);
  populationCreated = true;
}

function resetGA(){
  populationCreated=false;
  goalReached = false;
  population = [];
  generation = 0;
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
  resetGA();
  solve = false;
  mazeGenerated = false;
}

function createGrid(){
  grid = [];
  cols = floor(width / scl);
  rows = floor(height / scl);
  agent_radius = scl/2 * 0.2;

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

function checkGridSize(){
  if (!solve){
    switch (select.value()){
      case 'small':
        scl = 25;
        break;
      case 'medium':
        scl = 50;
        break;
      case 'large':
        scl =100;
        break;
    }
    createGrid();
    resetGA();
  }
}
