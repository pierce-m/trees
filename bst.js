function BST () {
  this.root = null;
}

BST.prototype.insert = function (key) {
  var z = new BSTNode(key, null);
  var y = null;
  var x = this.root;
  while (x != null) {
    y = x;
    if (z.key < x.key) {
      x = x.leftChild;
    } else {
      x = x.rightChild;
    }
  }
  z.setParent(y);
  if (y == null) {
    this.root = z;
  } else if (z.key < y.key) {
    y.setLeftChild(z);
  } else {
    y.setRightChild(z);
  }
  return [this.view()];
}

BST.prototype.del = function (key) {
}

/* Assigns a height to each node indicating the height of its
 * tallest subtree plus itself */
BST.prototype.height = function (node) {
  if (node == null) {
    return 0;
  } else {
    node.height = 1 + Math.max(this.height(node.leftChild), this.height(node.rightChild));
    return node.height;
  }
}

/* Stores visual information in each node for d3 */
BST.prototype.visuals = function (node) {
  if (node.parent) {
    node.cy = node.parent.cy + 30
    if (node.isLeftChild) {
      node.cx = node.parent.cx - Math.pow(2, node.height) * 20
    } else {
      node.cx = node.parent.cx + Math.pow(2, node.height) * 20
    }
  } else {
    node.cx = 0;
    node.cy = 0;
  }
  if (node.leftChild) {
    this.visuals(node.leftChild);
  }
  if (node.rightChild) {
    this.visuals(node.rightChild);
  }
}

/* Returns a BFS traversal of the BST */
BST.prototype.list = function (node) {
  var q = [node];
  var l = [node]
  while (q.length > 0) {
    var n = q.shift();
    if (n.leftChild) {
      l.push(n.leftChild);
      q.push(n.leftChild);
    }
    if (n.rightChild) {
      l.push(n.rightChild);
      q.push(n.rightChild);
    }
  }
  return l;
}

BST.prototype.view = function () {
  this.height(this.root);
  this.visuals(this.root)
  return this.list(this.root);
}

BST.prototype.type = "bst";

function BSTNode (key) {
  this.key = key;
  this.parent = null;
  this.depth = null;
  this.color = "black";
  this.leftChild = null;
  this.rightChild = null;
  this.isLeftChild = false;
}

BSTNode.prototype.setLeftChild = function (child) {
  this.leftChild = child;
  child.isLeftChild = true;
}

BSTNode.prototype.setRightChild = function (child) {
  this.rightChild = child;
}

BSTNode.prototype.setParent = function (parent) {
  this.parent = parent;
  this.depth = parent ? parent.depth + 1: 0;
}
