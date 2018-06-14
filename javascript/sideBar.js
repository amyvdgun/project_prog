/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * Loads the scrollable sidebar with the ranking of every airport and airline.
 * 
 **/

function sideBar(data){
    //sort bars based on value
    data = data.sort(function (a, b) {
        return d3.ascending(1 - (a.delays / a.flights), 1 - (b.delays / b.flights));
    })

    console.log(data)

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 0,
        right: 25,
        bottom: 0,
        left: 0
    };

    var width = 260 - margin.left - margin.right,
        height = 7000 - margin.top - margin.bottom;

    var svg = d3.select(".bd-sidebar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, 1]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));

    //make y axis to show bar names
    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     .tickSize(0)
    //     .orient("right");

    // var gy = svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

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
        });

    var tip = d3.tip()
        .attr("class", "tooltip")
        .offset([-10, 0])
        .html(function(d) {
            return d.name;
        })
    
    svg.call(tip);

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
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on("mousemove", function() {
            mouseX = d3.event.clientX;
            mouseY = d3.event.clientY;
            tip.style("top", mouseY + "px");
            tip.style("left", mouseX + "px");
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