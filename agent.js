function Agent(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.rad = radius;
  this.intersecting = false;
  this.rays = [];
  this.sightRange = scl * 5;

  this.show = function() {
    fill(255, 255, 255, 100);
    ellipse(this.pos.x, this.pos.y, this.rad * 2);

    // for (ray of this.rays) {
    //   ray.show();
    // }

  }

  this.createRays = function() {
    this.rays = [];
    for (var i = 0; i < 360; i += 30) {
      this.rays.push(new Ray(radians(i)));
    }

  this.createNN = function(){
    this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
  }

  }

  this.update = function() {
    //getBarriers();
    for (ray of this.rays){
      ray.update();
    }
    this.move(this.castRays());
    // for (ray of this.rays){
    //   ray.show();
    // }


    if (this.checkCollisions()) {
      this.pos.set(start.i + scl / 2, start.j + scl / 2);
      this.vel.set(0, 0);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.move = function(force) {
    this.acc.add(force);
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
        }
      }
      if (closest) {
        push();
        stroke(255, 0 , 0);
        //translate(this.pos.x,this.pos.y);
        line(ray.pos.x, ray.pos.y , closest.x, closest.y);

        pop();
      }

      this.inputs.push( map(record, 0, this.sightRange, 1, 0));


    }
    let output = this.brain.predict(this.inputs);
    let angle = map(output[0], 0, 1, 0, TWO_PI);
    let desired = p5.Vector.fromAngle(angle);

    let steering = desired.sub(this.vel);
    steering.setMag(1);
    return steering;
    //console.log(closestBarriers);
  }

}
