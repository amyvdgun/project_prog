"""
Jesse Haenen
10670742

Creates a ranking for each airline where airport are ranked based on the times
they fly on time.
"""

import csv
import json

# variables
key_list = []
master_list = []

print("Generating keys...")
with open("data/airlines_aggregated.csv", "r", newline="") as infile:
    airlines = csv.DictReader(infile, delimiter=",")
    for airline in airlines:
        key_list.append((airline["name_iata"], airline["name"]))


print("Generating rankings...")
with open("data/flights.csv", "r", newline="") as infile:
    with open("data/ranklist_airlines.json", "w") as outfile:
        flights = csv.DictReader(infile, delimiter=",")
        for airline in key_list:
            print("Airline: {}.".format(airline))
            # master_dict[airport] = {}
            temp_airline_dict = {}
            temp_airline_dict["name_iata"] = airline[0]
            temp_airline_dict["name"] = airline[1]            
            temp_airline_dict["airports"] = {}

            for flight in flights:
                if flight["AIRLINE"] == airline[0]:
                    if int(flight["CANCELLED"]) != 1:
                        if flight["ORIGIN_AIRPORT"] not in temp_airline_dict["airports"]:
                            temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]] = {}
                            temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["flights"] = 1
                            temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["delays"] = 0
                            if int(flight["DEPARTURE_DELAY"]) > 15:
                                temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["delays"] += 1
                        else:
                            temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["flights"] += 1
                            if int(flight["DEPARTURE_DELAY"]) > 15:
                                temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["delays"] += 1
                    
            master_list.append(temp_airline_dict)
            infile.seek(0)
            
        out = json.dumps([row for row in master_list])
        outfile.write(out)
