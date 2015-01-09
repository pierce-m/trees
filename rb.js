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
    z.parent = y;
    if (y == null) {
        this.root = z;
    } else if (z.key < y.key) {
        y.setLeftChild(z);
    } else {
        y.setRightChild(z);
    }
}

RedBlackTree.prototype.del = function(key) {
}

RedBlackTree.prototype.leftRotate = function (node) {
    var y = node.rightChild;
    node.setRightChild(y.leftChild);
    if (y.leftChild != null) {
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
    var y = node.setLeftChild;
    node.setLeftChild(y.rightChild);
    if (y.rightChild != null) {
        y.rightChild.setParent(node);
    }
    y.parent = node.parent;
    if (node.parent == null) {
        this.root = y;
    } else if (node == node.parent.leftChild) {
        node.parent.setLeftChild(y);
    } else {
        node.parent.setRightChild(y);
    }
    y.setRightChild = node;
    node.setParent(y);
}

RedBlackTree.prototype.rebalance = function(node) {
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
    child.isLeftChild = true;
}

RedBlackTreeNode.prototype.setRightChild = function (child) {
    this.RightChild = child;
}

RedBlackTreeNode.prototype.setParent = function (parent) {
  this.parent = parent;
  this.depth = parent ? parent.depth + 1: 0;
}
