function doubleSlider(){
    var width = 100;
    var value = 0.0;

    var event;
    // position of slider component
    var x = 0;
    var y = 0;

    // selection: SVG
    function slider(selection){

        function drawLine(x1, x2, strokeColor, selection){
            return selection.append("line")
                .attr("x1", x1)
                .attr("x2", x2)
                .attr("y1", y)
                .attr("y2", y)
                .style("stroke", strokeColor)
                .style("stroke-width", 2);
        }

        function drawCircle(x, y, strokeColor, selection){
            return selection.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 10)
                .style({
                    "stroke": strokeColor,
                    "stroke-width": 1.0,
                    "fill" : "white"
                });
        }

        var drag = function(){
                var newX = d3.mouse(this)[0];
                
                if(newX < x){
                    newX = x;
                }else if (newX > x + width){
                    newX = x + width;
                }

                value = (newX - x) / width;
               

                d3.select(this).attr("cx", newX);
                d3.select("#valueLine").attr("x2", x + (value * width));
                d3.select("#emptyLine").attr("x1", x + (value * width));
                

            }

        var dragend = function(){
                if(event){
                    console.log("end");
                    event();
                }
                console.log("end function");

                d3.event.sourceEvent.stopPropagation();
            };




        const valueLine = drawLine(
            x,
            x + (width *value),
            "red",
            selection
        ).attr("id", "valueLine");

        

        const emptyLine = drawLine(
            x + (width * value),
            x + (width * 1.0),
            "#ECECEC",
            selection
        ).attr("id", "emptyLine");

        const valueCircle = drawCircle(
            x + (width * value),
            y,
            "black",
            selection
        );
      
        

        selection.selectAll("circle").call(d3.drag()
                                        .on("drag", drag)
                                        .on("end", dragend));
    }

        

    slider.x = function(val){
        x = val;
        return slider;
    }
    slider.y = function(val){
        y = val;
        return slider;
    }
    
    slider.value = function(val){
        if(val == null){
            return value;
        }
        value = val;
        return slider;
    }

    slider.width = function(val){
        width = val;
        return slider;

    }

    slider.event = function(val){
        event = val;
        return slider;
    }

    
    slider.update = function(){
        return slider;
    }

    return slider;
    
}