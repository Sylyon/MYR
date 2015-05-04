class RealTimeController < ApplicationController
	include RealTimeHelper

	def show
	end

	def getMissionLength
		render json: getMissionInfos
	end

	def map_panel
	end

end
