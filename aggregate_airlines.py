"""
Jesse Haenen (10670742)
Eindproject Minor Programmeren

This script will preprocess the original data file of flight delays to 
aggregated levels. The result of this process will be two seperate files; one 
for airlines and one for airports in the U.S.
"""

import csv

runcount = 0

# set fieldnames for dictwriter
fieldnames = ["name", "name_iata", "city", "flights", "delays", \
"cancelled", "early", "total_delay_m", \
"flights_mon", "delays_mon", "total_delay_mon", \
"flights_tue", "delays_tue", "total_delay_tue", \
"flights_wed", "delays_wed", "total_delay_wed", \
"flights_thu", "delays_thu", "total_delay_thu", \
"flights_fri", "delays_fri", "total_delay_fri", \
"flights_sat", "delays_sat", "total_delay_sat", \
"flights_sun", "delays_sun", "total_delay_sun", \
"flights_jan", "delays_jan", "total_delay_jan", \
"flights_feb", "delays_feb", "total_delay_feb", \
"flights_mar", "delays_mar", "total_delay_mar", \
"flights_apr", "delays_apr", "total_delay_apr", \
"flights_may", "delays_may", "total_delay_may", \
"flights_jun", "delays_jun", "total_delay_jun", \
"flights_jul", "delays_jul", "total_delay_jul", \
"flights_aug", "delays_aug", "total_delay_aug", \
"flights_sep", "delays_sep", "total_delay_sep", \
"flights_oct", "delays_oct", "total_delay_oct", \
"flights_nov", "delays_nov", "total_delay_nov", \
"flights_dec", "delays_dec", "total_delay_dec"]

