/* Creates an svg object on the specified canvas (an element in the DOM) on which to
 * draw tree nodes. Returns a tree object with methods insert and delete.
 *
 * @param type, the type of tree to create
 * @param w, the desired width of svg 
 * @param h, the desired height of the svg 
 * @param canvas, the element on which to build the svg object 
 */
function makeTree(type, w, h, canvas) {

    /* Underlying d3 layout tree */
    var vistree = d3.layout.tree();
    /* svg on which to append tree nodes */
    var svg = d3.select(canvas)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    /* Runs a series of updates on the existing visualization based on
     * the commands supplied in ops.
     * @param ops, a list of operations 
     */
    function update(ops) {

        function RedBlackOps(type, ops) {
            for (var i in ops) {
                switch (ops[i].action) {
                    case "RECOLOR":
                        // switch color of included nodes
                        break;
                    case "LEFT-ROTATE":
                        // left rotate around node
                        break;
                    case "RIGHT-ROTATE":
                        // right rotate around node
                        break;
                    case "ADD-CHILD":
                        // adds a child to a node
                        break;
                }
            }
        }
    
        function BSTOps(ops) {
            for (var i in ops) {
                switch (ops[i].action) {
                    case "ADD-CHILD":
                        svg.selectAll("circle")
                           .data(vistree.nodes(ops[i].nodes))
                           .enter().append("circle")
                           .attr("class", "rb-node")
                           .attr("cx", function (d) { return d.x + w/2; })
                           .attr("cy", function (d) { return d.y + 20; })
                           .attr("r", 15)
                           .style("stroke", function(d) { return "black"; });
                        break;
                }
            }
        }

        switch (type) {
            case "bst":
                BSTOps(ops);
                break;
            case "rb":
                RedBlackOps(ops);
                break;
        }
    }

    /* The underlying tree datastructure */
    function tree(type) {
        this.type = type;
        switch (type) {
            case "bst":
                this.tree = new BST ();
                break;
            case "rb":
                this.tree = new RedBlackTree ();
                break;
            default:
                throw "Invalid tree type: " + type;
        }
    }

    tree.prototype.insert = function (val) {
        update(this.tree.insert(val));
    }

    tree.prototype.del = function (val) {
        update(this.tree.del(val));
    }

    return new tree(type);
}
