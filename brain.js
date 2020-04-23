/*
  brian.js is taken from
  https://github.com/jameshball/MazeAI/blob/master/Brain.pde
*/


function Brain(size) {
  this.directions = [];
  this.step = 0;


  for (let i = 0; i < size; i++) {
    let randomAngle = random(2*PI);
    this.directions[i] = p5.Vector.fromAngle(randomAngle);
  }

  // Returns a clone of the current brain, with new random values for any remaining
  this.clone = function(){
    let clone = new Brain(stepCount);
    for(let i = 0; i < stepCount; i++){
      if (i < this.directions.length) {
        clone.directions[i] = this.directions[i];
      }
      else {
        let randomAngle = random(2*PI);
        clone.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }

    return clone;
  }

  /* Randomly changes 0.1% of the direction vectors in the current brain. */
  this.mutate = function(){

    for(let i = 0; i < this.directions.length - 1; i++){
      let rnd = random(1);

      if (rnd < MUTATION_RATE) {
        let randomAngle = random(2*PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }
}