# write airports file
with open("data/flights.csv", "r", newline="") as fl:
    with open("data/airlines.csv", "r", newline="") as al:
        with open("data/airlines_aggregated.csv", "w", newline="") as outfile:

            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()
    
            flights = csv.DictReader(fl, delimiter=",")
            airlines = csv.DictReader(al, delimiter=",")

            # for every airport
            for airline in airlines:

                # temp variables
                airline_temp = {}
                flight_counter = 0
                delay_counter = 0
                cancel_counter = 0
                early_counter = 0
                total_delay = 0

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

                # for every flight in the original data file
                for flight in flights:

                    # check if the airports match
                    if flight["AIRLINE"] == airline["IATA_CODE"]:
                        
                        flight_counter += 1

                        # only flights that arent cancelled
                        if int(flight["CANCELLED"]) != 1:

                            # if the delay is more than 0 minutes
                            if int(flight["DEPARTURE_DELAY"]) >= 15:

                                # increase the delay counter
                                delay_counter += 1

                                # add to the total delay in that airport
                                total_delay += int(flight["DEPARTURE_DELAY"])

                                if int(flight["DAY_OF_WEEK"]) == 1:
                                    delay_counter_mon += 1
                                    total_delay_mon += int(flight["DEPARTURE_DELAY"])
                                                    
                                if int(flight["DAY_OF_WEEK"]) == 2:
                                    delay_counter_tue += 1
                                    total_delay_tue += int(flight["DEPARTURE_DELAY"])

                                if int(flight["DAY_OF_WEEK"]) == 3:
                                    delay_counter_wed += 1
                                    total_delay_wed += int(flight["DEPARTURE_DELAY"])

                                if int(flight["DAY_OF_WEEK"]) == 4:
                                    delay_counter_thu += 1
                                    total_delay_thu += int(flight["DEPARTURE_DELAY"])

                                if int(flight["DAY_OF_WEEK"]) == 5:
                                    delay_counter_fri += 1
                                    total_delay_fri += int(flight["DEPARTURE_DELAY"])

                                if int(flight["DAY_OF_WEEK"]) == 6:
                                    delay_counter_sat += 1
                                    total_delay_sat += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["DAY_OF_WEEK"]) == 7:
                                    delay_counter_sun += 1
                                    total_delay_sun += int(flight["DEPARTURE_DELAY"])

                                if int(flight["MONTH"]) == 1:
                                    delay_counter_jan += 1
                                    total_delay_jan += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 2:
                                    delay_counter_feb += 1
                                    total_delay_feb += int(flight["DEPARTURE_DELAY"])

                                if int(flight["MONTH"]) == 3:
                                    delay_counter_mar += 1
                                    total_delay_mar += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 4:
                                    delay_counter_apr += 1
                                    total_delay_apr += int(flight["DEPARTURE_DELAY"])

                                if int(flight["MONTH"]) == 5:
                                    delay_counter_may += 1
                                    total_delay_may += int(flight["DEPARTURE_DELAY"])

                                if int(flight["MONTH"]) == 6:
                                    delay_counter_jun += 1
                                    total_delay_jun += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 7:
                                    delay_counter_jul += 1
                                    total_delay_jul += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 8:
                                    delay_counter_aug += 1
                                    total_delay_aug += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 9:
                                    delay_counter_sep += 1
                                    total_delay_sep += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 10:
                                    delay_counter_oct += 1
                                    total_delay_oct += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 11:
                                    delay_counter_nov += 1
                                    total_delay_nov += int(flight["DEPARTURE_DELAY"])
                                
                                if int(flight["MONTH"]) == 12:
                                    delay_counter_dec += 1
                                    total_delay_dec += int(flight["DEPARTURE_DELAY"])
                        
                            if int(flight["DEPARTURE_DELAY"]) < 0:
                                early_counter += 1
                        
                        # NON DELAY SPECIFIC DATA
                        if int(flight["CANCELLED"]) == 1:
                            cancel_counter += 1

                        if int(flight["DAY_OF_WEEK"]) == 1:
                            flight_counter_mon += 1
                        
                        if int(flight["DAY_OF_WEEK"]) == 2:
                            flight_counter_tue += 1

                        if int(flight["DAY_OF_WEEK"]) == 3:
                            flight_counter_wed += 1

                        if int(flight["DAY_OF_WEEK"]) == 4:
                            flight_counter_thu += 1

                        if int(flight["DAY_OF_WEEK"]) == 5:
                            flight_counter_fri += 1

                        if int(flight["DAY_OF_WEEK"]) == 6:
                            flight_counter_sat += 1
                        
                        if int(flight["DAY_OF_WEEK"]) == 7:
                            flight_counter_sun += 1

                        if int(flight["MONTH"]) == 1:
                            flight_counter_jan += 1
                        
                        if int(flight["MONTH"]) == 2:
                            flight_counter_feb += 1

                        if int(flight["MONTH"]) == 3:
                            flight_counter_mar += 1
                        
                        if int(flight["MONTH"]) == 4:
                            flight_counter_apr += 1

                        if int(flight["MONTH"]) == 5:
                            flight_counter_may += 1

                        if int(flight["MONTH"]) == 6:
                            flight_counter_jun += 1
                        
                        if int(flight["MONTH"]) == 7:
                            flight_counter_jul += 1
                        
                        if int(flight["MONTH"]) == 8:
                            flight_counter_aug += 1
                        
                        if int(flight["MONTH"]) == 9:
                            flight_counter_sep += 1

                        if int(flight["MONTH"]) == 10:
                            flight_counter_oct += 1

                        if int(flight["MONTH"]) == 11:
                            flight_counter_nov += 1

                        if int(flight["MONTH"]) == 12:
                            flight_counter_dec += 1

                # fill dict with data for airline
                airline_temp["name"] = airline["AIRLINE"]
                airline_temp["name_iata"] = airline["IATA_CODE"]
                airline_temp["flights"] = flight_counter
                airline_temp["delays"] = delay_counter
                airline_temp["cancelled"] = cancel_counter
                airline_temp["early"] = early_counter
                airline_temp["total_delay_m"] = total_delay
                
                airline_temp["flights_mon"] = flight_counter_mon
                airline_temp["delays_mon"] = delay_counter_mon
                airline_temp["total_delay_mon"] = total_delay_mon

                airline_temp["flights_tue"] = flight_counter_tue
                airline_temp["delays_tue"] = delay_counter_tue
                airline_temp["total_delay_tue"] = total_delay_tue
                        
                airline_temp["flights_wed"] = flight_counter_wed
                airline_temp["delays_wed"] = delay_counter_wed
                airline_temp["total_delay_wed"] = total_delay_wed
                
                airline_temp["flights_thu"] = flight_counter_thu
                airline_temp["delays_thu"] = delay_counter_thu
                airline_temp["total_delay_thu"] = total_delay_thu
                
                airline_temp["flights_fri"] = flight_counter_fri
                airline_temp["delays_fri"] = delay_counter_fri
                airline_temp["total_delay_fri"] = total_delay_fri
                
                airline_temp["flights_sat"] = flight_counter_sat
                airline_temp["delays_sat"] = delay_counter_sat
                airline_temp["total_delay_sat"] = total_delay_sat

                airline_temp["flights_sun"] = flight_counter_sun
                airline_temp["delays_sun"] = delay_counter_sun
                airline_temp["total_delay_sun"] = total_delay_sun
                
                airline_temp["flights_jan"] = flight_counter_jan
                airline_temp["delays_jan"] = delay_counter_jan
                airline_temp["total_delay_jan"] = total_delay_jan

                airline_temp["flights_feb"] = flight_counter_feb
                airline_temp["delays_feb"] = delay_counter_feb
                airline_temp["total_delay_feb"] = total_delay_feb

                airline_temp["flights_mar"] = flight_counter_mar
                airline_temp["delays_mar"] = delay_counter_mar
                airline_temp["total_delay_mar"] = total_delay_mar

                airline_temp["flights_apr"] = flight_counter_apr
                airline_temp["delays_apr"] = delay_counter_apr
                airline_temp["total_delay_apr"] = total_delay_apr

                airline_temp["flights_may"] = flight_counter_may
                airline_temp["delays_may"] = delay_counter_may
                airline_temp["total_delay_may"] = total_delay_may

                airline_temp["flights_jun"] = flight_counter_jun
                airline_temp["delays_jun"] = delay_counter_jun
                airline_temp["total_delay_jun"] = total_delay_jun

                airline_temp["flights_jul"] = flight_counter_jul
                airline_temp["delays_jul"] = delay_counter_jul
                airline_temp["total_delay_jul"] = total_delay_jul

                airline_temp["flights_aug"] = flight_counter_aug
                airline_temp["delays_aug"] = delay_counter_aug
                airline_temp["total_delay_aug"] = total_delay_aug

                airline_temp["flights_sep"] = flight_counter_sep
                airline_temp["delays_sep"] = delay_counter_sep
                airline_temp["total_delay_sep"] = total_delay_sep

                airline_temp["flights_oct"] = flight_counter_oct
                airline_temp["delays_oct"] = delay_counter_oct
                airline_temp["total_delay_oct"] = total_delay_oct

                airline_temp["flights_nov"] = flight_counter_nov
                airline_temp["delays_nov"] = delay_counter_nov
                airline_temp["total_delay_nov"] = total_delay_nov

                airline_temp["flights_dec"] = flight_counter_dec
                airline_temp["delays_dec"] = delay_counter_dec
                airline_temp["total_delay_dec"] = total_delay_dec

                writer.writerow(airline_temp)

                fl.seek(0)

                runcount += 1
                print("Next.. {}".format(runcount))
