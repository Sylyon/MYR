//NOT WORKING




var map = null;


$(document).ready(function(){
	

	initializeMap();
	//listener on the click
	google.maps.event.addListener(map, 'click', CreateMarker());


	function CreateMarker(event){


		var lat = event.LatLng.lat();
		var lng = event.LatLng.lng();

		var marker = addDraggableMarker(lat,lng);
		setCenter(lat,lng);


	google.maps.event.addListener(marker, 'dragend', function(a) {
		var lat = a.latLng.lat();
		var lng = a.latLng.lng();
		alert("lat is: "+lat+" and long is "+lng);
	});

	};




});