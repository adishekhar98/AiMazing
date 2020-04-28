function Agent(x, y, brain) {
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.rad = radius;
  this.intersecting = false;
  this.rays = [];
  this.sightRange = scl * 5;
  this.distToEnd = dist(this.pos.x, this.pos.y, end.x + scl / 2, end.y + scl / 2);
  this.dead = false;
  this.finished = false;
  this.brain;
  this.score = 0;
  this.fitness = 0;
  this.lifespan = 0;
  this.hitWall = false;
  this.goalVector = createVector(end.x, end.y);
  this.maxForce = 1;
  this.maxSpeed = 2;
  this.steering;
  this.isBest = false;

  this.rays = [];
  for (var i = 0; i < 360; i += 30) {
    this.rays.push(new Ray(radians(i), this));
  }

  if (brain) {
    this.brain = brain.copy();
  } else if (!brain) {
    this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
  }

  this.show = function() {
    if (!this.isBest){
      push();
      fill(255, 255, 255, 100);
      ellipse(this.pos.x, this.pos.y, this.rad * 2);
      pop();
    } else {
    push();
    fill(0, 255, 0, 100);
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
    pop();
    }


    //drawArrow(this.pos, this.goalVector, 'blue');

    // for (ray of this.rays) {
    //   ray.show();
    // }

  }

  // this.createRays = function() {
  //   this.rays = [];
  //   for (var i = 0; i < 360; i += 30) {
  //     this.rays.push(new Ray(radians(i)));
  //   }
  // }

  // this.createNN = function(){
  //   if (!this.newBrain){
  //     console.log('created with existing brain ', brain, ', copying brain...');
  //     this.brain = brain.copy();
  //   } else{
  //     console.log('creating new brain for ', this);
  //     this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
  //   }
  // }

  this.mutate = function(){
    this.brain.mutate(MUTATION_RATE);
  }

  this.dispose = function(){
    this.brain.dispose();
  }

  this.update = function() {
    this.lifespan++;

    if(this.lifespan >= agent_lifespan){
      this.dead = true;
    }
    //getBarriers();
    for (ray of this.rays){
      ray.update();
    }
    if (!this.dead){
    this.castRays();
    }

    // for (ray of this.rays){
    //   ray.show();
    // }


    // if (this.checkCollisions()) {
    //   this.pos.set(start.i + scl / 2, start.j + scl / 2);
    //   this.vel.set(0, 0);
    // }

    this.acc = this.steering;
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    //this.acc.mult(0);
    this.distToEnd = dist(this.pos.x, this.pos.y, end.x + scl / 2, end.y + scl / 2);

    for (ray of this.rays){
      ray.rotate(this.vel.heading());
    }
  }

  this.move = function(force) {
    this.acc = force;
  }

  this.checkCollisions = function() {
    if (this.pos.x - this.rad <= 0 || this.pos.x + this.rad >= width || this.pos.y - this.rad <= 0 || this.pos.y + this.rad >= height) {
      console.log('intersection!');
      return true;
      this.intersecting = true;
    }

    for (var i = 0; i < grid.length; i++) {
      var cell = grid[i];

      if (cell.state == 'f') {
        push();
        stroke(0, 255, 0);
        line(this.pos.x, this.pos.y, cell.x + scl / 2, cell.y + scl / 2);
        pop();
      }
      if (cell.state == 1) {
        push();
        stroke(255, 0, 0);
        //line(this.pos.x, this.pos.y, cell.x + scl / 2, cell.y + scl / 2);
        pop();
        if (this.intersection(cell)) {
          return true;
          this.intersecting = true;
        }
      }
    }
    return false;
  }

  this.intersection = function(other) {
    if (this.pos.x + this.rad > other.x &&
      this.pos.y + this.rad > other.y &&
      this.pos.x - this.rad < other.x + scl &&
      this.pos.y - this.rad < other.y + scl) {
      return true;
      return false;
    }
  }

  this.castRays = function() {
    this.inputs = [];
    let closestBarriers = [];

    for (let ray of this.rays) {
      let closest = null;
      let record = this.sightRange;
      for (let barrier of barriers) {
        let pt = ray.cast(barrier);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }

          if (record - this.rad <= 2  ) {
            this.hitWall = true;
            this.dead = true;
          }

          if (this.distToEnd < this.rad * 2) {
            this.finished = true;
          }
        }
      }
      if (closest) {
        // push();
        // stroke(255, 0 , 0);
        // line(ray.pos.x, ray.pos.y , closest.x, closest.y);
        //
        // pop();
      }

      // Push each ray distance into the input for the NN
      this.inputs.push( map(record, 0, this.sightRange, 1, 0));


    }

    // Push the Euclidian Distance from the agent to the goal to the input for the NN
    //this.inputs.push(map(this.distToEnd, 0, dist(0,0,width,height), 0, 1));

    // Push
    //this.goalVector.set(end.x, end.y);
    //this.goalVector.sub(this.pos);
    //this.goalVector.normalize();

    //let input_x = map(this.goalVector.x,-1,1,0,1);
    //let input_y = map(this.goalVector.y,-1,1,0,1);

    //this.inputs.push(input_x);
    //this.inputs.push(input_y);



    //console.log(goalVector);





    let output = this.brain.predict(this.inputs);

    //let output_x = map(output[0], 0, 1, -1, 1);
    //let output_y = map(output[1], 0, 1, -1, 1);

    let angle = map(output[0], 0, 1, -PI, PI);
    //angle += this.vel.heading();
    let desired = p5.Vector.fromAngle(angle);
    desired.normalize();
    //let desired = createVector(output_x, output_y);
    this.steering = desired;
    // let steering = desired.sub(this.vel);
    // desired.setMag(this.maxForce);
    //
    //
    // this.steering = steering;
  }

  this.calculateFitness = function(){
    let maxlen = rows + cols;
    let mappedfit = map(aStarAgent(this.getClosetCell()), 0, maxlen, 0, 500);
    console.log(mappedfit);
    if (this.finished){
      this.fitness = 1;
    } else {

      this.fitness = 1.0 / (mappedfit * mappedfit + pow(this.lifespan, 2));


      if (this.hitWall) {
        this.fitness = 0.0000001;

      }

    }
    console.log('PRINTING THIS FITNESS ' + this.fitness)
  }

  this.getClosetCell = function(){
    let closest;
    let record = Infinity;
    let distancetocell;

    for (cell of grid){

      if(cell.state == 0 || cell.state == 's'){
        distancetocell = dist(this.pos.x, this.pos.y, cell.x , cell.y);


        if (distancetocell < record){
          record = distancetocell;
          //console.log('record dist is ' + record);
          closest = cell;
        }
      }
    }
    return closest;
  }


}
