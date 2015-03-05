class DataController < ApplicationController

  $numMaxCoords = 500

  def create
  	if params[:datetime] != "0" #the map already contains coordinates
  		newCoords = Coordinate.where "datetime > ?", params[:datetime]
      render json: newCoords
    else #the map does not have any coordinates
      pastDatetime = 5.minutes.ago.strftime('%Y-%m-%d %H:%M:%S')
      newCoords = Coordinate.where "datetime > ?", pastDatetime
      puts "i gathered this: "
      puts newCoords
      newCoords = limitCoord(newCoords)
      puts "after limitation i obtained: "
      puts newCoords
      render json: newCoords
    end
  end

  def limitCoord(coords)
    if coords.length >= $numMaxCoords
      limitedNewCoord = coords - coords[0..coords.length - $numMaxCoords] 
      return limitedNewCoord
    else
      return coords
    end
  end
  
end
