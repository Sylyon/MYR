//----------------------GLOBAL VARIABLES-------------------
var map = null;
var lastDatetime = "0";
var latest_markers = [];


//----------------------FUNCTIONS---------------------------

//-------------------GUI----------------------------------------
jQuery.expr.filters.offscreen = function(el) {
	return (
		(el.offsetLeft + el.offsetWidth) < 0 
		|| (el.offsetTop + el.offsetHeight) < 0
		|| (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
		);
};

//-------------GETTERS AND SETTERS----------------------------
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
			//carefull on the name of the HTML object here
			scrollTop: $("button").offset().top
		}, 2000);
	}

	//Set the center of the map
	function setCenter(lat, lng){
		map.panTo(new google.maps.LatLng(lat,lng));
	}

	//Add a marker to the map
	//tracker_id is optional with  default value of 12 for the rendering
	function addMarker(lat, lng, tracker_id){
		tracker_id = typeof tracker_id !== 'undefined' ? tracker_id : 12;
		var image = 'icons/medium'+tracker_id+'.png';

		var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(lat,lng),
			icon: image
		}
		);
		//always needed ?
		marker.setMap(map);
		//ADDED
		return marker;
	}

	//Add a draggable marker to the map
	function addDraggableMarker(lat, lng){
		var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(lat,lng),
			draggable: true
		}
		);
		//always needed ?
		marker.setMap(map);
		return marker;
	}

	//Add all the given coordinates onto the map
	function addAllThisMarkers(data){
		var lat, lng, tracker_id = 0;
		for(var i=0; i < data.length ; i++){
			lat = data[i].latitude;
			lng = data[i].longitude;
			tracker_id = data[i].tracker_id;
			addMarker(lat,lng,tracker_id);
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

	//Add the given coordiantes on the map and save this last state
	function refreshWithNewMarkers2(data){
		var lastCoordinate = data[data.length-1];
		var lastDate = lastCoordinate.datetime;
		var lastLat = lastCoordinate.latitude;
		var lastLng= lastCoordinate.longitude;

		addAllThisPolylines(data);

		setCenter(lastLat,lastLng);
		saveLastDatetime(lastDate);
	}

	function addAllThisPolylines(data){
		var tracker_Gcoords = []
		for(var i=0; i < data.length ; i++){ //iterate in the array
			latitude = data[i].latitude;
			longitude = data[i].longitude;
			tracker_id = data[i].tracker_id;
			tracker_Gcoords.push(new google.maps.LatLng(latitude, longitude));
			if(i != data.length -1){ //not end of array
				if(data[i].tracker_id == data[i+1].tracker_id){ //the same tracker
					//addsmallmarker
					addMarker(latitude, longitude, tracker_id);
				}
				else{
					//addsbigmarker
					addMarker(latitude, longitude, tracker_id);
					//create polyline
					createPolyline(tracker_Gcoords, tracker_id);
					//reset array
					tracker_Gcoords = [];
				}
			}
			else{ //end of array
				//addsbigmarker
				addMarker(latitude, longitude, tracker_id);
				//create polyline
				createPolyline(tracker_Gcoords, tracker_id);
				//reset array
				tracker_Gcoords = [];
			}
		}
	}

	function createPolyline(Gcoords, tracker_id){

		var index_of_marker = alreadyPresent(tracker_id);
		var last_lat = Gcoords[Gcoords.length-1].latitude;
		var last_lng = Gcoords[Gcoords.length-1].longitude;

		if(index_of_marker != -1){
			//remove this marker from the map

			//
		}

		var temp_marker = new google.maps.Marker(
		{
			position: Gcoords[Gcoords.length-1]
		}
		);

		var new_marker = [Gcoords[Gcoords.length-1],tracker_id];
		//add the latest marker to the local memory for futur refresh
		pushToLatestMarkers(new_marker);

		var polyline = new google.maps.Polyline({
	    path: Gcoords,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });
	polyline.setMap(map);
	}

	function pushToLatestMarkers(new_marker){
		var index = alreadyPresent(new_marker[1]);

		if(index == -1){ //not present
			latest_markers.push(new_marker);
		}
		else{
			latest_markers[i] = new_marker;
		}
	}

	function alreadyPresent(tracker_id){
		var index = -1;
		for (var i = 0 ; i < latest_markers.length; i++) {
			if (tracker_id == latest_markers[i][1]){ //already existing on the map
				index = i;
			};
		};
		return index;
	}

	//Add a boil on the map when clicked and keep track of coordinates on dragend
	//Save the coodinates in the database when clinking on "AddBoil" button
	function addingBoil(){
		google.maps.event.addListener(map, 'click', function(a){
			var desiredLat = a.latLng.lat();
			var desiredLng = a.latLng.lng();
			//setCenter(desiredLat,desiredLng);

			var marker = addDraggableMarker(desiredLat,desiredLng);
			google.maps.event.addListener(marker, 'dragend', function(a){
				var markerLat = a.latLng.lat();
				var markerLng = a.latLng.lng();

				desiredLat = markerLat;
				desiredLng = markerLng;
			}
			);

			$("#AddBoil").click(function(){
				alert(desiredLat+" and "+desiredLng);

				//to be completed using partial or jquery UI
				$.ajax({
					url: '/markers',
					type: 'POST',
					data: $.param({
						marker: {
							name: "test2",
							latitude: desiredLat,
							longitude: desiredLng
						}
					}),
					success: function(data) { alert("Marker has ben succesfully created"); }
				});
			});
		});
	}

//------------------------FROM SWARMON----------------------

//------------------------------CHOICE TEAMS---------------------------------------
//------------------------ ADD AND REMOVE TEAMS------------------------------------
function addteam(id){
	var str = $.cookie("teamslist");
	if(isPresent(id,str) == true){
  }//do nothing
  else{
    //si le cookie est inexistant ou vide
    if($.cookie("teamslist") == null || $.cookie("teamslist") == ""){
    	$.cookie("teamslist",id);
    }
      //sinon ajout
      else{
      	$.cookie("teamslist",$.cookie("teamslist")+","+id);
      }
    }
  }

  function rmvteam(id){
  	var str = $.cookie("teamslist");
  	var tab = str.split(",");
  //index de l'élément à retirer
  var index = tab.indexOf(id);
  if(index > -1){
    //retirer élément
    tab.splice(index,1);
    res = tab.toString();
    $.cookie("teamslist",res);
  }
}
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
function isPresent(id,str){
	if (str == null || str == ""){
    return false; //absent
  }
  else{
  	var tab = str.split(",");
  	var index = tab.indexOf(id);
  	if(index > -1){
  		return true;
  	}
  	else{
  		return false;
  	}
  }
}

//----------------------------ADD AND REMOVE ROBOTS--------------------------------
function addrobot(id){
	var str = $.cookie("robotslist");
	if(isPresent(id,str) == true){
  }//do nothing
  else{
    //si le cookie est inexistant ou vide
    if($.cookie("robotslist") == null || $.cookie("robotslist") == ""){
    	$.cookie("robotslist",id);
    }
      //sinon ajout
      else{
      	$.cookie("robotslist",$.cookie("robotslist")+","+id);
      }
    }
  }

  function rmvrobot(id){
  	var str = $.cookie("robotslist");
  	var tab = str.split(",");
  //index de l'élément à retirer
  var index = tab.indexOf(id);
  if(index > -1){
    //retirer élément
    tab.splice(index,1);
    res = tab.toString();
    $.cookie("robotslist",res);
  }
}
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
function isPresent(id,str){
	if (str == null || str == ""){
    return false; //absent
  }
  else{
  	var tab = str.split(",");
  	var index = tab.indexOf(id);
  	if(index > -1){
  		return true;
  	}
  	else{
  		return false;
  	}
  }
}
//-------------------------------------------------------------------------------

//------------------END SWARMON------------------------------