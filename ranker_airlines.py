"""
Jesse Haenen
10670742

Creates a ranking for each airline where airport are ranked based on the times
they fly on time.
"""

import csv
import json

# variables
airline_list = []
airport_list = []
master_list = []

print("Generating keys...")
with open("data/airlines_aggregated.csv", "r", newline="") as infile:
    airlines = csv.DictReader(infile, delimiter=",")
    for airline in airlines:
        airline_list.append((airline["name_iata"], airline["name"]))

with open("data/airports_aggregated.csv", "r", newline="") as infile:
    airports = csv.DictReader(infile, delimiter=",")
    for airport in airports:
        airport_list.append((airport["name_iata"], airport["name"]))

print("Generating rankings...")
with open("data/flights.csv", "r", newline="") as infile:
    with open("data/ranklist_airlines_2.json", "w") as outfile:
        flights = csv.DictReader(infile, delimiter=",")
        for airline in airline_list:
            print("Airline: {}.".format(airline))
            # master_dict[airport] = {}
            temp_airline_dict = {}
            temp_airline_dict["name_iata"] = airline[0]
            temp_airline_dict["name"] = airline[1]            
            temp_airline_dict["airports"] = {}
            
            for key in airport_list:
                temp_airline_dict["airports"][key[0]] = {"flights":0, "delays":0}


            for flight in flights:
                if flight["AIRLINE"] == airline[0]:
                    if int(flight["CANCELLED"]) != 1:
                        # if flight["ORIGIN_AIRPORT"] not in temp_airline_dict["airports"]:
                        #     temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]] = {}
                        #     temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["flights"] = 1
                        #     temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["delays"] = 0
                        #     if int(flight["DEPARTURE_DELAY"]) > 15:
                        #         temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["delays"] += 1
                        # else:
                        temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["flights"] += 1
                        if int(flight["DEPARTURE_DELAY"]) > 15:
                            temp_airline_dict["airports"][flight["ORIGIN_AIRPORT"]]["delays"] += 1
                    
            master_list.append(temp_airline_dict)
            infile.seek(0)
            break
            
        out = json.dumps([row for row in master_list])
        outfile.write(out)
