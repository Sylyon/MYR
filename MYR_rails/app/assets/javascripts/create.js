//---------------------GLOBAL VARIABLES-----------------------------
var map = null;
var lastDatetime = "0";
	//------------------------------------------------------------------

//---------------------JQUERY WORLD---------------------------
$(document).ready(function(){

	//initialization
	initializeMap();
	initialScroll();

	$("#doit").click(function(){
		alert("coucou");
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