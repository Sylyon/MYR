module RealTimeHelper
	def getCurrentMission
		now = Time.now
		currentMission = Mission.where "start < ? AND ? < end", now, now
		return currentMission
	end
end
