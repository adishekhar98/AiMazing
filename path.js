function shortestPath(node) {
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
  var parent = node.parent
  return parent;
}
