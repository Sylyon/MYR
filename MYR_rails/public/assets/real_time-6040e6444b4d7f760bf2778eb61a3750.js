$(document).ready(function(){

	//initialization
	initializeMap();
	initialScroll();


	$("#getMissionLength").click(function(){

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

								console.log(data);

								length = data.length;
								for (i=0; i<length; i++)
								{

									refreshWithNewMarkers(data);
								}
							}
						}       
					});


				}

			}       
		});

		});

});
//-----------------------------------------------------------------
;
