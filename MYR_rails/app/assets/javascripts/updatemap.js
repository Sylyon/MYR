 $("#updatebutton").click(function() {
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
 	if ($('#map-canvas').is(':offscreen')){
 		initialScroll();
 	}
 });
