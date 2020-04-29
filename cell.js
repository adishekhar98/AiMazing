/*
  Cell.js functions as a class for the cells of the grid
  Each cell keeps track of its positon and states

*/

function Cell(i, j, state) {

  // Row and Col index, and
  this.i = i;
  this.j = j;
  this.x = this.i * scl;
  this.y = this.j * scl;

  // Points for ray casting calculations
  this.p = this.x + scl;
  this.q = this.y + scl;

  this.state = state;
  this.visited = false;
  this.parent = null;
  this.queued = false;
  this.inpath = false;

  // For a* and GBFS
  this.f = Infinity;
  this.g = Infinity;
  this.h = Infinity;

  // Displays the cell, with the appropriate colour given its state
  this.show = function() {

    if (this.state == 1) {
      //stroke(255);
      fill(38, 61, 66);
    } else if (this.inpath == true){
        fill(243, 201, 105);
    } else if (this.visited == true) {
      // for cells that have been discovered
        fill(99, 199, 178);
    } else if (this.queued == true){
        fill(142, 108, 136);
    } else if (this.state == 0) {
        fill(204, 219, 220);
    } else if (this.state == 's') {
        fill(128, 206, 215);
    } else if (this.state == 'f') {
        fill(249, 57, 67);
    }


    //fill(51);
    rect(this.x, this.y, scl, scl);
  }


  // Changes cell state when clicked
  this.clicked = function() {

    var d = dist(mouseX, mouseY, this.x + scl / 2, this.y + scl / 2);
    //console.log("distance d = " + d);
    if (d < scl / 2) {
      this.fliptile();
    }
  }

  this.fliptile = function() {
    //console.log("flipped");
    if (this.state == 1) {
      this.state = 0;
    } else if (this.state == 0) {
      this.state = 1;
    }
  }

  // Resets the grid
  this.resetTiles = function() {
    this.visited = false;
    this.queued = false;
    this.inpath = false;
    this.parent = null;
    if (this.i == 0 && this.j ==0) {
      this.state = 's';
    } else if (this.i == cols-1 && this.j == rows-1) {
      this.state = 'f';
    } else {
      this.state = 1;
    }
  }

  // Resets the search parameters while maintaining the maze
  this.resetSearch = function() {
    this.queued = false;
    this.visited = false;
    this.inpath = false;
    this.parent = null;
    this.f = Infinity;
    this.g = Infinity;
    this.h = Infinity;
  }


  this.visit = function() {
    this.visited = true;
  }



}
