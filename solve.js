/*
  These functions handle the running of the solve algorthims
  The uninformed and informed search algorithms are handled together
  The genetic algorithm is handled separately
*/

function doSolveStep(){
  // Solve the current grid using the selected search method
  if (solve) {
    // Don't let the user change the solve method if a solve is running
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
}

function doPopulationStep(){
  // In order to speed up the population simulation, this function can execute a number of times per frame
  for (let n = 0; n < cycles; n++){
    if (populationCreated){
      // If all agents are dead then run the genetic algorithm that creates the next generation
      if (population.allAgentsDead()){
        population.geneticAlgorithm();
      }

      // Update the agents in the population
      population.update();
    }
  }
}

// If the solve button is pressed, run the appropriate solve method
function solveButtonPressed() {
  showSolveMetrics = true;
  for (var i = 0; i < grid.length; i++) {
    grid[i].resetSearch();
  }
  if (searchMethod == 'Genetic Algorithm'){
    GASolve();
  } else {
    solve = true;
  }
}

// Run the genetic algorithm
function GASolve(){
  population = new Population(POPULATION_SIZE);
  populationCreated = true;
}

// Reset the Genetic Algorithm
function resetGA(){
  populationCreated=false;
  goalReached = false;
  population = null;
  generation = 0;
}
