import csv

with open("data/airports_aggregated.csv", "r") as infile:
    reader = csv.DictReader(infile, delimiter=",")

    flight_count = 0

    for airport in reader:
        flight_count += int(airport["flights"])

    print(flight_count)