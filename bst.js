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
  return [view(this)];
}

BST.prototype.del = function (key) {
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
