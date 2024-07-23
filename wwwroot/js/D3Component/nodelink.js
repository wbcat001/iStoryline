

// nodelink for network
// receive: number return nodelink
// d3.select("nodelink")

function nodelink(){
    
    var width = 1000;
    var height = 600;
    var scaleSize = 10;
    var value;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    var links;
    var nodes;

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    function nodelink(selection)
    {
        function drawLine(selection){
            return ;
        }

        function drawCircle(selection){
            
        }



        var Tooltip = selection.append("div")
        .style("opacity", 1)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

        var mousemove = function(d) {
            Tooltip
            .html("name:" + d.id)
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px");
    
            console.log(d);
        };

        var link
        var node

        node.append("title")
        .text(d => d.id);


        simulation.on("tick", () => {
            link
                .attr("x1", d => scaleSize*d.source.x)
                .attr("y1", d => scaleSize*d.source.y)
                .attr("x2", d => scaleSize*d.target.x)
                .attr("y2", d => scaleSize*d.target.y);
        
            node
                .attr("cx", d => scaleSize*d.x)
                .attr("cy", d => scaleSize*d.y);
          });


        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        // Update the subject (dragged node) position during drag.
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        // When this cell is re-run, stop the previous simulation. (This doesn’t
        // really matter since the target alpha is zero and the simulation will
        // stop naturally, but it’s a good practice.)
        // invalidation.then(() => simulation.stop());

    }

    nodelink.nodes
    nodelink.links
    nodelink.event
    nodelink.x
    nodelink.y
    nodelink.width

}