
// Interaction: click? -> get section number
// each point have own section
// background color
function StoryLine(){
    // var width = 100;
    var data;
    var entityNum;
    var x;
    var y;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};

    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    function entityLine(selection){


        

        const xscale = d3.scaleLinear()
            .domain([0, d3.max(data[0]["position"], d => d.x)])
            .range([0, width]);

        const yscale = d3.scaleLinear()
            .domain([0, d3.max(data[0]["position"], d => d.y)])
            .range([0, height]);

        
        var dragend = function(){
            console.log("dragend in storyline");
            var dragged = d3.select(this).attr("session");
            console.log(dragged);
        }
        

        var line = d3.line()
        .x((d) => xscale(d.x))
        .y((d) => yscale(d.y))
        // .attr("session", (d) => d.s)
        .curve(d3.curveMonotoneX);

        

        var Tooltip;

        for(var i=0; i<entityNum; i++){
            const g = selection.append("g") // .attr("id", data[i]["id"] + "line");

            g.append("path")
            .datum(data[i]["position"])
            .attr("d", line)
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("stroke-width", "2")
            // .on("dragend", dragend);

            g
                .selectAll("circle")
                .data(data[i]["position"])
                .enter()
                .append("circle")
                    .attr("cx", (d) => xscale(d.x))
                    .attr("cy", (d) => yscale(d.y))
                    .attr("r", 3)
                    .attr("fill", "red")
                    .attr("session" , (d) => d.s)
                    .call(d3.drag().on("end", dragend));

        }
        
        // selection.selectAll("path").call(d3.drag().on("end", dragend));



    }

    entityLine.x = function(val){
        x = val;
        return entityLine;
    }

    entityLine.y = function(val){
        y = val;
        return entityLine;
    }

    entityLine.x = function(val){
        x = val;
        return entityLine;
    }

    entityLine.data = function(val){
        data = val;
        entityNum = data.length;

        return entityLine;
    }

    
    return entityLine;
}