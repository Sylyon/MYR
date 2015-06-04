module RealTimeHelper

  NUM_MAX_COORDS = 1000 #constant

  def getCurrentMission
		now = Time.zone.now #time in UTC 00
    currentMission = Mission.where "start < ? AND ? < end", now, now
    return currentMission
  end

  def getMissionInfos
    now = Time.zone.now #time in UTC 00
    missionsArray = Mission.where "start < ? AND ? < end", now, now
    if missionsArray != []
      #missionsArray = getCurrentMission
      nbMissions = missionsArray.size
      if nbMissions == 0
      	#TO DO
      	return 0
      elsif nbMissions ==1
      	mission = missionsArray[0]
      	timeStart = mission.start.to_s(:number)
      	timeEnd = mission.end.to_s(:number)
      	result = []
      	result.push(timeStart).push(timeEnd)
      	return result
      else
      	#TO DO
      	return 0
      end
    else
      return []
    end
  end

  #input: datetime, array of tracker_id
  #output: array of tracker-id
  def IsThereNewTrackers?(last_refresh, known_trackers)
    trackers=[]
    if (last_refresh != "0" && last_refresh != nil)#the map already contains coordinates
      datetime = last_refresh.to_datetime
      newCoords = (Coordinate.where(id: Coordinate.order(created_at: :desc).limit(NUM_MAX_COORDS))).where("datetime > ?", datetime).where.not(tracker_id: known_trackers).order(tracker_id: :asc)
      #trackers = []
      if (newCoords != [])
        newCoords.each_cons(2) do |element, next_element|
          if next_element.tracker_id != element.tracker_id
            trackers.push(element.tracker_id.to_s)
          end
        end
        trackers.push(newCoords.last.tracker_id.to_s)
      end
      return trackers
    else #the map does not have any coordinates
      if getMissionInfos.size > 0 #if there is currently a mission
        start = getMissionInfos[0].to_datetime #missionsInfos = [start, end]
        newCoords = (Coordinate.where(id: Coordinate.order(created_at: :desc).limit(NUM_MAX_COORDS))).where("datetime > ?", start).where.not(tracker_id: known_trackers).order(tracker_id: :asc)
        #trackers = []
        if (newCoords != [])
          newCoords.each_cons(2) do |element, next_element|
            if next_element.tracker_id != element.tracker_id
              trackers.push(element.tracker_id.to_s)
            end
          end
          trackers.push(newCoords.last.tracker_id.to_s)
        end
        return trackers
      end
    end
  end   

end