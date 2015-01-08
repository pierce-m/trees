function BST() {
  this.root = null;
  this.isEmpty = true;
}

BST.prototype.insert = function(key) {
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
  z.parent = y;
  if (y == null) {
    this.root = z;
  } else if (z.key < y.key) {
    y.setLeftChild(z);
  } else {
    y.setRightChild(z);
  }
  return [this.jsView(this.root)];
}

BST.prototype.del = function(key) {
}

BST.prototype.jsView = function (node) {
  var c = [];
  if (node.leftChild) {
    c.push(this.jsView(node.leftChild));
  }
  if (node.rightChild) {
    c.push(this.jsView(node.rightChild));
  }
  return {
      name: node.key,
      children: c
  }
}

BST.prototype.type = "bst";

function BSTNode(key, par) {
  this.key = key;
  this.parent = par;
  this.leftChild = null;
  this.rightChild = null;
}

BSTNode.prototype.setLeftChild = function (child) {
  this.leftChild = child;
}

BSTNode.prototype.setRightChild = function (child) {
  this.rightChild = child;
}

BSTNode.prototype.setParent = function (parent) {
  this.parent = parent;
}
