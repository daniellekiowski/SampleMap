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
				.style("width","150px")
				.style("height","50px")
				.style("position","absolute")
				.style("border-radius","15px")
				.style("background-color", "#000")
				.style("color","#fff")
				.style("line-height","25px")
				.style("text-align","center")
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

					//join data to state definitions
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < json.features.length; j++) {
							if(data[i]["state"] == json.features[j]["properties"]["name"]){
								json.features[j]["properties"]["value"] = data[i]["value"];
							}
						};
					};

					svgMap.selectAll("path")
						.data(json.features)
						.attr("fill",function(e){return "#aaa";})
						.on("mouseover",function(e){
							tip.html(e["properties"]["name"]+"<br>"+(e["properties"]["value"]?(e["properties"]["value"]+" "+units):"No Data"))
								.style("top",(d3.event.pageY+5)+"px")
								.style("left",(d3.event.pageX+5)+"px")
								.transition()
								.style("opacity","1");
						})
						.on("mouseout",function(e){
							tip.transition()
								.style("opacity","0");
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