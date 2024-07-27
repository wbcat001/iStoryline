
// Interaction: click? -> get section number
// each point have own section
// background color
function StoryLine(){
    // var width = 100;
    var data;
    var entityNum;
    var x;
    var y;
    const margin = {top: 50, right: 30, bottom: 30, left: 40};

    var width = 1000 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    var event;
    var value=0;

    function entityLine(selection){

        console.log(width);
        

        const xscale = d3.scaleLinear()
            .domain([0, d3.max(data[0]["position"], d => d.x)])
            .range([0, width]);

        const yscale = d3.scaleLinear()
            .domain([0, d3.max(data[0]["position"], d => d.y)])
            .range([0, height]);

        
        var dragend = function(){
            console.log("dragend in storyline");
            var dragged = d3.select(this).attr("session");
            value = dragged;
            console.log(dragged);
            if(event){
                event();
            }
            d3.event.sourceEvent.stopPropagation();

        }
        

        var line = d3.line()
        .x((d) => xscale(d.x) + x)
        .y((d) => yscale(d.y) + y)
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
            .attr("stroke-width", "1")
            // .on("dragend", dragend);

            g
            .selectAll("circle")
            .data(data[i]["position"])
            .enter()
            .append("circle")
                .attr("cx", (d) => xscale(d.x) + x)
                .attr("cy", (d) => yscale(d.y) + y)
                .attr("r", 2)
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

    entityLine.width = function(val){
        width = val - margin.left - margin.right;
        return entityLine;
    }

    entityLine.height = function(val){
        height = val - margin.top - margin.bottom;
        return entityLine;
    }

    entityLine.data = function(val){
        data = val;
        entityNum = data.length;

        return entityLine;
    }

    entityLine.event = function(val){
        event = val;
        return entityLine;
    }

    entityLine.value = function(val){
        if(val == null){return value;}
        return entityLine;
    }
    
    return entityLine;
}