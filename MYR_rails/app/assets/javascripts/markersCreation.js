jQuery(document).ready(function(){
	
	new_marker();


});

function new_marker(){
	console.log("new_marker");
	jQuery("#edit_element_dialog").dialog({
		autoOpen: true,
		modal: true,
		width: 400,
		height:200,
		title: 'blabla0',
		open : function(){

			jQuery("#edit_element_dialog").html('<p>blabla1</p><br/><p>blalba2</p><br/><table><tr><td align="right">blabla3 : </td><td align="center"><input type="text" name="mission_name" value=""/></td></tr></table>');

		},
		buttons: {
			"blabla4": function(){
				var mission_name = jQuery("input[name=mission_name]").val();
				if(mission_name!="") // Si l'utilisateur n'écrit rien, le bouton "confirmer" ne fait rien
				{
					console.log("mission selected >?");
						initializeMap();
						initialScroll();
						addingBoil();
				}

			},
			"blabla5": function(){
				jQuery( this ).dialog( "close" );
			}

		}
	});
}