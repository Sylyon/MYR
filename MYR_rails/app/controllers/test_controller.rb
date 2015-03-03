class TestController < ApplicationController
  def create
  	@tab = []
  	coords = Coordinate.all
  	coords.each do |coord|
  		@tab.push(coord)
  	end
  end
end
