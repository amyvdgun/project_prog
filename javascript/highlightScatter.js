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

    // // if use clicks a country not in the data set unhighlight
    // else {
    //     d3.selectAll(".dot").transition()
    //     .attr("opacity", 1)
    //     .attr("r", 3.5)
    //     .duration(400)
    // }
}