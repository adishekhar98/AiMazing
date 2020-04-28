// these are going to be filled with the cell objects themselves





//openSet.push(start);

function aStarAgent(cell) {
  //array of cells
  let open  = [];
  let closed = [];

  //array of values for the index
  let h = [];
  let g = [];
  let f = [];
  let parentsarr = [];

  for (var i = 0; i < grid.length; i++){
    g[i] = Infinity;
  }

  for (var i = 0; i < grid.length; i++){
    f[i] = Infinity;
  }

  for (var i = 0; i < grid.length; i++){
    h[i] = Infinity;
  }

  for (var i = 0; i < grid.length; i++){
    parentsarr[i] = null;
  }

  f[cell.getGridIndex()] = heuristic(cell,end);
  open.push(cell)



  while(open.length > 0) {
    //var v = stack.pop();
    //var node = grid[v];

    var lowestFIndex = 0
    for (var i = 0; i < open.length; i++){
      if (f[open[i].getGridIndex()] < f[open[lowestFIndex].getGridIndex()]){
        lowestFIndex = i;
      }
    }



    var node = open[lowestFIndex];
    var v = node.j * rows + node.i;

    //if the current node is the finish, then print "finished" and return
    if (node.state == 'f') {
      let path = [];
      let nodeIndex = node.getGridIndex();
      while (nodeIndex !== null) {

        nodeIndex = parentsarr[nodeIndex]
        path.push(nodeIndex);

      }
      path.pop();

      return path.length;
    }

    popElt(open, node);
    closed.push(node);

    for (var i = 0;  i < adjacent(v).length; i++ ){
      var neighbour = grid[adjacent(v)[i]];

      if(!closed.includes(neighbour)){
        var tempG = g[node.getGridIndex()] + 1;
        //var tempG = heuristic(neighbour,current);


        var newPath = false;
        if(open.includes(neighbour)) {
          if (tempG < g[neighbour.getGridIndex()]) {
            g[neighbour.getGridIndex()] = tempG;
            newPath = true;
          }
        } else {
          g[neighbour.getGridIndex()] = tempG;
          newPath = true;
          open.push(neighbour);
        }

        if(newPath){
          parentsarr[neighbour.getGridIndex()] = node.getGridIndex();
          h[neighbour.getGridIndex()] = heuristic(neighbour,end);
          f[neighbour.getGridIndex()] = g[neighbour.getGridIndex()] + h[neighbour.getGridIndex()];
        }

      }
    }
  }
  return 0;

}
