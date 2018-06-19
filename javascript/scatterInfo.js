/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * Draws textual information and the name of the selection on the page.
 * 
 **/

//  TODO: REMOVE SELECTION ARGUMENT IF NOT USED

 function scatterInfo(data, selection) {

    var format = d3.format(".2f")

     // set margins and svg size
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = d3.select("#scatterinfo").node().getBoundingClientRect().width - margin.left - margin.right,
        height = d3.select("#scatterinfo").node().getBoundingClientRect().height - margin.top - margin.bottom;

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
    var svg = d3.select("#scatterinfo").append("svg")
        .attr("id", "scatter-svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // // convert data points to numeric
    // data.forEach(function(d) {
    //     d.rainfall = +d.rainfall;
    //     d.temperature = +d.temperature;
    // });

    // set domains for axes
    x.domain(d3.extent(data, function(d) {
        return Number(format(1 - (d.delays / d.flights))); })).nice();
    
    y.domain(d3.extent(data, function(d) {
        return Number(format(d.total_delay_m / d.flights)); })).nice();
    
    // console.log(extent(data, function(d) {
    //     return format(d.total_delay_m / d.flights); }))
    // console.log(y(0))
    // console.log(y(10))

    // append invisible tooltip container
    // var tooltip = d3.select("body").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);

    // // set tooltip content
    // var tipMouseover = function(d) {
    //     var html  = d.name;

    //     tooltip.html(html)
    //         .style("left", (d3.event.pageX + 15) + "px")
    //         .style("top", (d3.event.pageY - 28) + "px")
    //     .transition()
    //         .duration(200)
    //         .style("opacity", .9)
    // };

    // tooltip mouseout
    // var tipMouseout = function(d) {
    //     tooltip.transition()
    //         .duration(300)
    //         .style("opacity", 0);
    // };

    // draw the dots in the scatter plot
    svg.selectAll(".dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("id", function(d) { return d.name_iata; })
        .attr("r", 1.5)
        .attr("cx", function(d) { return x(format(1 - (d.delays / d.flights))); })
        .attr("cy", function(d) { return y(format(d.total_delay_m / d.flights)); })
        // .on("mouseover", tipMouseover)
        // .on("mouseout", tipMouseout)

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
        .text("% On time");

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
        .text("Average delay (min)")
 }