

function entityLine(){
    // var width = 100;
    var data;

    var x;
    var y;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};

    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    function entityLine(selection){


        const xscale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x)])
            .range([0, width]);

        const yscale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([0, height]);

            
        var line = d3.line()
        .x((d) => xscale(d.x))
        .y((d => yscale(d.y)))
        .curve(d3.curveMonotoneX);



        const g = selection.append("g");
        g.append("path")
        .datum(data)
        .attr("d", line)
        .attr("stroke", "#00f")
        .attr("fill", "none")
        .attr("stroke-width", "2");



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
        return entityLine;
    }

    
    return entityLine;
}