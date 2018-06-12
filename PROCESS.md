# Process book

## Week 1

### 4-06-2017

* Found dataset on Kaggle - Flight Delays.
* Sketch

![sketch](doc/image.png)

### 5-06-2017

* Design document: dataset is too big, so will have to take extra preprocessing steps beforehand to be able to handle all the data. Individual flight data will be aggregated to airline and airport level.
* Think of extra interactive element on the page: search bar & dropdown / toggle menu.
* Made basic design diagram.

![diagram](doc/diagram.png)

### 6-06-2017

* Design document: write code structure & function ideas.
* Start with writing the aggregate.py file that will preprocess the raw data downloaded from Kaggle.

### 7-06-2017

* Write aggregator script: read airport, airline and flight files as dicts, create new dict object and DictWriter to write new csv files with aggregated data.
* Continued writing aggregator script for airports.
* New insight: need seperate week and month files for the week/month filtering. I might just save these as seperate columns for both airports and airlines but will take 7 + 12 extra columns.
* Extra work for the day/month columns would only have to be done once because code structure for airlines.

![codesnip](doc/snip.png)

* and it goes on and on... for every week / month

### 8-06-2017

* presentatie plannen

## Week 2

### 11-06-2017

* Continued writing aggregator script. Ran into a bug early: only one row of the airports was written correctly, the rest was kept 0 for some reason.
* Bug fixed: csv reader needed to be reset to the start of the flights file for every loop in airports. Now I just need to let the code run (overnight?), and write the same code format for airlines.
* Working further on the layout of the page. Picked a dark Bootswatch theme, added a navbar with search box.
* Finished running the scripts for data aggregation: now have two new data files.
* Airline data
![airlinedata](doc/airlinedata.png)
* Airport data
![airportdata](doc/airportdata.png)


### 12-06-2017

* Plans: write a data loader script and (hopefully) finish making the bar chart rankings of flights.
* Found out that when counting the number of flights on all airports i'm 'short' about 500.000 flights. That means that either there are 500.000 flights that were diverted and landed in the U.S. OR something went wrong in running the script OR there is some other technical explaination. However, I still think I have a representative sample of flights to use for visualisation.
* Found out that for most rows more than half of the flights are counted as delayed. This makes sense because in my script a flight counts as a delay when it departs one minute or more after scheduled departure time. Guidelines from the Federal Aviation Administration (FAA) define less strict definition of a delay; **the FAA consideres a flight delayed when it departs more than 15 minutes after the scheduled departure time** (https://en.wikipedia.org/wiki/Flight_cancellation_and_delay).
* I have to run the scripts again tonight with these new settings.

### 13-06-2017

### 14-06-2017

### 15-06-2017

## Week 3

### 18-06-2017

### 19-06-2017

### 20-06-2017

### 21-06-2017

### 22-06-2017

## Week 4

### 25-06-2017

### 26-06-2017

### 27-06-2017

### 28-06-2017

### 29-06-2017