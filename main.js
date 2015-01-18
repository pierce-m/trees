function makeTree(type, w, h, canvas) {

  var vistree = d3.layout.tree().size([w,  h]);
  var svg;

  function update(source) {
    for (var i = 0; i < source.length; i++) {
      var intermediate = source[i];
      var newNodes = svg.selectAll("circle").data(intermediate.nodes);
      var newLinks = svg.selectAll("line").data(intermediate.links);
      var newText = svg.selectAll("text").data(intermediate.nodes);

      newNodes.exit().remove();
      newNodes.transition().delay(i * TRANSITION_SPEED)
              .attr("cx", function(d) { return d.cx + w / 2; })
              .attr("cy", function(d) { return d.cy + VERT_OFFSET; })
              .style("stroke", function(d) { return d.color; });
      newNodes.enter().append("circle")
              .attr("cx", function(d) { return d.cx + w / 2; })
              .attr("cy", function(d) { return d.cy + VERT_OFFSET; })
              .attr("r", RADIUS)
              .attr("id", function(d) { return d.key; })
              .attr("class", "node")
              .style("stroke", function(d) { return d.color; });

      newLinks.exit().remove();
      newLinks.transition().delay(i * TRANSITION_SPEED)
              .attr("x1", function(d) { return d.parent.cx + w / 2; })
              .attr("x2", function(d) { return d.child.cx + w / 2; })
              .attr("y1", function(d) { return d.parent.cy + VERT_OFFSET; })
              .attr("y2", function(d) { return d.child.cy + VERT_OFFSET; });
      newLinks.enter().append("line")
                      .attr("x1", function(d) { return d.parent.cx + w / 2; })
                      .attr("x2", function(d) { return d.child.cx + w / 2; })
                      .attr("y1", function(d) { return d.parent.cy + VERT_OFFSET; })
                      .attr("y2", function(d) { return d.child.cy + VERT_OFFSET; })
                      .style("stroke", "black");

      newText.exit().remove();
      newText.transition().delay(i * TRANSITION_SPEED)
             .attr("x", function(d) { return d.cx - TEXT_OFFSET + w / 2; })
             .attr("y", function(d) { return d.cy + TEXT_OFFSET + VERT_OFFSET; })
             .text(function(d) { return d.key; });
      newText.enter().append("text")
                     .attr("x", function(d) { return d.cx - TEXT_OFFSET + w / 2; })
                     .attr("y", function(d) { return d.cy + TEXT_OFFSET + VERT_OFFSET; })
                     .text(function(d) { return d.key; });

    }
  }

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
    d3.select("svg").remove();
    svg = d3.select(canvas)
              .append("svg")
              .attr("width", w)
              .attr("height", h);
  }

  tree.prototype.insert = function (val) {
    if (!this.tree.contains(val)) {
      update(this.tree.insert(val));
    }
  }

  tree.prototype.del = function (val) {
    if (this.tree.contains(val)) {
      update(this.tree.del(val));
    }
  }

  return new tree(type);
}
