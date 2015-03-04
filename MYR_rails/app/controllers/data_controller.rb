class DataController < ApplicationController
  def create
  	@coords = Coordinate.all
  	render json: @coords
  end
end
