function height (node) {
  if (node == null || node.nil) {
    return 0;
  } else {
    node.height = 1 + Math.max(height(node.leftChild), height(node.rightChild));
    return node.height;
  }
}

function visuals (node) {
  if (node.parent && !node.parent.nil) {
    node.cy = node.parent.cy + VERT_SPACE;
    if (node.isLeftChild) {
      node.cx = node.parent.cx - Math.pow(2, node.height) * NODE_SPACING;
    } else {
      node.cx = node.parent.cx + Math.pow(2, node.height) * NODE_SPACING;
    }
  } else {
    node.cx = 0;
    node.cy = 0;
  }
  if (node.leftChild && !node.leftChild.nil) {
    visuals(node.leftChild);
  }
  if (node.rightChild && !node.rightChild.nil) {
    visuals(node.rightChild);
  }
}

function nodesAndLinks (node) {
  if (!node || node.nil) {
    return {nodes: [], links: []};
  }
  var n = new visNode(node);
  var q = [n];
  var l = [n];
  var pairs = []
  while (q.length > 0) {
    n = q.shift();
    if (n.leftChild && !n.leftChild.nil) {
      var vcl = new visNode(n.leftChild);
      l.push(vcl);
      q.push(vcl);
      pairs.push({parent:n, child:vcl});
    }
    if (n.rightChild && !n.rightChild.nil) {
      var vcr = new visNode(n.rightChild);
      l.push(vcr);
      q.push(vcr);
      pairs.push({parent:n, child:vcr});
    }
  }
  return {nodes:l, links:pairs};
}

function view (tree) {
  if (tree.root && !tree.root.ni) {
    height(tree.root);
    visuals(tree.root)
  }
  return nodesAndLinks(tree.root);
}

function visNode (node) {
  this.cx = node.cx;
  this.cy = node.cy;
  this.leftChild = node.leftChild;
  this.rightChild = node.rightChild;
  this.parent = node.parent;
  this.color = node.color;
  this.key = node.key;
}
