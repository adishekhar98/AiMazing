/*
  Code for running Breadth First Search
*/

var queue = [];
queue.push(0)

function bfsStep() {
  stepsTaken++

  // As long as the queue is not empty, run BFS
  if (queue.length > 0) {
    var v = queue.shift();
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

    // If node has not been visited, visit it and add adjacent nodes to the queue
    if (!node.visited) {
      node.visited = true;

      for (i = 0; i < adjacent(v).length; i++) {
        queue.push(adjacent(v)[i]);
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
function bfsReset() {
  showSolveMetrics = false;
  solutionFound = false;
  noSolution = false;
  stepsTaken = 0;
  shortestPathLen = 0;
  queue = [];
  queue.push(0);

}
