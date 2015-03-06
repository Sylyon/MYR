//----------------------FUNCTIONS---------------------------
	
	//Setter on lastDatetime
	function saveLastDatetime(datetime){
		lastDatetime = datetime;
	}

	//Getter on lastDatetime
	function getLastDatetime(){
		return lastDatetime;
	}

	//Map initialization
	function initializeMap() {
		//map options
		var mapOptions = {
			center: { lat: -34.397, lng: 150.644},
			zoom: 8
		};
		//map creation
		map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	}

	//scroll to top of button over the map
	function initialScroll(){
		$('html, body').animate({
			scrollTop: $("#doit").offset().top
		}, 2000);
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