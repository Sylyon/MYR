class RealTimeController < ApplicationController

def choiceteams
end

def choiceteams
		#-------------- HTML PRESENTATION ----------------------------------
		#-------- istance variable given to the view -------------------
		@teams=Team.all #all the teams

		#creation of @tabteams to help for the generation of the HTML code 
		@strteams = cookies[:teamslist]
		if (@strteams != nil) #cannot split nil
			@tabteams = @strteams.split(",");
			@tabteams.sort! #to display the robot in the order of the teams
		else
			@tabteams = []
		end	
		#--------------------------------------------------------------------
end


def choicerobots
	end
	
end
