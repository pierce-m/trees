function RedBlackTree(selection) {
    this.root = null;
    this.isEmpty = true;
}

RedBlackTree.prototype.insert = function(key) {
    if (this.isEmpty) {
        this.isEmpty = false;
        z = new RedBlackTreeNode(key, null, w / 2, 20);
    } else {
        z = new RedBlackTreeNode(key);
    }
    var ops = []
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
    //this.rebalance(z);
    return [{action:"ADD-CHILD", nodes:z.vis}];
}

RedBlackTree.prototype.del = function(key) {
}

//RedBlackTree.prototype.leftRotate = function (node) {
//    var y = node.rightChild;
//    node.setRightChild(y.leftChild);
//    if (y.leftChild != null) {
//        y.leftChild.parent = node;
//    }
//    y.parent = node.parent;
//    if (node.parent == null) {
//        this.root = y;
//    } else if (node == node.parent.leftChild) {
//        node.parent.setLeftChild(y);
//    } else {
//        node.parent.setRightChild(y);
//    }
//    y.setLeftChild(node);
//    node.parent = y;
//}
//
//RedBlackTree.prototype.rightRotate = function (node) {
//    var y = node.setLeftChild;
//    node.setLeftChild(y.rightChild);
//    if (y.rightChild != null) {
//        y.rightChild.parent = node;
//    }
//    y.parent = node.parent;
//    if (node.parent == null) {
//        this.root = y;
//    } else if (node == node.parent.leftChild) {
//        node.parent.setLeftChild(y);
//    } else {
//        node.parent.setRightChild(y);
//    }
//    y.setRightChild = node;
//    node.parent = y;
//}

RedBlackTree.prototype.rebalance = function(node) {
//    while (node.parent.color == "red") {
//        if (z.parent == z.parent.parent.leftChild) {
//            var y = z.parent.parent.rightChild;
//            if (y.color == "red") {
//                z.parent.color = "black";
//                y.color = "black";
//                z.parent.parent.color = "red";
//                z = z.parent.parent;
//            } else {
//                if (z == z.parent.rightChild) {
//                    z = z.parent;
//                    this.leftRotate(z);
//                }
//
//            }
//        }
//    }
}

RedBlackTree.prototype.type = "rb";

function RedBlackTreeNode(key, par, cx, cy) {
    this.key = key;
    this.color = "red";
    this.parent = par;
    this.cx = cx;
    this.cy = cy;
    this.leftChild = null;
    this.rightChild = null;
// the visual representation of this node
    this.vis = {"name":key, "parent": par, "children": []}; 
}

RedBlackTreeNode.prototype.setLeftChild = function (child) {
    this.leftChild = child;
    this.leftChild.cx = this.cx - 30;
    this.leftChild.cy = this.cy + 30;
    this.vis["children"].push(child);
}

RedBlackTreeNode.prototype.setRightChild = function (child) {
    this.RightChild = child;
    this.leftChild.cx = this.cx + 30;
    this.leftChild.cy = this.cy + 30;
    this.vis["children"].push(child);
}

RedBlackTreeNode.prototype.setParent = function (parent) {
    this.parent = parent;
    this.vis["parent"] = parent;
}
