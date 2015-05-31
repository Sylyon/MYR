$(document).ready(function(){

  //for all checkboxes of tracker
	$( "input[name*='tracker']" ).each(function () {  
    //on click do ...
    $(this).click(function() {

      //get id of the checkbox
      var id = $(this).attr('id');
      alert("My ID is "+id);
      
      //if checked
      if($(this).is(':checked')){
        saveNewDesiredTracker(id);
      }
      //if not checked
      else{
        removeDesiredTracker(id);
      } 

    })
  })

});