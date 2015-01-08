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
  var vistree = d3.layout.tree().size([w,  h]);
  /* svg on which to append tree nodes */
  var svg = d3.select(canvas)
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  /* Runs a series of updates on the existing visualization 
   * based on the commands supplied in ops.
   * @param ops, a list of operations 
   */
  function update(source) {
    for (var i = 0; i < source.length; i++) {
      var intermediate = source[i];
      console.log(intermediate);
      svg.selectAll("circle")
         .data(intermediate)
         .enter().append("circle")
         .attr("cx", function(d) { return d.cx + w / 2; })
         .attr("cy", function(d) { return d.cy + 20; })
         .attr("r", 15)
         .attr("id", function(d) { return d.key; })
         .attr("class", "node")
         .style("stroke", function(d) { return d.color; });
      svg.selectAll("circle")
         .attr("cx", function(d) { return d.cx + w / 2; })
         .attr("cy", function(d) { return d.cy + 20; })
         .attr("r", 15)
         .attr("id", function(d) { return d.key; })
         .attr("class", "node")
         .style("stroke", function(d) { return d.color; });
     svg.selectAll("text")
         .data(intermediate)
         .enter()
         .append("text")
         .attr("x", function(d) { return d.cx - 4.5 + w / 2; })
         .attr("y", function(d) { return d.cy + 4.5 + 20; })
         .text(function(d) { return d.key; });
     svg.selectAll("text")
         .attr("x", function(d) { return d.cx - 4.5 + w / 2; })
         .attr("y", function(d) { return d.cy + 4.5 + 20; })
         .text(function(d) { return d.key; });
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
