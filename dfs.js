var stack = [];
stack.push(0)


function dfsStep() {



  if (stack.length > 0) {
    var v = stack.pop();
    var node = grid[v];

    //if the current node is the finish, then print "finished" and return
    if (node.state == 'f') {
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


    // I WANT TO UPDATE THE CANVAS HERE
  } else {
    solve = false;
  }

}


function dfsReset() {
  stack = [];
  stack.push(0);

}
