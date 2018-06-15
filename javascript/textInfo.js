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

    var format = d3.format(".2f")
    var textDiv = document.getElementById("textinfo");

    for (i = 0; i < data.length; i++) {
        if (data[i].name_iata == selection) {
            textDiv.innerHTML = "<br><h3>" + data[i].name + "<small class='text-muted'>" + " (" + data[i].name_iata + ")" + "</small>" + "</h3>" + "<br>" +
            "<p class='mb-0'><b>" + "City: </b>" + data[i].city + "</p>" +
            "<p class='mb-0'><b>" + "Number of flights: </b>" + data[i].flights + "</p>" +
            "<p class='mb-0'><b>" + "Delayed: </b>" + (data[i].delays) + "</p>" +
            "<p class='mb-0'><b>" + "% On time: </b>" + format(1 - (data[i].delays / data[i].flights)) + "</p>" +
            "<p class='mb-0'><b>" + "Average delay (min): </b>" + format(data[i].total_delay_m / data[i].flights) + "</p>" +
            "<p class='mb-0'><b>" + "Cancelled: </b>" + (data[i].cancelled) + "</p>"
        }
    }
 }