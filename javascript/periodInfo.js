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
            periodView = [],
            data = null;

        for (i = 0; i < airportData.length; i++) {
            if (airportData[i].name_iata == selection) {
                data = airportData[i]
            }
        }

        if (view == "week") {
            var periodView = ["mon", "tue", "web", "thu", "fri", "sat", "sun"];
        }
        else {
            var periodView = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
        };

        var margin = {top: 10, right: 45, bottom: 10, left: 0},
            width = d3.select("#periodinfo").node().getBoundingClientRect().width - margin.left - margin.right,
            height = d3.select("#periodinfo").node().getBoundingClientRect().height - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeBands([0, width], .2)
            // .domain(data.map(function (d) {
            //     return d.name;
            // }));
            .domain(periodView);

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([0, 1]);

        var svg = d3.select("#periodinfo").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bars = svg.selectAll(".bar")
            .data(periodView)
            .enter()
            .append("g")

        // var tip = d3.tip()
        //     .attr("class", "tooltip")
        //     .offset([-10, 0])
        //     .html(function(d) {
        //         return d.name;
        //     })

        // svg.call(tip);

        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("width", y.rangeBand())
            .attr("y", 0)
            // .attr("fill", function(d) { return d3.interpolateRdYlGn(1 - (d.delays / d.flights)) })
            .attr("height", function (d) {
                data["airline"]["delays_" + d]
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
            })
            .on("click", function() {

                if (document.getElementById("scatter-svg") != null) {
                    highlightScatter(data, this.__data__.name_iata);
                }
                else {
                    textInfo(data, this.__data__.name_iata);
                    scatterInfo(data, this.__data__.name_iata);
                    rankInfo(response, this.__data__.name_iata);
                    periodInfo(response, this.__data__.name_iata);
                }
            });

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