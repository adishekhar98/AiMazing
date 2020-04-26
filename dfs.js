var stack = [];
stack.push(0)


function dfsStep() {
  stepsTaken++



  if (stack.length > 0) {
    var v = stack.pop();
    var node = grid[v];

    //if the current node is the finish, then print "finished" and return
    if (node.state == 'f') {
      solutionFound = true;
      node.inpath = true;
      console.log('finished');
      solve = false;
      for (i = 0; i < shortestPath(node).length; i++){
        shortestPath(node)[i].inpath = true;
      }

    }

    // if node has not been visited, visit it, and add adjacent nodes to the queue
    if (!node.visited) {
      node.visited = true;

      for (i = 0; i < adjacent(v).length; i++) {
        stack.push(adjacent(v)[i]);
        grid[adjacent(v)[i]].parent = node;
        grid[adjacent(v)[i]].queued = true;
      }
    }

  } else {
    solutionFound = false;
    noSolution = true;
    shortestPathLen = 0;
    solve = false;
  }

}


function dfsReset() {
  showSolveMetrics = false;
  solutionFound = false;
  noSolution = false;
  stepsTaken = 0;
  shortestPathLen = 0;
  stack = [];
  stack.push(0);

}
