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
			data: {datetime : getLastDatetime(), trackers: getDesiredTrackers()},
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

	$("#map-panel").ready(function(){
		alert("hello");

$("#map-panel").on("click", "input[name*='tracker']", function() {
  //for all checkboxes of tracker
	//$( "input[name*='tracker']" ).each(function () {  
    //on click do ...
    $(this).click(function() {
      //get id of the checkbox
      var id = $(this).attr('id');
      alert("My ID is "+id);
      //if checked
      if($(this).is(':checked')){
        saveNewDesiredTracker(id);
      }
      //if not checked
      else{
        removeDesiredTracker(id);
      } 
    })
  })

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