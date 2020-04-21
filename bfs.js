var queue = [];
queue.push(0)

function bfsStep() {

  if (queue.length > 0) {
    var v = queue.shift();
    var node = grid[v];
    if (node.state == 'f') {
      console.log('finished');
      solve = false;
      for (i = 0; i < shortestPath(node).length; i++){
        shortestPath(node)[i].inpath = true;
      }
    }

    // if node has not been visited, visit it and add adjacent nodes to the queue
    if (!node.visited) {
      node.visited = true;

      for (i = 0; i < adjacent(v).length; i++) {
        queue.push(adjacent(v)[i]);
        grid[adjacent(v)[i]].parent = node;
        grid[adjacent(v)[i]].queued = true;
      }
    }



  } else {
    solve = false;

  }


}


function bfsReset() {
  queue = [];
  queue.push(0);

}
