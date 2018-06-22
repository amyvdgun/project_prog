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

function updateRanks(response, selection) {

    if (selection.length == 2) {
        airlineData = response[3]
    }
    else {

        var airportData = response[2];
        var airlineData = response[3];
        var index = selectionFinder(airportData, selection);
        var dataPoint = airportData[index];
        var airlineKeys = Object.keys(dataPoint.airlines);

        var data = []

        for (var i = 0; i < airlineKeys.length; i++) {
            tempObject = {};
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
            
        var bars = d3.select("#rank-svg")
            .selectAll(".bar")
            .data(data)

        bars.exit()
            .transition()
            .duration(300)
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .style('fill-opacity', 1e-6)
            .remove();

          // data that needs DOM = enter() (a set/selection, not an event!)
        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand());
        
         // the "UPDATE" set:
        bars.transition().duration(300)
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.ontime);
            })
            .attr("y", function(d) { return y(d.name); })
            .attr("height", y.rangeBand())
            .attr("fill", function(d) { return d3.interpolateRdYlGn(d.ontime) });

        var labels = d3.select("#rank-svg")
            .selectAll(".num-label")
            .data(data)
        
        labels.exit()
            .transition()
            .duration(300)
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            .style('fill-opacity', 1e-6)
            .remove();

        // data that needs DOM = enter() (a set/selection, not an event!)
        labels.enter().append("rect")
            .attr("class", "num-label")
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            });
        
        // the "UPDATE" set:
        labels.transition().duration(300)
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
    }
}