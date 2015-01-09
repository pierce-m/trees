function height (node) {
  if (node == null) {
    return 0;
  } else {
    node.height = 1 + Math.max(this.height(node.leftChild), this.height(node.rightChild));
    return node.height;
  }
}

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

function nodesAndLinks (node) {
  var n = new visNode(node);
  var q = [n];
  var l = [n];
  var pairs = []
  while (q.length > 0) {
    n = q.shift();
    if (n.leftChild) {
      var vcl = new visNode(n.leftChild);
      l.push(vcl);
      q.push(vcl);
      pairs.push({parent:n, child:vcl});
    }
    if (n.rightChild) {
      var vcr = new visNode(n.rightChild);
      l.push(vcr);
      q.push(vcr);
      pairs.push({parent:n, child:vcr});
    }
  }
  return {nodes:l, links:pairs};
}

function view (tree) {
  height(tree.root);
  visuals(tree.root)
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
