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
  return [{action:"ADD-CHILD", child:z}];
}

BST.prototype.del = function(key) {
}

BST.prototype.type = "bst";

function BSTNode(key, par) {
  this.key = key;
  this.parent = par;
  this.cx = 0;
  this.cy = 0;
  this.leftChild = null;
  this.rightChild = null;
}

BSTNode.prototype.setLeftChild = function (child) {
  this.leftChild = child;
  child.cx = this.cx - 20;
  child.cy = this.cy + 20;
}

BSTNode.prototype.setRightChild = function (child) {
  this.RightChild = child;
  child.cx = this.cx + 20;
  child.cy = this.cy + 20;
}

BSTNode.prototype.setParent = function (parent) {
  this.parent = parent;
}
