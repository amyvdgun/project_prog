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
        .defer(d3.json, "data/ranklist_airports_2.json")
        .defer(d3.json, "data/ranklist_airlines_2.json")
		.awaitAll(initPage);
};

function initPage(error, response) {
    if (error) throw error;
    sideBar(response);
}
