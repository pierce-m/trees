function RedBlackTree(selection) {
  this.root = null;
}

RedBlackTree.prototype.insert = function(key) {
  var z = new RedBlackTreeNode(key);
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
  return this.insertRebalance(z);
}

RedBlackTree.prototype.del = function(key) {
}

RedBlackTree.prototype.contains = function (key) {
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

RedBlackTree.prototype.leftRotate = function (node) {
  var y = node.rightChild;
  node.setRightChild(y.leftChild);
  if (y.leftChild) {
    y.leftChild.setParent(node);
  }
  y.setParent(node.parent);
  if (node.parent == null) {
    this.root = y;
  } else if (node == node.parent.leftChild) {
    node.parent.setLeftChild(y);
  } else {
    node.parent.setRightChild(y);
  }
  y.setLeftChild(node);
  node.setParent(y);
}

RedBlackTree.prototype.rightRotate = function (node) {
  var y = node.leftChild;
  node.setLeftChild(y.rightChild);
  if (y.rightChild) {
    y.rightChild.setParent(node);
  }
  y.setParent(node.parent);
  if (node.parent == null) {
    this.root = y;
  } else if (node == node.parent.leftChild) {
    node.parent.setLeftChild(y);
  } else {
    node.parent.setRightChild(y);
  }
  y.setRightChild(node);
  node.setParent(y);
}

RedBlackTree.prototype.insertRebalance = function(z) {
  var snapshots = [view(this)];
  while (z.parent && z.parent.color == "red") {
    if (z.parent.isLeftChild) {
      var y = z.parent.parent.rightChild;
      if (y && y.color == "red") {
        z.parent.color = "black";
        z.parent.parent.rightChild.color = "black";
        z.parent.parent.color = "red";
        z = z.parent.parent;
      } else {
        if (z.parent.right && z.key == z.parent.right.key) {
          z = z.parent;
          this.leftRotate(z);
        }
        z.parent.color = "black";
        z.parent.parent.color = "red";
        this.rightRotate(z.parent.parent);
      }
    } else {
      var y = z.parent.parent.leftChild;
      if (y && y.color == "red") {
        z.parent.color = "black";
        z.parent.parent.leftChild.color = "black";
        z.parent.parent.color = "red";
        z = z.parent.parent;
      } else {
        if (z.parent.right && z.key == z.parent.right.key) {
          z = z.parent;
          this.rightRotate(z);
        }
        z.parent.color = "black";
        z.parent.parent.color = "red";
        this.leftRotate(z.parent.parent);
      }
    }
    snapshots.push(view(this));
  }
  this.root.color = "black";
  snapshots.push(view(this));
  return snapshots;
}

RedBlackTree.prototype.type = "rb";

function RedBlackTreeNode(key) {
  this.key = key;
  this.depth = null;
  this.parent = null;
  this.color = "red";
  this.leftChild = null;
  this.rightChild = null;
  this.isLeftChild = false;
}

RedBlackTreeNode.prototype.setLeftChild = function (child) {
  this.leftChild = child;
  if (child) {
    child.isLeftChild = true;
  }
}

RedBlackTreeNode.prototype.setRightChild = function (child) {
  this.rightChild = child;
  if (child) {
    child.isLeftChild = false;
  }
}

RedBlackTreeNode.prototype.setParent = function (parent) {
  this.parent = parent;
  this.depth = parent ? parent.depth + 1: 0;
}
