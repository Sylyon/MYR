class AndroidController < ApplicationController
  def who
  	@robots = Robot.all
  	@teams = Team.all
  end

  def whois
  end
end
