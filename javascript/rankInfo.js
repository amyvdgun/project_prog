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

    console.log(selection.length);

    if (selection.length == 2) {

        console.log("Script for top AIRPORTS goes here");
    }
    else {
        console.log("Script for top AIRLINES goes here");

        airportData = response[0]
        airlineData = response[1]

        
    }
 }