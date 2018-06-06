# Design document

## Structure

### Search bar

* Title, logo, search bar, page links.
* Search bar will have autocomplete functionality.
* Need to make an array/objct to hold all airline/airport names and abbreviations
* Upon enter or clicking on one of the options, the main dashboard will update. Generic update function.
* search.js

### Side bar

* Side bar that will show rankings in one part of the page, scrollable to fit the page.
* Will use D3 to draw a sideways bar chart that shows (descending) rankings of airports and airlines.
* Upon click on one of the airlines/airports, will update the main dashboard. Generic update function.
* rankbar.js

### Main dashboard

* Will show basic text info that doesnt fit in visualizations.
* D3 Scatter that will plot %delayed / delay time with tooltips.
* D3 Bar charts that will plot best and worst airports airlines for that selection. i.e. If a user selects Los Angelex Intl. Aiport in the search or sidebar, the main dashboard rankings will show the top/bottom airlines at that airport.
* D3 Line chart for weekly/monthly delays or cancellations.
* Line chart will have interactive HTML elements to switch between month/week. Clicking a day will use a seperate update scatter function.
* textInfo.js
* delayScatter.js
* rankbar.js (limited top 5 / bottom 5)
* updateDash.js
* updateScatter.js

## Basic design diagram

![diagram](doc/diagram.png)