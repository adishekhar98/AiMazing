function Ray(angle, agent) {
  this.pos = createVector(agent.pos.x, agent.pos.y);
  this.dir = p5.Vector.fromAngle(angle);


  this.update = function() {
    this.pos.set(agent.pos.x, agent.pos.y);
    // push();
    // stroke(255);
    // translate(this.pos.x, this.pos.y);
    // line(0,0, this.dir.x * 100, this.dir.y * 100);
    // pop();
  }

  this.cast = function(wall){
    let x1 = wall.a.x;
    let y1 = wall.a.y;
    let x2 = wall.b.x;
    let y2 = wall.b.y;

    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;

    let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return;
    }

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
    if (t > 0 && t < 1 && u > 0) {
      let pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
  }

}
}
