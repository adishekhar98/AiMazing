function adjacent(i) {
  var adjacentArr = [];
  var w = rows;
  var x = i % w;
  var y = (i - x) / w;


  // check up
  var up = (y - 1) * w + x;
  if (valid_y(y - 1) && typeof grid[up] !== 'undefined' && grid[up].state !== 1 && !(grid[up].visited)) {
    adjacentArr.push(up);
  }

  // check right
  var right = y * w + (x + 1);
  if (valid_x(x + 1) && typeof grid[right] !== 'undefined' && grid[right].state !== 1 && !(grid[right].visited)) {
    adjacentArr.push(right);
  }

  // check down
  var down = (y + 1) * w + x;
  if (valid_y(y + 1) && typeof grid[down] !== 'undefined' && grid[down].state !== 1 && !(grid[down].visited)) {
    adjacentArr.push(down);
  }

  // check left
  var left = y * w + (x - 1);
  if (valid_x(x - 1) && typeof grid[left] !== 'undefined' && grid[left].state !== 1 && !(grid[left].visited)) {
    adjacentArr.push(left);
  }

  return adjacentArr;

}

function getWalls(i) {
  var wallsArr = [];
  var w = rows;
  var x = i % w;
  var y = (i - x) / w;


  // check up
  var up = (y - 1) * w + x;
  if (valid_y(y - 1) && typeof grid[up] !== 'undefined' && grid[up].state == 1) {
    wallsArr.push(up);
  }

  // check right
  var right = y * w + (x + 1);
  if (valid_x(x + 1) && typeof grid[right] !== 'undefined' && grid[right].state == 1) {
    wallsArr.push(right);
  }

  // check down
  var down = (y + 1) * w + x;
  if (valid_y(y + 1) && typeof grid[down] !== 'undefined' && grid[down].state == 1) {
    wallsArr.push(down);
  }

  // check left
  var left = y * w + (x - 1);
  if (valid_x(x - 1) && typeof grid[left] !== 'undefined' && grid[left].state == 1) {
    wallsArr.push(left);
  }

  return wallsArr;

}

function valid_x(x) {
  if (x >= 0 && x < cols) {
    return true;
  } else {
    return false;
  }
}

function valid_y(y) {
  if (y >= 0 && y < rows) {
    return true;
  } else {
    return false;
  }
}
