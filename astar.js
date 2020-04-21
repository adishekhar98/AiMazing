// these are going to be filled with the cell objects themselves


var openSet = [];
var closedSet = [];


//openSet.push(start);

function aStarStep() {
  start.g = 0;
  start.f = heuristic(start,end);



  if (openSet.length > 0) {
    //var v = stack.pop();
    //var node = grid[v];

    var lowestFIndex = 0
    for (var i = 0; i < openSet.length; i++){
      if (openSet[i].f < openSet[lowestFIndex].f){
        lowestFIndex = i;
      }
    }



    var node = openSet[lowestFIndex];
    var v = node.j * rows + node.i;

    //if the current node is the finish, then print "finished" and return
    if (node.state == 'f') {
      console.log('finished');
      solve = false;
      for (i = 0; i < shortestPath(node).length; i++){
        shortestPath(node)[i].inpath = true;
      }

    }

    popElt(openSet, node);
    node.visited = true;
    closedSet.push(node);

    for (var i = 0;  i < adjacent(v).length; i++ ){
      var neighbour = grid[adjacent(v)[i]];
      neighbour.queued = true;

      if(!closedSet.includes(neighbour)){
        var tempG = node.g + 1;
        //var tempG = heuristic(neighbour,current);


        var newPath = false;
        if(openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }
      
        if(newPath){
          neighbour.parent = node;
          neighbour.h = heuristic(neighbour,end);
          neighbour.f = neighbour.g + neighbour.h;
        }

      }
    }

    // if node has not been visited, visit it, and add adjacent nodes to the queue
    // if (!node.visited) {
    //   node.visited = true;
    //
    //   for (i = 0; i < adjacent(v).length; i++) {
    //     stack.push(adjacent(v)[i]);
    //     grid[adjacent(v)[i]].parent = node;
    //     grid[adjacent(v)[i]].queued = true;
    //   }
    // }


  } else {
    solve = false;
  }

}



function aStarReset() {
  openSet = [];
  closedSet = [];
  openSet.push(start);

}

//custom function to pop a given element from a given array
function popElt(arr, elt) {
  for (var i = arr.length-1; i>= 0; i--){
    if (arr[i] == elt) {
      arr.splice(i, 1);
      //return arr[i];
    }
  }
}

function heuristic(a,b){
  // Uses Euclidian Distance
  //var d = dist(a.i,a.j,b.i,b.j);

  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function dfsReset() {
  stack = [];
  stack.push(0);

}
