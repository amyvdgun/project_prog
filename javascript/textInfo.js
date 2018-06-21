/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * Draws textual information and the name of the selection on the page.
 * 
 **/

 function textInfo(data, selection) {

    var format = d3.format(".2f");
    var textDiv = document.getElementById("textinfo");
    var index = selectionFinder(data, selection);

    textDiv.innerHTML = "<br><h3>" + data[index].name + "<small class='text-muted'>" + " (" + data[index].name_iata + ")" + "</small>" + "</h3>" + "<br>" +
    "<p class='mb-0'><b>" + "City: </b>" + data[index].city + "</p>" +
    "<p class='mb-0'><b>" + "Number of flights: </b>" + data[index].flights + "</p>" +
    "<p class='mb-0'><b>" + "Delayed: </b>" + (data[index].delays) + "</p>" +
    "<p class='mb-0'><b>" + "% On time: </b>" + format(1 - (data[index].delays / data[index].flights)) + "</p>" +
    "<p class='mb-0'><b>" + "Average delay (min): </b>" + format(data[index].total_delay_m / data[index].flights) + "</p>" +
    "<p class='mb-0'><b>" + "Cancelled: </b>" + (data[index].cancelled) + "</p>"

}