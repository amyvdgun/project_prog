/** 
 * Jesse Haenen
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

        var airportData = response[2];
        var airlineData = response[3];
        var index = selectionFinder(airportData, selection);
        var dataPoint = airportData[index];
        var airlineKeys = Object.keys(dataPoint.airlines);

        var data = []

        for (var i = 0; i < airlineKeys.length; i++) {
            var tempObject = {};
            tempObject.name = airlineKeys[i];    
            tempObject.ontime = 1 - (dataPoint.airlines[airlineKeys[i]].delays / dataPoint.airlines[airlineKeys[i]].flights);
            data.push(tempObject);
        }

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < airlineData.length; j++) {
                if (data[i].name == airlineData[j].name_iata) {
                    data[i].name = airlineData[j].name
                }
            }
        }

        var data = data.sort(function (a, b) {
            return d3.ascending(a.ontime, b.ontime);
        })    

        var margin = {top: 30, right: 45, bottom: 10, left: 0},
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
            .attr("class", "num-label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                if (d.ontime) {
                    return x(d.ontime) + 3;
                }
            })
            .text(function (d) {
                if (d.ontime) {
                    var format = d3.format(".2f")
                    return format(d.ontime);
                }
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