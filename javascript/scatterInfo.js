/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * Draws textual information and the name of the selection on the page.
 * 
 **/

 function scatterInfo(data, selection) {
     console.log(data)
     console.log(selection)

     // set margins and svg size
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // set scale of axes
    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);
        
    // set scale of axes
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // append svg to the winegraph container
    var svg = d3.select("#weathergraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // convert data points to numeric
    data.forEach(function(d) {
        d.rainfall = +d.rainfall;
        d.temperature = +d.temperature;
    });

    // set domains for axes
    x.domain(d3.extent(data, function(d) { return d.rainfall; })).nice();
    y.domain([0, d3.max(data, function(d) { return d.temperature + 4; })]);

    // append invisible tooltip container
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // set tooltip content
    var tipMouseover = function(d) {
        var html  = d.country + "<br/>" +
                    "<b> Seasonal avg. temperature: </b>" + d.temperature + "<br/>" +
                    "<b> Seasonal avg. rainfall: </b>" + d.rainfall;

        tooltip.html(html)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
        .transition()
            .duration(200)
            .style("opacity", .9)

    };

    // tooltip mouseout
    var tipMouseout = function(d) {
        tooltip.transition()
            .duration(300)
            .style("opacity", 0);
    };

    // draw the dots in the scatter plot
    svg.selectAll(".dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("id", function(d) { return d.country.replace(/\s/g, ''); })
        .attr("r", 4.5)
        .attr("cx", function(d) { return x(d.rainfall); })
        .attr("cy", function(d) { return y(d.temperature); })
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout)

    // draw x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Rainfall (mm)");

    // draw y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Average temperature (celsius)")
 }