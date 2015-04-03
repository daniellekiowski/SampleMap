//Module to create a map in d3.js using standards for reusable charts from http://bost.ocks.org/mike/chart/

function mapChart(selection) {
	var title = "";
	var width = 950;
	var height = 500;

	function map(selection){
		selection.each(function(d,i){
			d3.select(this)
			var svgMap = d3.select(this).append('svg')
				.attr('width',width)
				.attr('height',height);

			d3.json('data/us-states.json',function(error,json){
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
					.attr("fill","#aaa");
			});

			//fill in colors
			updateMap(d);

		});
		
		function updateMap(data){

		}
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

	return map;
}