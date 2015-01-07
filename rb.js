function RedBlackTree(selection) {
    this.root = null;
    this.canvas = selection;
}

RedBlackTree.prototype.insert = function(key) {
    z = new RedBlackTreeNode(key);
    var y = null;
    x = this.root;
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
    this.rebalance(z);
}

RedBlackTree.prototype.del = function(key) {
}

RedBlackTree.prototype.leftRotate = function (node) {
    var y = node.rightChild;
    node.setRightChild(y.leftChild);
    if (y.leftChild != null) {
        y.leftChild.parent = node;
    }
    y.parent = node.parent;
    if (node.parent == null) {
        this.root = y;
    } else if (node == node.parent.leftChild) {
        node.parent.setLeftChild(y);
    } else {
        node.parent.setRightChild(y);
    }
    y.setLeftChild(node);
    node.parent = y;
}

RedBlackTree.prototype.rightRotate = function (node) {
    var y = node.setLeftChild;
    node.setLeftChild(y.rightChild);
    if (y.rightChild != null) {
        y.rightChild.parent = node;
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
    node.parent = y;
}

RedBlackTree.prototype.rebalance = function(node) {
}

RedBlackTree.prototype.type = "rb";

function RedBlackTreeNode(key, par) {
    this.key = key;
    this.color = "red";
    this.visual = {"name": key, children: []};
    this.parent = par;
    this.leftChild = null;
    this.rightChild = null;
}

RedBlackTreeNode.prototype.setLeftChild = function (child) {
    this.leftChild = child;
}

RedBlackTreeNode.prototype.setRightChild = function (child) {
    this.RightChild = child;
}
