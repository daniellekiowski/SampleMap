//Module to create a map in d3.js using standards for reusable charts from http://bost.ocks.org/mike/chart/

function mapChart(selection) {
	var title = "";
	var width = 950;
	var height = 500;
	var units = "";

	function map(selection){
		selection.each(function(d,i){
			d3.select(this).append("h1").text(title);

			//set up space for map
			var svgMap = d3.select(this).append("svg")
				.attr("width",width)
				.attr("height",height);

			//make a hidden div that will be used to display data
			var tip = d3.select(this).append("div")
				.style("width", "100px")
				.style("height", "50px")
				.style("border-radius","15px")
				.style("background-color", "#000")
				.style("color","#fff")
				.style("opacity", 0);

			d3.json("data/us-states.json",function(error,json){
				if(error){
					console.log(error);
					return;
				}
				console.log(json.features);
				//draw grey map
				var geo = d3.geo.path(); 
				svgMap.selectAll("path")
					.data(json.features)
					.enter()
					.append("path")
					.attr("d",geo)
					.attr("fill","#aaa");

				//fill in colors
				updateMap(d);
				
				function updateMap(data){

					//
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < json.features.length; j++) {
							if(data[i]["state"] == json.features[j]["properties"]["name"]){
								json.features[j]["properties"]["value"] = data[i]["value"];
							}
						};
					};
					console.log(json.features);
					svgMap.selectAll("path")
						.data(json.features)
						.attr("fill",function(e){return "#aaa";})
						.on("mouseover",function(e){
							console.log(e["properties"]["value"]?(e["properties"]["value"]+" "+units):"No Data");
						});
				}
			});
		});
	}

	map.title = function(_){
		if(!arguments.length){
			return title;
		}
		title = _;
		return map;
	}

	map.width = function(_){
		if(!arguments.length){
			return width;
		}
		width = _;
		return map;
	}

	map.height = function(_){
		if(!arguments.length){
			return height;
		}
		height = _;
		return map;
	}

	map.units = function(_){
		if(!arguments.length){
			return units;
		}
		units = _;
		return map;
	}

	return map;
}