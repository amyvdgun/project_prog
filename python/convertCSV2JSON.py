"""
Jesse Haenen
10670742

Writing JSON files with list concatenation source: https://goo.gl/57rvrd
"""

import json
import csv

print("Start converting...")

# convert airlines file
airlines_csv = "data/airlines_aggregated.csv"
airlines_json = "data/airlines_aggregated.json"

# open both files
with open(airlines_csv, 'r') as csv_file, open(airlines_json, 'w') as json_file:

    # read into the file that needs to be converted
    reader = csv.DictReader(csv_file, delimiter=',')
    
    # write every row
    out = json.dumps([row for row in reader])
    json_file.write(out)

print("... airlines JSON created!")

# convert airport fil
airports_csv = "data/airports_aggregated.csv"
airports_json = "data/airports_aggregated.json"

# open both files
with open(airports_csv, 'r') as csv_file, open(airports_json, 'w') as json_file:

    # read into the file that needs to be converted
    reader = csv.DictReader(csv_file, delimiter=',')
    
    # write every row
    out = json.dumps([row for row in reader])
    json_file.write(out)

print("... airport JSON created!")