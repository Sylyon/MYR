//---------------------GLOBAL VARIABLES-----------------------------
	var map = null;
	var lastDatetime = "0";
	//------------------------------------------------------------------

	//----------------------GOOGLE MAP WORLD---------------------------
	//MAP INITIALIZATION
	function initialize() {
		//MAP OPTIONS
		var mapOptions = {
			center: { lat: -34.397, lng: 150.644},
			zoom: 8
		};
		//MAP CREATION
		map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	//-----------------------------------------------------------------

	//----------------------FUNCTIONS---------------------------
	//Setter on lastDatetime
	function saveLastDatetime(datetime){
		lastDatetime = datetime;
	}
	//Getter on lastDatetime
	function getLastDatetime(){
		return lastDatetime;
	}

	//Set the center of the map
	function setCenter(lat, lng){
		map.setCenter(new google.maps.LatLng(lat,lng));
	}

	//Add a marker to the map
	function addMarker(lat, lng){
		var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(lat,lng)
		}
		);
		marker.setMap(map);
	}

	//Add all the given coordinates onto the map
	function addAllThisMarkers(data){
		for(i=0; i < data.length ; i++){
			lat = data[i].latitude;
			lng = data[i].longitude;
			addMarker(lat,lng);
		}
	}

	//Add the given coordiantes on the map and save this last state
	function refreshWithNewMarkers(data){
		var lastCoordinate = data[data.length-1];
		var lastDate = lastCoordinate.datetime;
		var lastLat = lastCoordinate.latitude;
		var lastLng= lastCoordinate.longitude;

		addAllThisMarkers(data);
		setCenter(lastLat,lastLng);

		saveLastDatetime(lastDate);
	}


//---------------------JQUERY WORLD---------------------------
$(document).ready(function(){


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