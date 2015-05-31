$(document).ready(function(){
	//initialization
	google.maps.event.addDomListener(window, 'load', initializeMap);

	//display panel
	$("#refresh-panel").click();

	//initializeMap();
	initialScroll();

	//gather newly added coordinates or add coordinates since begining of mission
	$("#getNewCoordinates").click(function(){
		$.ajax({
			type: "GET",
			url: "/gatherCoordsSince",
			data: {datetime : getLastDatetime(), trackers: getKnownTrackers()},
			dataType: "json",
			success: function(data){
				if(data.length > 0){
					refreshWithNewMarkers2(data);
				}
			}       
		});
	});

	//gather newly added coordinates or add coordinates since begining of mission
	$("#getNewTrackers").click(function(){
		$.ajax({
			type: "GET",
			url: "/getNewTrackers",
			data: {datetime : getLastDatetime(), trackers: getKnownTrackers()},
			dataType: "json",
			success: function(data){// retrieve an array containing the not yet known trackers
				if(data.length > 0){
					saveNewKnownTracker(data);
					alert("Received data: "+data);
				}
			}       
		});
	});

});

	/*
	$("#getCoordinatesForCurrentMission").click(function(){
		$.ajax({
			type: "GET",
			url: "/getMissionLength",
			dataType: "json",
			success: function(data){
				if(data.length > 0){
					start = data[0];
					end = data[1];
					$.ajax({
						type: "GET",
						url: "/gatherCoordsBetweenDates",
						dataType: "json",
						data: { tstart: start, tend: end},
						success: function(data){
							if(data.length > 0){
								length = data.length;
								refreshWithNewMarkers(data);
							}
						}       
					});
				}
			}       
		});
	});
*/

//-----------------------------------------------------------------