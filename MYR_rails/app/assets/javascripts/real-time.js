$(document).ready(function(){

	//initialization
	initializeMap();
	initialScroll();
	$("#refresh0").click();
  $("#refreshteams").click();

	$("#doit").click(function(){
		$.ajax({
			type: "GET",
			url: "/coordinates.json",
			dataType: "json",
			success: function(data){
				addAllThisMarkers(data);
				saveLastDatetime(data[data.length-1].datetime);
				setCenter(lat,lng);
			}        
		});
	});

	$("#sendparam").click(function(){
		$.ajax({
			type: "GET",
			url: "/data",
			data: "datetime="+getLastDatetime(),
			dataType: "json",
			success: function(data){
				if(data.length > 0){
					refreshWithNewMarkers(data);
				}
			}       
		});
	});
});
//-----------------------------------------------------------------