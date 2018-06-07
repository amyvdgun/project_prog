"""
Jesse Haenen (10670742)
Eindproject Minor Programmeren

This script will preprocess the original data file of flight delays to aggregated levels. The result of this process will be two seperate files; one for airlines and one for airports in the U.S.
"""

import csv

# write airports file
with open("data/flights.csv", "r", newline="") as fl:
    with open("data/airports.csv", "r", newline="") as ap:
    
        flights = csv.DictReader(fl, delimiter=",")
        airports = csv.DictReader(ap, delimiter=",")

        for airport in airports:

            # TOTAL
            # temp variables
            airport_temp = {}
            flight_counter = 0
            delay_counter = 0
            cancel_counter = 0
            early_counter = 0
            total_delay = 0

            # DAYS
            # temp variables mon
            flight_counter_mon = 0
            delay_counter_mon = 0
            total_delay_mon = 0

            # temp variables tue
            flight_counter_tue = 0
            delay_counter_tue = 0
            total_delay_tue = 0

            # temp variables wed
            flight_counter_wed = 0
            delay_counter_wed = 0
            total_delay_wed = 0

            # temp variables thu
            flight_counter_thu = 0
            delay_counter_thu = 0
            total_delay_thu = 0

            # temp variables fri
            flight_counter_fri = 0
            delay_counter_fri = 0
            total_delay_fri = 0

            # temp variables sat
            flight_counter_sat = 0
            delay_counter_sat = 0
            total_delay_sat = 0

            # temp variables sun
            flight_counter_sun = 0
            delay_counter_sun = 0
            total_delay_sun = 0

            # MONTHS
            # temp variables jan
            flight_counter_jan = 0
            delay_counter_jan = 0
            total_delay_jan = 0

            # temp variables feb
            flight_counter_feb = 0
            delay_counter_feb = 0
            total_delay_feb = 0

            # temp variables mar
            flight_counter_mar = 0
            delay_counter_mar = 0
            total_delay_mar = 0

            # temp variables apr
            flight_counter_apr = 0
            delay_counter_apr = 0
            total_delay_apr = 0

            # temp variables may
            flight_counter_may = 0
            delay_counter_may = 0
            total_delay_may = 0

            # temp variables jun
            flight_counter_jun = 0
            delay_counter_jun = 0
            total_delay_jun = 0

            # temp variables jul
            flight_counter_jul = 0
            delay_counter_jul = 0
            total_delay_jul = 0

            # temp variables aug
            flight_counter_aug = 0
            delay_counter_aug = 0
            total_delay_aug = 0

            # temp variables sep
            flight_counter_sep = 0
            delay_counter_sep = 0
            total_delay_sep = 0

            # temp variables oct
            flight_counter_oct = 0
            delay_counter_oct = 0
            total_delay_oct = 0

            # temp variables nov
            flight_counter_nov = 0
            delay_counter_nov = 0
            total_delay_nov = 0

            # temp variables dec
            flight_counter_dec = 0
            delay_counter_dec = 0
            total_delay_dec = 0

            for flight in flights:
                if flight["ORIGIN_AIRPORT"] == airport["IATA_CODE"]:
                    
                    flight_counter += 1

                    if flight["DEPARTURE_DELAY"] > 0:
                        delay_counter += 1
                        total_delay += flight["DEPARTURE_DELAY"]
                    
                    if flight["CANCELLED"] = 1
                        cancel_counter += 1

                    if flight["DEPARTURE_DELAY"] < 0:
                        early_counter += 1     

                    if flight["DAY_OF_WEEK"] == 1:
                        flight_counter_mon += 1
                        delay_counter_mon += 1
                        total_delay_mon += flight["DEPARTURE_DELAY"]
                    
                    if flight["DAY_OF_WEEK"] == 2:
                        flight_counter_tue += 1
                        delay_counter_tue += 1
                        total_delay_tue += flight["DEPARTURE_DELAY"]

                    if flight["DAY_OF_WEEK"] == 3:
                        flight_counter_wed += 1
                        delay_counter_wed += 1
                        total_delay_wed += flight["DEPARTURE_DELAY"]

                    if flight["DAY_OF_WEEK"] == 4:
                        flight_counter_thu += 1
                        delay_counter_thu += 1
                        total_delay_thu += flight["DEPARTURE_DELAY"]

                    if flight["DAY_OF_WEEK"] == 5:
                        flight_counter_fri += 1
                        delay_counter_fri += 1
                        total_delay_fri += flight["DEPARTURE_DELAY"]

                    if flight["DAY_OF_WEEK"] == 6:
                        flight_counter_sat += 1
                        delay_counter_sat += 1
                        total_delay_sat += flight["DEPARTURE_DELAY"]
                    
                    if flight["DAY_OF_WEEK"] == 7:
                        flight_counter_sun += 1
                        delay_counter_sun += 1
                        total_delay_sun += flight["DEPARTURE_DELAY"]

                    if flight["MONTH"] == 1:
                        flight_counter_jan += 1
                        delay_counter_jan += 1
                        total_delay_jan += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 2:
                        flight_counter_feb += 1
                        delay_counter_feb += 1
                        total_delay_feb += flight["DEPARTURE_DELAY"]

                    if flight["MONTH"] == 3:
                        flight_counter_mar += 1
                        delay_counter_mar += 1
                        total_delay_mar += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 4:
                        flight_counter_apr += 1
                        delay_counter_apr += 1
                        total_delay_apr += flight["DEPARTURE_DELAY"]

                    if flight["MONTH"] == 5:
                        flight_counter_may += 1
                        delay_counter_may += 1
                        total_delay_may += flight["DEPARTURE_DELAY"]

                    if flight["MONTH"] == 6:
                        flight_counter_jun += 1
                        delay_counter_jun += 1
                        total_delay_jun += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 7:
                        flight_counter_jul += 1
                        delay_counter_jul += 1
                        total_delay_jul += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 8:
                        flight_counter_aug += 1
                        delay_counter_aug += 1
                        total_delay_aug += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 9:
                        flight_counter_sep += 1
                        delay_counter_sep += 1
                        total_delay_sep += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 10:
                        flight_counter_oct += 1
                        delay_counter_oct += 1
                        total_delay_oct += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 11:
                        flight_counter_nov += 1
                        delay_counter_nov += 1
                        total_delay_nov += flight["DEPARTURE_DELAY"]
                    
                    if flight["MONTH"] == 12:
                        flight_counter_dec += 1
                        delay_counter_dec += 1
                        total_delay_dec += flight["DEPARTURE_DELAY"]
    
            # fill dict with data for airport
            airport_temp["name"] = airport["AIRPORT"]
            airport_temp["name_iata"] = airport["IATA_CODE"]
            airport_temp["city"] = airport["CITY"]
            airport_temp["flights"] = flight_counter
            airport_temp["delays"] = delay_counter
            airport_temp["cancelled"] = cancel_counter
            airport_temp["early"] = early_counter
            airport_temp["total_delay_m"] = total_delay
            airport_temp["p_delayed"] = delay_counter / flight_counter
            airport_temp["p_cancelled"] = delay_counter / flight_counter
                    
