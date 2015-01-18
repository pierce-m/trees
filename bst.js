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
  var x = this.root;
  while (x.key != key) {
    if (x.key < key) {
      x = x.rightChild;
    } else if (x.key > key) {
      x = x.leftChild;
    }
  }
  if (x.leftChild == null) {
    this.transplant(x, x.rightChild);
  } else if (x.rightChild == null) {
    this.transplant(x, x.leftChild);
  } else {
    var y = x.rightChild;
    var z = y;
    while (y.leftChild != null) {
      z = y.leftChild;
      y = y.leftChild;
    }
    if (z != x.rightChild) {
      this.transplant(z, z.rightChild);
      z.setRightChild(x.rightChild)
      x.rightChild.setParent(z);
    }
    this.transplant(x, z);
    z.setLeftChild(x.leftChild);
    y.leftChild.setParent(y);
  }
  return [view(this)];
}

BST.prototype.transplant = function (u, v) {
  if (u.parent == null) {
    this.root = v;
  } else if (u.isLeftChild) {
    u.parent.setLeftChild(v);
  } else {
    u.parent.setRightChild(v);
  }
  if (v) {
    v.setParent(u.parent);
  }
}

BST.prototype.contains = function (key) {
  var x = this.root;
  while (x != null) {
    if (x.key < key) {
      x = x.rightChild;
    } else if (x.key > key) {
      x = x.leftChild;
    } else {
      return true;
    }
  }
  return false;
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
  if (child) {
    child.isLeftChild = true;
  }
}

BSTNode.prototype.setRightChild = function (child) {
  this.rightChild = child;
  if (child) {
    child.isLeftChild = false;
  }
}

BSTNode.prototype.setParent = function (parent) {
  this.parent = parent;
  this.depth = parent ? parent.depth + 1: 0;
}
