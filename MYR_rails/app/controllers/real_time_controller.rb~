class RealTimeController < ApplicationController
	include RealTimeHelper

	def show
	end

	def getMissionLength
		render json: getMissionInfos
	end

	def map_panel
	end

	def getNewTrackers
		last_refresh = params[:datetime]
		known_trackers = params[:trackers]
		render json: IsThereNewTrackers?(last_refresh, known_trackers)
	end
end
