/*
  Code for the agent class, each agent has a brain object from brain.js
  parts of the code adapted fom https://github.com/jameshball/MazeAI/
*/

function Agent(brain) {
  this.pos = createVector(start.x + scl / 2, start.y + scl / 2);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.rad = agent_radius;
  this.intersecting = false;
  this.dead = false;
  this.finished = false;
  this.isBest = false;
  this.fitness = 0;
  this.hitWall = false;

  // If the agent is created with a brain, then use that brain.
  // Otherwise, create a new brain.

  if (brain) {
    this.brain = brain;
  } else {
    this.brain = new Brain(stepCount);
  }



  // Draw the agent
  this.show = function() {
    if (this.isBest) {
      push();
      fill(0, 255, 0, 100);
      stroke(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, this.rad * 2);
      pop();
    } else {
      push();
      strokeWeight(2);
      fill(255, 255, 255, 100);
      ellipse(this.pos.x, this.pos.y, this.rad * 2);
      pop();
    }

  }

  // Move the agent
  this.move = function() {
    if (this.brain.step < this.brain.directions.length) {
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    } else {
      this.dead = true;

      this.calculateFitness();
    }

    // Limit the agents
    this.vel.add(this.acc);
    this.vel.limit(MAX_SPEED);
    this.pos.add(this.vel);
  }

  // Calculte if agent is dead or finished at every step
  this.update = function() {

    if (this.isColliding()) {
      this.calculateFitness();
      this.hitWall = true;
      this.dead = true;
    }

    if (!this.dead && !this.finished && !this.hitWall) {
      this.move();
      this.calculateFitness();
    } else if (this.finished) {
      this.calculateFitness();
    }
  }

  // Functions to check if the agent has hit a wall
  this.isColliding = function() {
    if (this.pos.x - this.rad <= 0 || this.pos.x + this.rad >= width || this.pos.y - this.rad <= 0 || this.pos.y + this.rad >= height) {

      return true;
      this.intersecting = true;
    } else {
      for (cell of grid) {

        if (cell.state == 'f') {
          if (this.intersectsCell(cell)) {
            this.finished = true;
            goalReached = true;
            this.fitness = 1;
            this.dead = true;
          }

        } else if (cell.state == 1) {
          // push();
          // stroke(255, 0, 0);
          // line(this.pos.x, this.pos.y, cell.x + scl / 2, cell.y + scl / 2);
          // pop();
          if (this.intersectsCell(cell)) {
            return true;
            this.intersecting = true;
          }
        }
      }
    }
    return false;
  }

  this.intersectsCell = function(other) {
    if (this.pos.x + this.rad > other.x &&
      this.pos.y + this.rad > other.y &&
      this.pos.x - this.rad < other.x + scl &&
      this.pos.y - this.rad < other.y + scl) {
      return true;
      return false;
    }
  }



  // Function to calculate the agent fitness based on its distance to the goal and step count
  this.calculateFitness = function() {
    let distToGoal = dist(this.pos.x, this.pos.y, end.x + scl / 2, end.y + scl / 2);
    if (this.finished) {
      this.fitness = 1;
    } else if (this.hitWall) {
      this.fitness = 0.0000001;
    } else {
      this.fitness = 1.0 / (distToGoal * distToGoal + pow(this.brain.step, 2));
    }
  }

  this.getChild = function() {
    let child = new Agent(this.brain.clone());
    return child;
  }
}
