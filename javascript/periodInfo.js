/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * Draws visualisation where delays and flights are show for each day. Two
 * graphs are shown: one bar chart that shows the absolute number of flights 
 * for every day of the week / month, and one line that shows the percentage
 * of on time flights for that day of the week / month. 
 * User can use a button to toggle week/month view.
 *  
 **/

function periodInfo(response, selection, view) {

    if (selection.length == 2) {
        data = response[1];
    }
    else {

        var airportData = response[0],
            periodArray = [],
            flightArray = [],
            ontimeArray = [],
            data = [],
            index = selectionFinder(airportData, selection),
            dataPoint = airportData[index];

        if (view == "week") {
            var periodArray = ["mon", "tue", "web", "thu", "fri", "sat", "sun"];
            var flightArray = [
                dataPoint.flights_mon,
                dataPoint.flights_tue,
                dataPoint.flights_wed,
                dataPoint.flights_thu,
                dataPoint.flights_fri,
                dataPoint.flights_sat,
                dataPoint.flights_sun
            ];
            var ontimeArray = [
                1 - (dataPoint.delays_mon / dataPoint.flights_mon), 
                1 - (dataPoint.delays_tue / dataPoint.flights_tue),
                1 - (dataPoint.delays_wed / dataPoint.flights_wed),
                1 - (dataPoint.delays_thu / dataPoint.flights_thu),
                1 - (dataPoint.delays_fri / dataPoint.flights_fri),
                1 - (dataPoint.delays_sat / dataPoint.flights_sat),
                1 - (dataPoint.delays_sun / dataPoint.flights_sun)
            ];   
        }
        else {
            var periodArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
            var flightArray = [
                dataPoint.flights_jan,
                dataPoint.flights_feb,
                dataPoint.flights_mar,
                dataPoint.flights_apr,
                dataPoint.flights_may,
                dataPoint.flights_jun,
                dataPoint.flights_jul,
                dataPoint.flights_aug,
                dataPoint.flights_sep,
                dataPoint.flights_oct,
                dataPoint.flights_nov,
                dataPoint.flights_dec
            ];
            var ontimeArray = [
                1 - (dataPoint.delays_jan / dataPoint.flights_jan), 
                1 - (dataPoint.delays_feb / dataPoint.flights_feb),
                1 - (dataPoint.delays_mar / dataPoint.flights_mar),
                1 - (dataPoint.delays_apr / dataPoint.flights_apr),
                1 - (dataPoint.delays_may / dataPoint.flights_may),
                1 - (dataPoint.delays_jun / dataPoint.flights_jun),
                1 - (dataPoint.delays_jul / dataPoint.flights_jul),
                1 - (dataPoint.delays_aug / dataPoint.flights_aug),
                1 - (dataPoint.delays_sep / dataPoint.flights_sep),
                1 - (dataPoint.delays_oct / dataPoint.flights_oct),
                1 - (dataPoint.delays_nov / dataPoint.flights_nov),
                1 - (dataPoint.delays_dec / dataPoint.flights_dec)
            ];
        };

        for (var i = 0; i < periodArray.length; i++) {
            var tempObject = {};
            tempObject.period = periodArray[i];
            tempObject.ontime = ontimeArray[i];
            tempObject.flights = Number(flightArray[i]);
            data.push(tempObject);
        }

        console.log(data);

        // for (var i = 0; i < airlineKeys.length; i++) {
        //     tempObject = {};
        //     tempObject.name = airlineKeys[i];    
        //     tempObject.ontime = 1 - (dataPoint.airlines[airlineKeys[i]].delays / dataPoint.airlines[airlineKeys[i]].flights);
        //     data.push(tempObject);
        // }

        // for (var i = 0; i < data.length; i++) {
        //     for (var j = 0; j < airlineData.length; j++) {
        //         if (data[i].name == airlineData[j].name_iata) {
        //             data[i].name = airlineData[j].name
        //         }
        //     }
        // }

        var margin = {top: 30, right: 45, bottom: 10, left: 0},
            width = d3.select("#periodinfo").node().getBoundingClientRect().width - margin.left - margin.right,
            height = d3.select("#periodinfo").node().getBoundingClientRect().height - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, 1]);

        var y = d3.scale.ordinal()
            .rangeBands([height, 0], .2)
            .domain(data.map(function (d) {
                return d.period;
            }));

        var svg = d3.select("#periodinfo").append("period-svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        // var tip = d3.tip()
        //     .attr("class", "tooltip")
        //     .offset([-10, 0])
        //     .html(function(d) {
        //         return d.name;
        //     })

        // svg.call(tip);

        //append rects
        var barZ = bars.append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", function (d) {
                return y(d.period);
            })
            .attr("height", y.rangeBand())
            // .attr("fill", function(d) { return d3.interpolateRdYlGn(d.ontime) })
            .attr("width", function (d) {
                return x(d.flights);
            });
            
        barZ.transition()
        .duration(500);

        barZ.on('mouseover', function(d){
            tip.show(d.period)
            d3.select(this).transition()
                .style("stroke-opacity", 1.0)
                .duration(200)
        })
        // .on('mouseout', tip.hide)
        .on('mouseout', function(d){
            tip.hide(d.flights)
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
                return y(d.period) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.flights)
            })
            .text(function (d) {
                return (d.flights)
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.period) + y.rangeBand() / 2 + 4;
            })
            .attr("text-anchor", "left")
            .attr("x", 10)
            .text(function (d) {
                return (d.period);
            });
    }
}