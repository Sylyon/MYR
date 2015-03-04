class DataController < ApplicationController
  def create
  	if params[:datetime] != nil

  		newCoords = Coordinate.where "datetime > ?", params[:datetime]

  		#render json: params[:datetime]
  		render json: newCoords
  		#does not work due to bad format for datetime
  	end
  end
end
