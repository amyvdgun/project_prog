/** 
 * Jesse Haenen
 * 10670742
 * 
 * Assignment week 5: linked views
 * 
 * Script that updates the climate graph scatter plot
 * based on datamap interaction. When a country is clicked
 * on the map, that country is enlarged, and the rest of the
 * dots fade out.
 *  
 **/

function highlightScatter(data, selection) {

    var found = false

    // check if the clicked country is in the climate data set
    for (var item in data) {

        // remove spaces from the country name if any
        if (data[item].name_iata == selection) {
            found = true
        }
    }

    // if so highlight the dot that corresponds with the seleciton
    if (found) {

        // blur the rest
        d3.selectAll(".dot").transition()
            .attr("opacity", 0.15)
            .attr("r", 1.5)
            .duration(300)
    
        // highlight the selected country
        d3.selectAll("#" + selection).transition()
            .attr("opacity", 1)
            .attr("r", 3.0)
            .duration(300)
    }
}

function updateRanks(data, selection) {

    if (selection.length == 2) {
        airlineData = response[3]
    }
    else {

        var airportData = response[2];
        var index = selectionFinder(airportData, selection);
        var dataPoint = airportData[index];
        var airlineKeys = Object.keys(dataPoint.airlines);
        // console.log(airlineKeys);
        // console.log(dataPoint);

        var data = []

        for (var i = 0; i < airlineKeys.length; i++) {
            tempObject = {};
            tempObject.name = airlineKeys[i];
            tempObject.ontime = 1 - (dataPoint.airlines[airlineKeys[i]].delays / dataPoint.airlines[airlineKeys[i]].flights);
            data.push(tempObject);
        }

        // console.log(data)

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
            .attr("id", "rank-svg")
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
        var barZ = bars.append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("fill", function(d) { return d3.interpolateRdYlGn(d.ontime) })
            .attr("width", function (d) {
                return x(d.ontime);
            });
            
            barZ.transition()
            .duration(500);

            barZ.on('mouseover', function(d){
                tip.show(d.name)
                d3.select(this).transition()
                    .style("stroke-opacity", 1.0)
                    .duration(200)
            })
            // .on('mouseout', tip.hide)
            .on('mouseout', function(d){
                tip.hide(d.name)
                d3.select(this).transition()
                    .style("stroke-opacity", 0.0)
                    .duration(200)
            })
            .on("mousemove", function() {
                var mouseX = d3.event.clientX;
                var mouseY = d3.event.clientY;
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
                return x(d.ontime) + 3;
            })
            .text(function (d) {
                var format = d3.format(".2f")
                return format(d.ontime);
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
                return (d.name);
            });
    }
}