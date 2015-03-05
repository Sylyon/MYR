class DataController < ApplicationController
  def create
  	if params[:datetime] != nil

  		newCoords = Coordinate.where "datetime > ?", params[:datetime]
  		render json: newCoords.to_json

  	end
  end
end
