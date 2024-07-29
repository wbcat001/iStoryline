

// nodelink for network
// receive: number return nodelink
// d3.select("nodelink")
// selection : svg

// Data: relationship
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

    const ColorSet = {"positive": "green", "negative": "red", "neutral": "black"};

    

    

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

        // selection.attr("position", "relative");

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
        .style("white-space", "pre-line")
        // .style("position", "absolute")
        .style("visibility", "hidden");

        // .style("display", "inline-block");
        

        selection.append("svg:defs")
        .selectAll("marker")
        .data(links[value])
        .enter()
        .append("svg:marker")
        .attr("id", "marker")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 50) // R
        .attr("refY", -0.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        // .attr("orient", "auto-start-reverse")
        .attr("orient", "auto")
        .attr("fill", "black")
        .append("svg:path")
        .attr("d", "M 0,0 L 10,5 L 10, -5"); // marker
        // 反対

        var mousemove = function(d) {
            
            Tooltip
            .html("name:" + d.id)
            .style("left", (d3.mouse(this)[0]+30 ) + "px")
            .style("top", (d3.mouse(this)[1] ) + "px")
            .style("visibility", "visible")
            
            console.log(Tooltip);
        };

        var mousemovelink = function(d){
            console.log(d);
            Tooltip
            .html(  d.source.id + "->" + d.target.id + "\n" 
                // + "relationship: " + d.relationship + "\n"
                + "detail: " + d.relationship
            )
            .style("left", (d3.mouse(this)[0]+30 ) + "px")
            .style("top", (d3.mouse(this)[1] ) + "px")
            .style("visibility", "visible");

        }

        var link = selection.append("g")
            // .attr("transform")
            .attr("stroke", "black")
            .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links[value])
        .enter()
        .append("line")
            .attr("stroke", (d) => ColorSet[d.sentiment])
            .attr("marker-end", "url(#marker)")
            .attr("stroke-width", 2)
        .on("mousemove", mousemovelink);


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

        var label = selection.append("g")
        .selectAll("text")
        .data(nodes[value])
        .enter()
        .append("text")
        .text((d) => d.id )
        .attr("fill", "black")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle");

        
        // node.append("text")
        // .text((d) => d.id)
        // .attr("fill", "black")
        // .attr("font-size", "12px")
        // .attr("text-anchor", "middle");



        simulation.nodes(nodes[value]);
        // simulation.label(nodes[value]);

        function calcAngle(x1, y1, x2, y2){
            var product = x1 * x2 + y1 * y2;
            var costheta = product / (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2));
            // console.log(costheta)
            var theta = Math.acos(costheta);
            // console.log(theta);
            return theta;
        }

        simulation.on("tick", () => {

            // var theta = calcAngle(d.source.x, d.source.y, d.target.x, d.target.y);
            // console.log(theta);
            // var theta;
            var delta = 0.1;
            var r = 0;
            link
                .each(function(d){
                    var theta = calcAngle(d.source.x, d.source.y, d.target.x, d.target.y);
                    d.theta = theta;
                    // console.log(theta);
                    // console.log(scaleSize*d.source.x + x + theta)
                })
                .attr("x1", d => scaleSize*d.source.x + x + r * Math.cos(d.theta + delta))
                .attr("y1", d => scaleSize*d.source.y + y + r * Math.sin(d.theta + delta))
                .attr("x2", d => scaleSize*d.target.x + x + r * Math.cos(d.theta - delta))
                .attr("y2", d => scaleSize*d.target.y + y + r * Math.sin(d.theta - delta))
                
            node
                .attr("cx", d => scaleSize*d.x  + x)
                .attr("cy", d => scaleSize*d.y + y);

            label
                .attr("x", d => scaleSize*d.x + x )
                .attr("y", d => scaleSize*d.y + y - 25)
          });

    }


    function updateNodelink(selection){
        

  

        selection.selectAll("g").remove();
        selection.selectAll("g").remove();
            

    

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

        var mousemovelink = function(d){
            console.log(d);
            Tooltip
            .html(  d.source.id + "->" + d.target.id + "\n" 
                // + "relationship: " + d.relationship + "\n"
                + "detail: " + d.relationship
            )
            .style("left", (d3.mouse(this)[0]+70 ) + "px")
            .style("top", (d3.mouse(this)[1] ) + "px");
        }


        const link = selection.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links[value])
        .enter()
        .append("line")
            .attr("stroke-width", 2)
            .attr("stroke", (d) => ColorSet[d.sentiment])
            .attr("marker-end", "url(#marker)")
        .on("mouseover", mousemovelink);


        const node = 
          selection.append("g")
          .selectAll("circle")
          .data(nodes[value])
          .enter()
          .append("circle")
            .attr("r", scaleSize * 2)
            .attr("fill", d => color(d.group))
            .on("mousemove", mousemove);

        var label = selection.append("g")
            .selectAll("text")
            .data(nodes[value])
            .enter()
            .append("text")
            .text((d) => d.id )
            .attr("fill", "black")
            .attr("font-size", "20px")
            .attr("text-anchor", "middle");

        

        node.append("title")
        .text(d => d.id);

        simulation.nodes(nodes[value]);
        

        function calcAngle(x1, y1, x2, y2){
            var v1  = x2 - x1;
            var v2 = y2 - y1;
            var len = Math.sqrt(v1 * v1 + v2 * v2);
            var costheta = v1 / len;
            var sintheta = v2 / len;
            // console.log(costheta)
            var theta = Math.acos(costheta);
            // console.log(theta);
            // if(sintheta < 0){
            //     theta += Math.PI;
            // } if cos
            return theta;
        }

        function calcDXY(x1, y1, x2, y2){

            var v1  = x2 - x1;
            var v2 = y2 - y1;
            
            return ;
        }


        simulation.on("tick", () => {
            // var theta;
            var delta = 0.2;
            var r = scaleSize * 2;
            link
                .each(function(d){
                    var theta = calcAngle(d.source.x, d.source.y, d.target.x, d.target.y);
                    d.theta = theta;
                    
                })
                .attr("x1", d => scaleSize*d.source.x + x + r * Math.cos(d.theta + delta))
                .attr("y1", d => scaleSize*d.source.y + y + r * Math.sin(d.theta + delta))
                .attr("x2", d => scaleSize*d.target.x + x - r * Math.cos(d.theta - delta + Math.PI))
                .attr("y2", d => scaleSize*d.target.y + y - r * Math.sin(d.theta - delta + Math.PI))
                
            node
                .attr("cx", d => scaleSize*d.x  + x)
                .attr("cy", d => scaleSize*d.y + y);

            label
                .attr("x", d => scaleSize*d.x + x )
                .attr("y", d => scaleSize*d.y + y - 25);
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