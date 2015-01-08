function BST() {
    this.root = null;
    this.isEmpty = true;
}

BST.prototype.insert = function(key) {
    z = new BSTNode(key, null);
    if (this.isEmpty) {
        this.isEmpty = false;
        this.root = z;
    }
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
    //this.rebalance(z);
    return [{action:"ADD-CHILD", nodes:z.vis}];
}

BST.prototype.del = function(key) {
}

BST.prototype.type = "bst";

function BSTNode(key, par, cx, cy) {
    this.key = key;
    this.parent = par;
    this.cx = cx;
    this.cy = cy;
    this.leftChild = null;
    this.rightChild = null;
// the visual representation of this node
    this.vis = {"name":key, "parent": par, "children": []}; 
}

BSTNode.prototype.setLeftChild = function (child) {
    this.leftChild = child;
    this.vis["children"].push(child);
}

BSTNode.prototype.setRightChild = function (child) {
    this.RightChild = child;
    this.vis["children"].push(child);
}

BSTNode.prototype.setParent = function (parent) {
    this.parent = parent;
    this.vis["parent"] = parent.key;
}
