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
  radio.option('Genetic Algorithm');
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

function drawTextGA(){
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

function parseSpeedValue(){
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
}
