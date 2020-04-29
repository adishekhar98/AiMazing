/*
  Code for running Depth First Search
*/


var stack = [];
stack.push(0)


function dfsStep() {
  stepsTaken++


  // As long as the queue is not empty, run DFS
  if (stack.length > 0) {
    var v = stack.pop();
    var node = grid[v];

    // If a solution has been found, show the shortest path
    if (node.state == 'f') {
      solutionFound = true;
      node.inpath = true;
      console.log('finished');
      solve = false;
      for (i = 0; i < shortestPath(node).length; i++){
        shortestPath(node)[i].inpath = true;
      }

    }

    // If node has not been visited, visit it and add adjacent nodes to the stack
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

// Reset serach variables
function dfsReset() {
  showSolveMetrics = false;
  solutionFound = false;
  noSolution = false;
  stepsTaken = 0;
  shortestPathLen = 0;
  stack = [];
  stack.push(0);

}
