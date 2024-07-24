

// nodelink for network
// receive: number return nodelink
// d3.select("nodelink")
// selection : svg
function nodelink(){
    
    var width = 1000;
    var height = 600;
    var scaleSize = 5;
    var value;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    // var textArea;
    var event;
    // data
    var links;
    var nodes;
    var Tooltip;



    

    function nodelink(selection, parent)
    {
        function drawLine(selection){
            return ;
        }

        function drawCircle(selection){
            return ;
        }

        const simulation = d3.forceSimulation(nodes[value])
        .force("link", d3.forceLink(links[value]).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

        Tooltip = parent.append("div")
        // .html("tooltip area")
        .style("opacity", 1)
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("display", "inline-block");
        

        var mousemove = function(d) {
            // d3.select("#tooltip")
            Tooltip
            .html("name:" + d.id)
            .style("left", (d3.mouse(this)[0]+70 ) + "px")
            .style("top", (d3.mouse(this)[1] ) + "px");
            
            console.log(Tooltip);
        };

        var link = selection.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links[value])
        .enter()
        .append("line")
            // .attr("d": line)
            .attr("stroke-width", d => Math.sqrt(d.value));


        var node = selection.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes[value])
          .enter()
          .append("circle")
            .attr("r", scaleSize * 5)
            .attr("fill", d => color(d.group))
            .on("mousemove", mousemove);


        node.append("title")
        .text(d => d.id);


        simulation.on("tick", () => {
            link
                .attr("x1", d => scaleSize*d.source.x + x)
                .attr("y1", d => scaleSize*d.source.y + y)
                .attr("x2", d => scaleSize*d.target.x + x)
                .attr("y2", d => scaleSize*d.target.y + y);
        
            node
                .attr("cx", d => scaleSize*d.x  + x)
                .attr("cy", d => scaleSize*d.y + y);
          });

    }


    function updateNodelink(selection){

        const link = selection.selectAll("g").selectAll("line");
            

        const node = selection.selectAll("g").selectAll("circle");
            

        link.exit().remove();
        node.exit().remove();

        const simulation = d3.forceSimulation(nodes[value])
        .force("link", d3.forceLink(links[value]).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

        
        var mousemove = function(d) {
            // d3.select("#tooltip")
            Tooltip
            .html("name:" + d.id)
            .style("left", (d3.mouse(this)[0]+70 ) + "px")
            .style("top", (d3.mouse(this)[1] ) + "px");
            
            console.log(Tooltip);
        };

        link
        .selectAll("line")
        .data(links[value])
        .enter()
        .append("line")
            // .attr("d": line)
            .attr("stroke-width", d => Math.sqrt(d.value));


        node
          .selectAll("circle")
          .data(nodes[value])
          .enter()
          .append("circle")
            .attr("r", scaleSize * 5)
            .attr("fill", d => color(d.group))
            .on("mousemove", mousemove);


        node.append("title")
        .text(d => d.id);


        simulation.on("tick", () => {
            link
                .attr("x1", d => scaleSize*d.source.x + x)
                .attr("y1", d => scaleSize*d.source.y + y)
                .attr("x2", d => scaleSize*d.target.x + x)
                .attr("y2", d => scaleSize*d.target.y + y);
        
            node
                .attr("cx", d => scaleSize*d.x  + x)
                .attr("cy", d => scaleSize*d.y + y);
          });

    }

    nodelink.nodes = function(val){
        nodes = val;
        return nodelink;
    };
    nodelink.links = function(val){
        links = val;
        return nodelink;
    };
    nodelink.width = function(val){
        width = val;
        return nodelink;
    };
    nodelink.x = function(val){
        x = val;
        return nodelink;
    };
    nodelink.y = function(val){
        y = val;
        return nodelink;
    };
    nodelink.event = function(val){
        event = val;
        return nodelink;
    }
    nodelink.value = function(val){
        if(val == null){
            return value;
        }
        value = val;
        return nodelink;
    }

   nodelink.update = function(selection){
        updateNodelink(selection);
        return nodelink;
   }

//    nodelink.textArea = function(val){
//         textArea = val;
//         return nodelink;
//    }

   return nodelink;

}