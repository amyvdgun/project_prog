/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * Initialize the page by loading the data and calling all functions that draw 
 * visualizations.
 *  
 **/

window.onload = function() {

	d3.queue()
		.defer(d3.json, "data/airports_aggregated.json")
		.defer(d3.json, "data/airlines_aggregated.json")
		.awaitAll(initPage);
};

function initPage(error, response) {
    if (error) throw error;

    // get the data set from the response
    var airportData = response[0];
    var airlineData = response[1];

    console.log(airportData);

    sideBar(airportData);
}
