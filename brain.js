/*
  The brain object serves as the "neural net" for the agent.
  The direction array stores a series of direction vectors which is how the agent moves.

  Code adpated from the following:
  https://github.com/jameshball/MazeAI/
*/


function Brain(size) {
  this.directions = [];
  this.step = 0;


  // Initialise the directions array with random direction vectors
  for (let i = 0; i < size; i++) {
    this.directions[i] = randomDirectionVector();
  }

  // Returns a clone of the current brain, with new random vectors for new steps
  this.clone = function(){
    let clone = new Brain(stepCount);
    for(let i = 0; i < stepCount; i++){
      if (i < this.directions.length) {
        clone.directions[i] = this.directions[i];
      }
      else {
        clone.directions[i] = randomDirectionVector();
      }
    }

    return clone;
  }

  // Change 0.1% of values in the directions array to a new random direction
  this.mutate = function(){

    for(let i = 0; i < this.directions.length - 1; i++){

      if (random(1) < MUTATION_RATE) {
        let randomAngle = random(2*PI);
        this.directions[i] = randomDirectionVector();
      }
    }
  }
}

// Returns a random direction vector
function randomDirectionVector(){
  return p5.Vector.fromAngle(random(2*PI));
}
