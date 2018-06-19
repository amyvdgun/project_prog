/** 
 * Name: jongen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * If this script is ran with a selection variable that is of lenght 3 
 * (airport IATA codes), the script shows the top and bottom 3 airlines for that
 * depart from specific airport (in terms of flying on time).
 * If the script is ran with a selection variable that is of lenght 2 (airline
 * IATA codes), the script shows the top and bottom 3 airports from which that
 * airline departs.
 * 
 **/

function rankInfo(response, selection) {

    if (selection.length == 2) {
        airlineData = response[3];

    }
    else {
        airportData = response[2][selection];        
        
        var margin = {top: 10, right: 45, bottom: 10, left: 0},
        width = d3.select("#rankinfo").node().getBoundingClientRect().width - margin.left - margin.right,
        height = d3.select("#rankinfo").node().getBoundingClientRect().height - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, 1]);

        var y = d3.scale.ordinal()
            .rangeBands([height, 0], .2)
            .domain(data.map(function (d) {
                return d.name;
            }));

        var svg = d3.select("#rankinfo").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        var tip = d3.tip()
            .attr("class", "tooltip")
            .offset([-10, 0])
            .html(function(d) {
                return d.name;
            })

        svg.call(tip);

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("fill", function(d) { return d3.interpolateRdYlGn(1 - (d.delays / d.flights)) })
            .attr("width", function (d) {
                return x(1 - (d.delays / d.flights));
            })
            // .on('mouseover', tip.show)
            .on('mouseover', function(d){
                tip.show(d)
                d3.select(this).transition()
                    .style("stroke-opacity", 1.0)
                    .duration(200)
            })
            // .on('mouseout', tip.hide)
            .on('mouseout', function(d){
                tip.hide(d)
                d3.select(this).transition()
                    .style("stroke-opacity", 0.0)
                    .duration(200)
            })
            .on("mousemove", function() {
                mouseX = d3.event.clientX;
                mouseY = d3.event.clientY;
                tip.style("top", mouseY + "px");
                tip.style("left", mouseX + "px");
            });
            // .on("click", function() {
            //     textInfo(data, this.__data__.name_iata);

            //     if (document.getElementById("scatter-svg") != null) {
            //         highlightScatter(data, this.__data__.name_iata);
            //     }
            //     else {
            //         scatterInfo(data, this.__data__.name_iata);
            //     };

            //     rankInfo(response, this.__data__.name_iata);
            // });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(1 - (d.delays / d.flights)) + 3;
            })
            .text(function (d) {
                var format = d3.format(".2f")
                return format((1 - (d.delays / d.flights)));
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            .attr("text-anchor", "left")
            .attr("x", 10)
            .text(function (d) {
                return (d.name_iata);
            });
    }
}