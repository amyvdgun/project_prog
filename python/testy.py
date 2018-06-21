import csv

with open("data/flights.csv", "r") as infile:
    flights = csv.DictReader(infile, delimiter=",")

    for flight in flights:
        if int(flight["MONTH"]) == 10:
            print("found!")
            break