module RealTimeHelper

	def getCurrentMission
		now = Time.zone.now #time in UTC 00
		currentMission = Mission.where "start < ? AND ? < end", now, now
		return currentMission
	end


	def getMissionInfos
		missionsArray = getCurrentMission
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
  end

end
