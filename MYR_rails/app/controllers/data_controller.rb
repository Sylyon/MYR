class DataController < ApplicationController

  $numMaxCoords = 500

  #WARNING limitation is not the one required

  #TO DO global limitation of number of coordinates

  def create
  	if params[:datetime] != "0" #the map already contains coordinates
  		newCoords = Coordinate.where "datetime > ?", params[:datetime]
      newCoords = limitCoord(newCoords)
      render json: newCoords
    else #the map does not have any coordinates
      pastDatetime = 5.minutes.ago.strftime('%Y-%m-%d %H:%M:%S')
      newCoords = Coordinate.where "datetime > ?", pastDatetime
      newCoords = limitCoord(newCoords)
      render json: newCoords
    end
  end

  def limitCoord(coords)
    if coords.length >= $numMaxCoords
      #limitedNewCoord = coords - coords[0..coords.length - $numMaxCoords] 
      #to test
      limitedNewCoord = coords[coords.length - $numMaxCoords ..  coords.length] 
      return limitedNewCoord
    else
      return coords
    end
  end
  
end
