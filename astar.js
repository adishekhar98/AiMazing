/*
  A* search code adapted from the following:
  https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_051_astar/P5
*/

var openSet = [];
var closedSet = [];



function aStarStep() {
  /*
    A* search uses the following formula to evaluate nodes:
      f(n) = g(n) + h(n)
    Where f(n) is the 'cost' of each node,
      g(n) is the cost associated from getting from the start node to the current node
      h(n) is a heuristic to estimate the cost of getting from the current node to the end.
  */


  // Initialise the g and f values for the start. Since g(start) = 0, f(start) = h(start)
  start.g = 0;
  start.f = heuristic(start, end);


  // As long as there are nodes to evaluate, run the the algorithm
  if (openSet.length > 0) {

    // Calcualates which node in the open set has the lowest f-cost, evaluating it first
    let lowestFIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestFIndex].f) {
        lowestFIndex = i;
      }
    }


    // Store the lowest f-cost node in variables, as a cell object and as an index in the grid
    var node = openSet[lowestFIndex];
    var v = node.j * rows + node.i;

    // If the current node is the end, then print "finished" and return
    if (node.state == 'f') {
      node.inpath = true;
      console.log('finished');
      solve = false;
      // Calculate the shortest path
      for (i = 0; i < shortestPath(node).length; i++) {
        shortestPath(node)[i].inpath = true;
      }

    }

    // Remove the current node from the open set and add it to the closed set, mark it as visited
    popElt(openSet, node);
    node.visited = true;
    closedSet.push(node);

    // Loop through all neighbouring cells of the current node
    for (neighbourIndex of adjacent(v)) {
      let neighbour = grid[neighbourIndex];
      neighbour.queued = true;

      // If the neighbour hasn't already been evaluated, evaluate it's g-cost
      if (!closedSet.includes(neighbour)) {

        // Each neighbour is a distance of 1 from its parent node
        let tentativeG = node.g + 1;

        // Determine the lowest g-cost to the given neighbour
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tentativeG < neighbour.g) {
            neighbour.g = tentativeG;
            newPath = true;
          }
        } else {
          neighbour.g = tentativeG;
          newPath = true;
          openSet.push(neighbour);
        }

        // If a new path to the neighbour is found, update its parent and calulcate its cost
        if (newPath) {
          neighbour.parent = node;
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
        }

      }
    }
  } else {
    solve = false;
  }

}

function bStarStep() {
  /*
    Best First search (also known as B*) is a simpler version of A*, the formula being:
      f(n) = h(n)
    Here the g-cost is ommited from the formula, using only the hueristic function to evaluate cells
  */


  // Initialise the f value for the start
  start.f = heuristic(start, end);


  // As long as there are nodes to evaluate, run the the algorithm
  if (openSet.length > 0) {

    // Calcualates which node in the open set has the lowest f-cost, evaluating it first
    let lowestFIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestFIndex].f) {
        lowestFIndex = i;
      }
    }


    // Store the lowest f-cost node in variables, as a cell object and as an index in the grid
    var node = openSet[lowestFIndex];
    var v = node.j * rows + node.i;

    // If the current node is the end, then print "finished" and return
    if (node.state == 'f') {
      node.inpath = true;
      console.log('finished');
      solve = false;
      // Calculate the shortest path
      for (i = 0; i < shortestPath(node).length; i++) {
        shortestPath(node)[i].inpath = true;
      }

    }

    // Remove the current node from the open set and add it to the closed set, mark it as visited
    popElt(openSet, node);
    node.visited = true;
    closedSet.push(node);

    // Loop through all neighbouring cells of the current node
    for (neighbourIndex of adjacent(v)) {
      let neighbour = grid[neighbourIndex];
      neighbour.queued = true;

      // If the node is not in the open or closed set, add it to the open set
      if (!closedSet.includes(neighbour)) {
        // IF the node
        let newPath = false;
        if (!openSet.includes(neighbour)) {
          newPath = true;
          openSet.push(neighbour);
        }

        // If a new path to the neighbour is found, update its parent and calulcate its cost
        if (newPath) {
          neighbour.parent = node;
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.h;
        }

      }
    }
  } else {
    solve = false;
  }

}



// Reset current A* and B* parameters
function aStarReset() {
  openSet = [];
  closedSet = [];
  openSet.push(start);
}

//custom function to pop a given element from a given array
function popElt(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
      //return arr[i];
    }
  }
}

// The heuristic used is the Euclidian distance the given cell to the end
function heuristic(a, b) {
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}
