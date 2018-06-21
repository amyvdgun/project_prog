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

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, 1]);

        var y = d3.scale.ordinal()
            .rangeBands([height, 0], .2)
            .domain(data.map(function (d) {
                return d.name;
            }));

         // join
        var bar = svg.selectAll(".bar")
            .data(data);

        // update
        bar
        .transition()
            .attr("y", function(d){ return y(d[y_var]); })
            .attr("height", function(d){ return height - y(d[y_var]); });

        amount
        .transition()
            .attr("y", function(d){ return y(d[y_var]); })
            .text(function(d){ return d[y_var]; });

        // enter
        bar.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d){ return x(d[x_var]); })
            .attr("y", function(d){ return y(d[y_var]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d){ return height - y(d[y_var]); })
            .attr("fill", function(d){ return color(d[x_var]); });

        amount.enter().append("text")
            .attr("class", "amount")
            .attr("x", function(d){ return x(d[x_var]) + x.bandwidth() / 2; })
            .attr("y", function(d){ return y(d[y_var]); })
            .attr("dy", 16)
            .text(function(d){ return d[y_var]; });
    }
}