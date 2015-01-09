/* Assigns a height to each node indicating the height of its
 * tallest subtree plus itself */
function height (node) {
  if (node == null) {
    return 0;
  } else {
    node.height = 1 + Math.max(this.height(node.leftChild), this.height(node.rightChild));
    return node.height;
  }
}

/* Stores visual information in each node for d3 */
function visuals (node) {
  if (node.parent) {
    node.cy = node.parent.cy + 55
    if (node.isLeftChild) {
      node.cx = node.parent.cx - Math.pow(2, node.height) * 10
    } else {
      node.cx = node.parent.cx + Math.pow(2, node.height) * 10
    }
  } else {
    node.cx = 0;
    node.cy = 0;
  }
  if (node.leftChild) {
    visuals(node.leftChild);
  }
  if (node.rightChild) {
    visuals(node.rightChild);
  }
}

/* Returns an array containing a topoligical sorting of the
 * BST and a list of parent-child pairs */
function nodesAndLinks (node) {
  var q = [node];
  var l = [node];
  var pairs = []
  while (q.length > 0) {
    var n = q.shift();
    if (n.leftChild) {
      l.push(n.leftChild);
      q.push(n.leftChild);
      pairs.push({parent:n, child:n.leftChild});
    }
    if (n.rightChild) {
      l.push(n.rightChild);
      q.push(n.rightChild);
      pairs.push({parent:n, child:n.rightChild});
    }
  }
  console.log(l);
  return {nodes:l, links:pairs};
}

/* Assigns height and visual info for a tree, returns an object containing
 * the nodes and links of the tree. */
function view (tree) {
  height(tree.root);
  visuals(tree.root)
  return nodesAndLinks(tree.root);
}
