function shortestPath(node) {
  shortestPathLen = 0; 
  let path = [];
  let startnode;

  while (node !== null) {
    node = getParent(node)
    path.push(node);

  }
  path.pop();
  return path;
}

function getParent(node) {
  shortestPathLen++;
  var parent = node.parent
  return parent;
}
