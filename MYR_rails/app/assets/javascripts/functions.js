//----------------------GLOBAL VARIABLES-------------------
var map = null;
var lastDatetime = "0";

//----------------------FUNCTIONS---------------------------

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
//------------------END SWARMON------------------------------

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
	//give one or two arguments ??
	function addMarker(lat, lng){
		var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(lat,lng)
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

	//Add a boil on the map when clicked and keep track of coordinates on dragend
	//Save the coodinates in the database when clinking on "AddBoil" button
	function addingBoil(){
		google.maps.event.addListener(map, 'click', function(a){
			var desiredLat = a.latLng.lat();
			var desiredLng = a.latLng.lng();
			setCenter(desiredLat,desiredLng);

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
						name: "test"
					}
				}),
				success: function(data) { alert("Marker has ben succesfully created"); }
				});

		});

		}
		);
}