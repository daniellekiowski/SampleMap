d3.csv('../SampleMap/data/transportation.csv',function(error,data){
	
	if(error){
		console.log(error);
		return;
	}

	//Constructing array of data to use when building map. Start at index 1 because the object at index 0 contains headers.
	var mapData = [];
	for (var i = 1; i < data.length; i++) {
		mapData.push({
			state: data[i]["GEO.display-label"],
			value: (data[i]["HC01_EST_VC118"]=="N"?"":data[i]["HC01_EST_VC118"])
		});
	};

	var map = new mapChart().title("Average Commute Time by State").units("min");
	d3.select("body").datum(mapData).call(map);
})