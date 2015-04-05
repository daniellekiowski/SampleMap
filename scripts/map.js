//Module to create a map in d3.js using standards for reusable charts from http://bost.ocks.org/mike/chart/

function mapChart(selection) {
	var title = "";
	var width = 950;
	var height = 500;
	var units = "";
	var colors = ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]

	function map(selection){
		selection.each(function(elemData,i){
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
				
				//draw grey map
				var geo = d3.geo.path(); 
				svgMap.selectAll("path")
					.data(json.features)
					.enter()
					.append("path")
					.attr("d",geo)
					.attr("fill","#555");

				//fill in colors
				updateMap(elemData);
				
				function updateMap(data){

					//join data to state definitions
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < json.features.length; j++) {
							if(data[i]["state"] == json.features[j]["properties"]["name"]){
								json.features[j]["properties"]["value"] = data[i]["value"];
							}
						};
					};

					//define color range
					var color = d3.scale.quantize()
									.domain([d3.min(json.features,function(d){return Number(d["properties"]["value"]);}),
										d3.max(json.features,function(d){return Number(d["properties"]["value"]);})
									])
									.range(colors);

					//color in map
					svgMap.selectAll("path")
						.data(json.features)
						.attr("fill",function(d){
							if(d["properties"]["value"]){
								return color(d["properties"]["value"]);
							}
							return "#555";
						})
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

	map.colors = function(_){
		if(!arguments.length){
			return colors;
		}
		colors = _;
		return map;
	}

	return map;
}