/** 
 * Jesse Haenen
 * 10670742
 * 
 * Minor Programmeren: Final project
 * 
 * This file contains scripts that are used numerous times throughout the
 * entire javascript folder.
 * 
 **/

 function selectionFinder(data, selection) {
    for (i = 0; i < data.length; i++) {
        if (data[i].name_iata == selection) {
            return i
        }
    }
 }