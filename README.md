#Sample Map with D3.js
##About
This is a modular, reusable map of the United States developed using [D3.js](http://d3js.org/) according to the standards for modular D3.js code proposed [here](http://bost.ocks.org/mike/chart/). To draw states, it uses Mike Bostock's TopoJSON file of US states, available [here](https://raw.githubusercontent.com/alignedleft/d3-book/master/chapter_12/us-states.json).

##Demo
Interact with a demo of this map [here](http://daniellekiowski.github.io/SampleMap).
This sample shows commute time data from the Means of Transportation to Work by Selected Characteristics dataset from the 2009-2013 American Community Survey 5-Year Estimates. It is available as a download from the [Census.gov FactFinder](http://factfinder.census.gov/). For help navigating the dataset, please refer to the metadata file that is included with .zip downloads of the dataset and is also included with this repository [here](https://github.com/daniellekiowski/SampleMap/blob/master/data/transportation_metadata.csv).

##How to Use

###Local Setup
You have two options for using this module. You can download the [map.js](https://github.com/daniellekiowski/SampleMap/blob/master/scripts/map.js) file from this repo. Create a directory called `data` in the same directory with that file and put the [us-states.json](https://raw.githubusercontent.com/daniellekiowski/SampleMap/master/data/us-states.json) file into that directory.
In this case, you can skip to the Usage section below. To set up a working app using the map module, please use the following directions:

1. Clone this repository.
2. Make sure that you have NodeJS installed:
  * Run `which node` in your terminal. It should return the path to where NodeJS is installed.
  * If you do not have NodeJS, you can download and install it [here](https://nodejs.org/).
3. `cd` into the directory where this repo is cloned.
4. Run `npm install`. This will install the dependencies needed for the app to run (in this case, [node-static](https://github.com/cloudhead/node-static)). You may need to run `sudo npm install` depending on how your permissions are set up.
5. Run `node .` to start the server. You should see the message "Listening on 8080" if this was successful.
6. In your browser, go to localhost:8080
7. You should see the map!

###Usage

Include the [map.js](https://github.com/daniellekiowski/SampleMap/blob/master/scripts/map.js) in your html file using a script tag. You should do this after you include [D3.js](http://d3js.org/) but before you include the file in which you want to call the map.

Create a directory called `data` in the same directory with that file and put the [us-states.json](https://raw.githubusercontent.com/daniellekiowski/SampleMap/master/data/us-states.json) file into that directory.

In your js file, create a variable to hold an instance of the map function. 
  ```
  var map = mapChart();
  ```

Store the data for the map in a variable. This can be hardcoded or from a file, like a JSON or CSV file. However, it must be an array of objects. Each object must have a "state" property that holds the name of the state as a string and a "value" property that holds the value that will be graphed as a number or a string that can be converted to a number.
  ```
  var data = [{
  				state: "Alabama",
  				value: "5"
  			},
  			...,
  			{
  				state: "Wyoming",
  				value: "5"
  			}]
  ```

Select the element(s) in which you want to build maps using D3's `select` function. 
  ```
  d3.select("body")
  ```

Bind the data to the selection. 
  ```
  d3.select("body").datum(data)
  ```

Call the chart. 
  ```
  d3.select("body").datum(data).call(map);
  ```

####Options

These options are defined when creating the instance of the map. They are getter-setter functions, meaning that if you do not pass a value to any of these, they will return the current value of that option. They may be chained together to set multiple options at once.

#####Title
A string. Specifies the text that will be displayed in the `h1` element above the chart. Default is an empty string. 
  ```
  var map = mapChart().title("My Title");
  ```

#####Width
An integer. Specifies the width of the `svg` element that holds the chart. Default is 950.
  ```
  var map = mapChart().width(1500);
  ```

#####Height
An integer. Specifies the height of the `svg` element that holds the chart. Default is 500.
  ```
  var map = mapChart().height(750);
  ```

#####Units
A string. Specifies the text that will be displayed after the value in the tooltip. Default is an empty string. 
  ```
  var map = mapChart().units("millions of dollars");
  ```

#####Colors
An array of color strings (may be in any of the [color string formats](https://github.com/mbostock/d3/wiki/Colors) accepted by D3).The default colors on the map are the greens from [Colorbrewer](http://colorbrewer2.org/).
  ```
  var map = mapChart().colors(["fuchsia","#ccc","rgb(73,46,116)","hsl(181,78%,67%)","#FF7400"]);
  ```
Note: The above colors are a sample only. Please choose your colors responsibly! :)