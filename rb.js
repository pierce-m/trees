function RedBlackTree(selection) {
  this.root = NIL;
}

RedBlackTree.prototype.insert = function(key) {
  var z = new RedBlackTreeNode(key);
  var y = NIL;
  var x = this.root;
  while (x != NIL) {
    y = x;
    if (z.key < x.key) {
      x = x.leftChild;
    } else {
      x = x.rightChild;
    }
  }
  z.setParent(y);
  if (y == NIL) {
    this.root = z;
  } else if (z.key < y.key) {
    y.setLeftChild(z);
  } else {
    y.setRightChild(z);
  }
  return this.insertRebalance(z);
}

RedBlackTree.prototype.del = function(key) {
  var z = this.root;
  while (z != NIL && key != z.key) {
    if (key < z.key) {
      z = z.leftChild;
    } else if (key > z.key) {
      z = z.rightChild;
    } else {
      break;
    }
  }
  var y = z;
  var yc = y.color;
  var x;
  if (z.leftChild == NIL) {
    x = z.rightChild;
    this.transplant(z, z.rightChild);
  } else if (z.rightChild == NIL) {
    x = z.leftChild;
    this.transplant(z, z.leftChild);
  } else {
    y = z.rightChild;
    var minnode = y;
    while (y.leftChild != NIL) {
      minnode = y;
      y = y.leftChild;
    }
    y = minnode;
    yc = y.color;
    x = y.rightChild;
    if (y.parent == z) {
      x.setParent(y);
    } else {
      this.transplant(y, y.rightChild);
      y.setRightChild(z.rightChild);
      y.rightChild.setParent(y);
    }
    this.transplant(z, y);
    y.setLeftChild(z.leftChild);
    y.leftChild.setParent(y);
    y.color = z.color;
  }
  if (yc == "black") {
    return this.deleteRebalance(x);
  } else {
    return [view(this)];
  }
}

RedBlackTree.prototype.transplant = function (u, v) {
  if (u.parent == NIL) {
    this.root = v;
  } else if (u.isLeftChild) {
    u.parent.setLeftChild(v);
  } else {
    u.parent.setRightChild(v);
  }
  v.setParent(u.parent);
}

RedBlackTree.prototype.contains = function (key) {
  var x = this.root;
  while (x != NIL) {
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
  if (y.leftChild != NIL) {
    y.leftChild.setParent(node);
  }
  y.setParent(node.parent);
  if (node.parent == NIL) {
    this.root = y;
  } else if (node.isLeftChild) {
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
  if (y.rightChild != NIL) {
    y.rightChild.setParent(node);
  }
  y.setParent(node.parent);
  if (node.parent == NIL) {
    this.root = y;
  } else if (node.isLeftChild) {
    node.parent.setLeftChild(y);
  } else {
    node.parent.setRightChild(y);
  }
  y.setRightChild(node);
  node.setParent(y);
}

RedBlackTree.prototype.insertRebalance = function(z) {
  var snapshots = [view(this)];
  while (z.parent.color == "red") {
    if (z.parent.isLeftChild) {
      var y = z.parent.parent.rightChild;
      if (y.color == "red") {
        z.parent.color = "black";
        z.parent.parent.rightChild.color = "black";
        z.parent.parent.color = "red";
        z = z.parent.parent;
      } else {
        if (z.key == z.parent.rightChild.key) {
          z = z.parent;
          this.leftRotate(z);
          snapshots.push(view(this));
        }
        z.parent.color = "black";
        z.parent.parent.color = "red";
        this.rightRotate(z.parent.parent);
      }
    } else {
      var y = z.parent.parent.leftChild;
      if (y.color == "red") {
        z.parent.color = "black";
        z.parent.parent.leftChild.color = "black";
        z.parent.parent.color = "red";
        z = z.parent.parent;
      } else {
        if (z.key == z.parent.leftChild.key) {
          z = z.parent;
          this.rightRotate(z);
          snapshots.push(view(this));
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

RedBlackTree.prototype.deleteRebalance = function(x) {
  var snapshots = [view(this)];
  while (x != this.root && x.color == "black") {
    if (x.isLeftChild) {
      var w = x.parent.rightChild;
      if (w.color == "red") {
        w.color = "black";
        x.parent.color = "red";
        this.leftRotate(x.parent);
        snapshots.push(view(this));
        w = x.rightChild;
      }
      if (w.leftChild.color == "black" && w.rightChild.color == "black") {
        w.color = "red";
        x = x.parent;
      } else {
        if (w.rightChild.color == "black") {
          w.leftChild.color = "black";
          w.color = "red";
          this.rightRotate(w);
          w = x.parent.rightChild;
          snapshots.push(view(this));
        }
        w.color = x.parent.color;
        x.parent.color = "black";
        this.leftRotate(x.parent);
        x = this.root;
        snapshots.push(view(this));
      }
    } else {
      var w = x.parent.leftChild;
      if (w.color == "red") {
        w.color = "black";
        x.parent.color = "red";
        this.rightRotate(x.parent);
        w = x.leftChild;
        snapshots.push(view(this));
      }
      if (w.rightChild.color == "black" && w.leftChild.color == "black") {
        w.color = "red";
        x = x.parent;
      } else {
        if (w.leftChild.color == "black") {
          w.rightChild.color = "black";
          w.color = "red";
          this.leftRotate(w);
          w = x.parent.leftChild;
          snapshots.push(view(this));
        }
        w.color = x.parent.color;
        x.parent.color = "black";
        this.rightRotate(x.parent);
        x = this.root;
        snapshots.push(view(this));
      }
    }
  }
  x.color = "black";
  snapshots.push(view(this));
  return snapshots;
}



RedBlackTree.prototype.type = "rb";

function RedBlackTreeNode(key) {
  this.key = key;
  this.depth = null;
  this.parent = NIL;
  this.color = "red";
  this.leftChild = NIL;
  this.rightChild = NIL;
  this.isLeftChild = false;
}

var NIL = new RedBlackTreeNode();
NIL.nil = true;
NIL.color = "black";

RedBlackTreeNode.prototype.setLeftChild = function (child) {
  this.leftChild = child;
  if (child && !child.nil) {
    child.isLeftChild = true;
  }
}

RedBlackTreeNode.prototype.setRightChild = function (child) {
  this.rightChild = child;
  if (child && !child.nil) {
    child.isLeftChild = false;
  }
}

RedBlackTreeNode.prototype.setParent = function (parent) {
  this.parent = parent;
  this.depth = !parent.nil ? parent.depth + 1: 0;
}
