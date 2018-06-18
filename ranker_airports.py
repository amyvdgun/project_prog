"""
Jesse Haenen
10670742

Creates a ranking for each airport where airlines are ranked based on the times
they fly on time.
"""

import csv
import json

# variables
key_list = []
master_list = []

print("Generating keys...")
with open("data/airports_aggregated.csv", "r", newline="") as infile:
    airports = csv.DictReader(infile, delimiter=",")
    for airport in airports:
        key_list.append(airport["name_iata"])


print("")
with open("data/flights.csv", "r", newline="") as infile:
    with open("data/ranklist_airports.json", "w") as outfile:
        flights = csv.DictReader(infile, delimiter=",")
        for airport in key_list:
            print("Airport: {}.".format(airport))
            # master_dict[airport] = {}
            temp_airport_dict = {}
            temp_airport_dict["name_iata"] = airport
            temp_airport_dict["airlines"] = {}

            for flight in flights:
                if flight["ORIGIN_AIRPORT"] == airport:
                    if int(flight["CANCELLED"]) != 1:
                        if flight["AIRLINE"] not in temp_airport_dict["airlines"]:
                            temp_airport_dict["airlines"][flight["AIRLINE"]] = {}
                            temp_airport_dict["airlines"][flight["AIRLINE"]]["flights"] = 1
                            temp_airport_dict["airlines"][flight["AIRLINE"]]["delays"] = 0
                            if int(flight["DEPARTURE_DELAY"]) > 15:
                                temp_airport_dict["airlines"][flight["AIRLINE"]]["delays"] += 1
                        else:
                            temp_airport_dict["airlines"][flight["AIRLINE"]]["flights"] += 1
                            if int(flight["DEPARTURE_DELAY"]) > 15:
                                temp_airport_dict["airlines"][flight["AIRLINE"]]["delays"] += 1
                    
            master_list.append(temp_airport_dict)
            infile.seek(0)

        out = json.dumps([row for row in master_list])
        outfile.write(out)
