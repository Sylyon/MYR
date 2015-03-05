class DataController < ApplicationController
  def create
  	if params[:datetime] != nil


  		@newCoords = Coordinate.where "datetime > ?", params[:datetime]

      render json: @newCoords
  		
      #render json: params[:datetime]

  	end
  end
end
